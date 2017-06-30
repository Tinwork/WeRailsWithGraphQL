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
Example :
 
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

## Authors
- [**Marc INTHA-AMNOUAY**](https://github.com/MarcInthaamnouay) 
- [**Didier YOUN**](https://github.com/DidYoun) 
- [**Antoine RENAULT**](https://github.com/Aktanee) 

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.