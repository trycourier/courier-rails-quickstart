class Order < ApplicationRecord
  belongs_to :user

  # after_commit, not after_save: the job is enqueued only once the row is
  # really in the database, so a rolled-back transaction never notifies anyone.
  after_update_commit :notify_shipped, if: -> { saved_change_to_status?(to: "shipped") }

  private

  def notify_shipped
    NotifyJob.perform_later(
      user,
      title: "Order ##{id} has shipped",
      body: "Your order is on its way.",
      idempotency_key: "order-#{id}-shipped"
    )
  end
end
