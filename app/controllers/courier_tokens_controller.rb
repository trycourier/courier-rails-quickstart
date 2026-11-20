class CourierTokensController < ApplicationController
  # GET /courier/token
  def show
    # Read the user from your session here. Never from params: a caller who
    # can name any user id can read that user's inbox.
    user_id = current_user.courier_id

    client = Courier::Client.new(api_key: ENV.fetch("COURIER_API_KEY"))
    response = client.auth.issue_token(
      scope: "user_id:#{user_id} inbox:read:messages inbox:write:events",
      expires_in: "1 day"
    )

    render json: { userId: user_id, token: response.token }
  end
end
