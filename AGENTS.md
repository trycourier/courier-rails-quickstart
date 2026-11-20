# Courier Rails quickstart

A Rails 8 app that notifies a user by email, SMS, and in-app inbox when an order ships, through Courier, and respects the user's notification preferences. Guide: https://www.courier.com/docs/guides/add-notifications-to-rails

## Commands

- Install: `bundle install`, then `cp .env.example .env` and `bin/rails db:prepare`
- Run: `bin/rails server`, then open http://localhost:3000 to see the inbox
- Send: `bin/rails courier:send` ships a demo order for `user_123` and prints the Courier request id
- Check: `bin/rails runner 'puts NotifyJob.name'` loads the app without calling Courier

## Environment (`.env`, loaded by dotenv in development)

- `COURIER_API_KEY`: read in `app/jobs/notify_job.rb` and `app/controllers/courier_tokens_controller.rb`
- `COURIER_TOPIC_ID`: the subscription topic, read in `app/jobs/notify_job.rb`
- `DEMO_EMAIL`, `DEMO_PHONE`: the demo recipient, read in `lib/tasks/courier.rake` and `ApplicationController#current_user`

## Files that matter

- `app/models/order.rb`: `after_update_commit` enqueues `NotifyJob` when the status becomes `shipped`
- `app/jobs/notify_job.rb`: one `client.send_.message` call, routing `all` over email, sms, inbox, scoped to the topic
- `app/models/user.rb`: `courier_id`, the one id the send, the token, and the preference page share
- `app/controllers/courier_tokens_controller.rb`: mints the inbox JWT for the signed-in user
- `app/views/inbox/show.html.erb`: renders `<courier-inbox>` and signs in with that JWT
- `lib/tasks/courier.rake`: the demo send

## Rules

- The Courier API key is server-only. Never send it to the browser. The browser gets a scoped JWT.
- Read the user for the token from the session. Keep the "Read the user from your session here" comment, and never take a user id from params.
- Pass one idempotency key per event (`order-<id>-shipped-<updated_at>`), so Active Job retries never send twice.
- Enqueue from `after_*_commit`, not `after_save`, so a rolled-back transaction never notifies.
- Keep `preferences.subscription_topic_id` on the send so user opt-outs apply.
- Use the `trycourier` gem (`require "courier"`). The send method is `send_`, because `send` is reserved in Ruby.
