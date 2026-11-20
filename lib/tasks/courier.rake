namespace :courier do
  desc "Ship a demo order, which notifies user_123 by email, SMS, and inbox"
  task send: :environment do
    # Run the job in this process, so the task waits for Courier's answer.
    ActiveJob::Base.queue_adapter = :inline
    Rails.logger.broadcast_to(ActiveSupport::Logger.new($stdout, level: :info))

    user = User.find_or_initialize_by(id: 123)
    user.update!(
      email: ENV.fetch("DEMO_EMAIL") { abort "Set DEMO_EMAIL in .env first." },
      phone_number: ENV["DEMO_PHONE"].presence
    )

    order = user.orders.create!
    order.update!(status: "shipped") # after_update_commit enqueues NotifyJob

    puts "Shipped order ##{order.id} for #{user.courier_id}. See it in https://app.courier.com/logs"
  end
end
