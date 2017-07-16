# Add default root admin user
user = User.new(
    :username => 'root',
    :email => 'root@tinwork.com',
    :password => 'root123',
    :password_confirmation => 'root123'
)

user.save!