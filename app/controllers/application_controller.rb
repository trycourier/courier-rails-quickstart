class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  private

  # The quickstart pins one demo user so it runs without auth wired up.
  # In your app, return the signed-in user: Devise's current_user, or
  # Current.user from the Rails authentication generator.
  def current_user
    @current_user ||= User.find_or_create_by!(id: 123) do |user|
      user.email = ENV.fetch("DEMO_EMAIL", "sarah@acme-corp.com")
    end
  end
end
