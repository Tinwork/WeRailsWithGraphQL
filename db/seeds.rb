# Add default root admin user
@root = User.new(
    :username => 'root',
    :email => 'root@tinwork.com',
    :password => 'root123',
    :password_confirmation => 'root123'
)
# Add somes users
@did = User.new(
    :username => 'did',
    :email => 'did@tinwork.com',
    :password => 'root123',
    :password_confirmation => 'root123'
)
@marc = User.new(
    :username => 'marc',
    :email => 'marc@tinwork.com',
    :password => 'root123',
    :password_confirmation => 'root123'
)
@antoine = User.new(
    :username => 'antoine',
    :email => 'antoine@tinwork.com',
    :password => 'root123',
    :password_confirmation => 'root123'
)
@remy = User.new(
    :username => 'remy',
    :email => 'remy@hannequin.io',
    :password => 'root123',
    :password_confirmation => 'root123'
)
@arturo = User.new(
    :username => 'arturo',
    :email => 'arturo@gmail.com',
    :password => 'root123',
    :password_confirmation => 'root123'
)

@root.save!
@did.save!
@marc.save!
@antoine.save!
@remy.save!
@arturo.save!

@remy.invite(@arturo)
@arturo.approve(@remy)

@did.invite(@antoine)
@did.invite(@marc)
@marc.approve(@did)
@antoine.approve(@did)

@marc.invite(@did)
@marc.invite(@antoine)
@did.approve(@marc)
@antoine.approve(@marc)

@antoine.invite(@did)
@antoine.invite(@marc)
@marc.approve(@antoine)
@did.approve(@antoine)

@arturo.invite(@remy)
@arturo.invite(@marc)
@remy.approve(@arturo)
@marc.approve(@arturo)

@marc.invite(@arturo)
@arturo.approve(@marc)