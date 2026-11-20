namespace :courier do
  desc "Ship a demo order, which notifies user_123 by email, SMS, and inbox"
  task send: :environment do
    # Run the job in this process, so the task waits for Courier's answer.
    ActiveJob::Base.queue_adapter = :inline
    Rails.logger.broadcast_to(ActiveSupport::Logger.new($stdout, level: :info))

    email = ENV["DEMO_EMAIL"].to_s.strip
    if email.empty? || email == "YOUR_EMAIL"
      abort "Set DEMO_EMAIL in .env to the email you log in to Courier with."
    end

    user = User.find_or_initialize_by(id: 123)
    user.update!(email: email, phone_number: ENV["DEMO_PHONE"].presence)

    order = user.orders.create!
    order.update!(status: "shipped") # after_update_commit enqueues NotifyJob

    puts "Shipped order ##{order.id} for #{user.courier_id}. See it in https://app.courier.com/logs"
  end
end
