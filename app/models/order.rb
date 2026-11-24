class Order < ApplicationRecord
  belongs_to :user

  # after_commit, not after_save, so a rolled-back transaction never notifies anyone.
  after_update_commit :notify_shipped, if: -> { saved_change_to_status?(to: "shipped") }

  private

  def notify_shipped
    NotifyJob.perform_later(
      user,
      title: "Order ##{id} has shipped",
      body: "Your order is on its way.",
      # One key per shipment, so job retries reuse it and a later reship gets a new one.
      idempotency_key: "order-#{id}-shipped-#{updated_at.strftime("%s%6N")}"
    )
  end
end
