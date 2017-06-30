# Burger Rails

## Getting Started
School project develop with the framework Ruby On Rails.<br>
The theme we've choose is Burger King and the purpose of the project is too use GraphQL

### Prerequisites
+ [Ruby On Rails ~> 5.0.0](http://guides.rubyonrails.org/5_0_release_notes.html)
+ [Ruby ~> 2.3.3](https://www.ruby-lang.org/fr/downloads/) 

```shell
> $ rake db:create
> $ rake db:migrate
> $ rake db:seeds
```
## Features
### Internationalization
Burger Rails is available in two language : french and english. <br>
You can swap the current locale by URL : 
+ http://burger-rails.dev/fr/admin
+ http://burger-rails.dev/en/admin

Or by the switch available in the homepage 

### GraphQL 
GraphQL is a new way to work with data. But how GraphQL work ?
In order to simplify, GraphQL is an additional layer between the database and the ORM.
He permit the implementation of a new way to interact with the database by queries which are sent to a only endpoint. <br>

**Standard Implementation**
```
We may ask to our backend server a request the details of a user identified by his id. Our endpoint should be like :
Endpoint : local.dev/user/1 
Result : 
{
    "firstname" : "John",
    "name" : "Doe",
    "age" : 27
}
But in other way, we want to know the friends of this user. We would be tempted to add one more endpoint like :
Endpoint : local.dev/user/1/friends 
Result : 
{
    "name" : "Sasha",
    "email" : "sasha@pokemon.com",
    "age" : 25,
    "friends" : [{
        "name" : "Ondine",
        "email" : "ondine@pokemon.com",
        "age" : 24
    }, { 
        "name" : "Pierre",
        "email" : "pierre@pokemon.com",
        "age" : 30
    }]
}
```
**GraphQL Implementation**
```
With GraphQL, our application will work with one endpoint -> local.dev/graphql 
From this endpoint, we send to the graphQL the description of what we need with JSON queries.
-------------------------------------------
Request : User details
Query : 
{
    user (id: 1) {
        name,
        email,
        age
    }
}
Result : 
{
    "name" : "Sasha",
    "email" : "sasha@pokemon.com",
    "age" : 25,
    "friends" : [{
        "name" : "Ondine",
        "email" : "ondine@pokemon.com",
        "age" : 24
    }, { 
        "name" : "Pierre",
        "email" : "pierre@pokemon.com",
        "age" : 30
    }]
}
-------------------------------------------
Request : User details and his friends
Query : 
{
    user (id: 1) {
        name,
        email,
        age,
        friends {
            name,
            email,
            age        
        }
    }
}
Result : 
{
    "name" : "Sasha",
    "email" : "sasha@pokemon.com",
    "age" : 25
}
```

## Roadmap 
### Started with empty data
**Create a admin user** 
```
By default, we have deactivate the registrable feature from Devise.
So, you may need, to reactive it in : /app/models/user.rb 
And add :registerable in Devise modules.
If it still doesn't work, contact us.
```
**Populate the database** 
```
- Connect to the dashboard admin with our credentials to : local.dev/admin
- From this dashboard, you have to populate the database by creating many resources.
    1. Category
    2. Ingredient
    3. Size
    4. Beverage
    5. Condiment
    6. Burger
    7. Menu
    
⚠⚠⚠ The application takes into account translations with Globalize and I18n so you have to translate every label of the ressource. ⚠⚠⚠
```
**Work with GraphQL** 
```
If you work in development mode, you can access to the GraphQL development from the endpoint :
> local.dev/graphiql
```
**Chill the burger menus** 
```
You can compose burgers and see the informations of what you need.
```
### Started with existing data
```
That's the same as starting with empty data but without the step 1.
The default credentials are :
login : root
password : root
```
## Next step
### Action Cable

## Authors
- [**Marc INTHA-AMNOUAY**](https://github.com/MarcInthaamnouay) 
- [**Didier YOUN**](https://github.com/DidYoun) 
- [**Antoine RENAULT**](https://github.com/Aktanee) 

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.