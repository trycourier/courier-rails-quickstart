# Courier notifications: Rails quickstart

A Rails 8 app that sends one notification by email, SMS, and in-app inbox when an order ships, and respects each user's notification preferences. Shipping an order commits a model change, the commit enqueues an Active Job, and the job makes one call to Courier with the `trycourier` gem. Courier delivers on every channel, skips users who opted out of the topic, and puts a link to Courier's hosted preference page in the message, so you don't build a settings screen. The page renders the `<courier-inbox>` web component, signed in with a JWT from a small controller.

This is the companion project for [Add email, SMS, and in-app notifications with user preferences to a Rails app](https://www.courier.com/docs/guides/add-notifications-to-rails) in the Courier docs.

## Build this with a coding agent

Paste this into Claude Code, Cursor, or Codex from the root of your Rails app:

```text
Add email, SMS, and in-app notifications with per-user preferences to this Rails app with Courier.
Follow https://www.courier.com/docs/guides/add-notifications-to-rails.md and the reference app at https://github.com/trycourier/courier-rails-quickstart.
Use the trycourier gem (require "courier") and read COURIER_API_KEY and COURIER_TOPIC_ID from the environment.
Send from an Active Job enqueued in a model's after_commit callback, with one idempotency key per event.
Mint the inbox JWT for the user in the session, never a user id from params, and render <courier-inbox> in a view.
When done, run bin/rails courier:send and show me the request id.
```

Install the Courier skill with `npx skills add trycourier/courier-skills` and connect the [Courier MCP server](https://www.courier.com/docs/resources/mcp), so the agent can read Courier Logs and templates itself. `AGENTS.md` lists the commands and the rules to keep.

## Prerequisites

- Ruby 3.2 or newer
- A [Courier account](https://app.courier.com/signup) and an [API key](https://app.courier.com/settings/api-keys). A Test key is fine.
- A subscription topic, created and published in [Platform → Preferences](https://app.courier.com/~/test/platform/preferences)
- For SMS: an SMS provider such as Twilio connected in [Integrations](https://app.courier.com/integrations/catalog), and your phone number in E.164 form

Email works on day one. In a Test environment, the Courier Test Email Provider delivers to the teammates in your workspace, so set `DEMO_EMAIL` to the address you log in to Courier with.

## Run it

```bash
git clone https://github.com/trycourier/courier-rails-quickstart.git
cd courier-rails-quickstart
bundle install
cp .env.example .env      # add your API key, topic id, and DEMO_EMAIL
bin/rails db:prepare
bin/rails server
```

Open [localhost:3000](http://localhost:3000). The inbox renders, signed in as `user_123` and empty.

Then, in a second terminal:

```bash
bin/rails courier:send
```

The task ships a demo order. The email arrives at `DEMO_EMAIL`, the text at `DEMO_PHONE` if you set one, and the message appears in the open inbox without a refresh. Without a phone number, Courier skips SMS and still delivers the email and the inbox message. Every message ends with a link to the user's hosted preference page. Turn the topic off there, run the task again, and Courier blocks the send with the reason `UNSUBSCRIBED` in [Logs](https://app.courier.com/logs).

## How the pieces fit

| File | What it does |
|---|---|
| `app/models/order.rb` | `after_update_commit` enqueues `NotifyJob` when an order's status becomes `shipped` |
| `app/jobs/notify_job.rb` | One `client.send_.message` call: email, SMS, and inbox with routing method `all`, scoped to your subscription topic, with an idempotency key |
| `app/controllers/courier_tokens_controller.rb` | Mints a JWT scoped to the signed-in user, so the browser never sees your API key |
| `app/views/inbox/show.html.erb` | Renders `<courier-inbox>` and signs in with that JWT |
| `config/importmap.rb` | Pins `@trycourier/courier-ui-inbox`, vendored with `bin/importmap pin` |
| `lib/tasks/courier.rake` | `bin/rails courier:send`, which ships a demo order end to end |

```
Order#update!(status: "shipped")
  └─ after_update_commit ─> NotifyJob.perform_later
                              └─ POST /send ─> Courier ─┬─ email   (your email provider)
                                                         ├─ sms     (your SMS provider)
                                                         └─ inbox   ─> <courier-inbox> in the browser
```

## Adapting it to your app

**Read the real user.** `ApplicationController#current_user` pins a demo user so the sample runs without auth. Replace it with Devise's `current_user` or `Current.user` from the Rails authentication generator. The token controller must read the user from the session, never from params: a caller who can name any user can read that user's inbox.

**Pick a queue backend.** In development, Active Job's default async adapter runs jobs in the Rails process, so nothing else needs to run. In production, use Solid Queue (Rails 8's default) or Sidekiq. The job doesn't change.

**Use a template.** The job sends inline `content` so the sample runs against a fresh workspace. In production, design the message in Courier and send `template:` with its id instead, so copy changes don't need a deploy.

## Troubleshooting

**`KeyError: key not found: "COURIER_API_KEY"`.** Copy `.env.example` to `.env` and fill it in. `dotenv` loads it in development.

**The email never arrives.** In Test, `DEMO_EMAIL` has to belong to a teammate in your Courier workspace. To reach anyone else, connect your own email provider.

**The SMS shows `UNROUTABLE` in Logs.** No SMS provider is connected in this environment, or `DEMO_PHONE` isn't E.164 (`+12025550156`, not `2025550156`).

**The inbox renders but stays empty.** The token's `user_id` has to match the send's `user_id`, which is `user_123` here.

## License

MIT
