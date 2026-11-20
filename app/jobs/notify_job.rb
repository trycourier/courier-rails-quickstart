class NotifyJob < ApplicationJob
  queue_as :default

  # The idempotency key makes a retry safe: Courier returns the first result
  # instead of sending twice.
  retry_on Courier::Errors::APIConnectionError,
           Courier::Errors::RateLimitError,
           Courier::Errors::InternalServerError,
           wait: :polynomially_longer, attempts: 5

  def perform(user, title:, body:, idempotency_key:)
    client = Courier::Client.new(api_key: ENV.fetch("COURIER_API_KEY"))

    response = client.send_.message(
      message: {
        to: {
          user_id: user.courier_id,
          email: user.email,
          phone_number: user.phone_number
        }.compact,
        content: {
          title: title,
          # Courier fills in a link to this user's hosted preference page.
          body: "#{body}\n\nChoose what we send you: {{var \"urls.preferences\"}}"
        },
        # Every channel at once. Courier picks the provider inside each one.
        routing: { method: "all", channels: ["email", "sms", "inbox"] },
        # The user's choices for this topic decide whether, and where, it sends.
        preferences: { subscription_topic_id: ENV.fetch("COURIER_TOPIC_ID") }
      },
      idempotency_key: idempotency_key
    )

    Rails.logger.info("Courier accepted #{idempotency_key} as #{response.request_id}")
    response
  end
end
