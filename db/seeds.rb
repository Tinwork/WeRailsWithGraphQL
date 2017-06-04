# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

size_xl = Size.create({
   label: 'XL',
   extra_price: 1.50
})
category_1 = Category.create({
    label: 'Légume vert'
})
category_2 = Category.create({
    label: 'Viande bovine'
})
category_3 = Category.create({
    label: 'Soda'
})
category_4 = Category.create({
    label: 'Jus de fruit'
})
ingredient_1 = Ingredient.create({
    label: 'Salade',
    calories: 100.50,
    category: category_1
})
ingredient_2 = Ingredient.create({
    label: 'Steak haché',
    calories: 500.500,
    category: category_2
})
condiment_1 = Condiment.create({
    label: 'Frites',
    calories: 300,
 })
condiment_2 = Condiment.create({
    label: 'Salade',
    calories: 200,
})
CondimentIngredient.create([
    {
        condiment: condiment_1,
        ingredient: ingredient_1
    },
    {
        condiment: condiment_1,
        ingredient: ingredient_2
    },
    {
        condiment: condiment_2,
        ingredient: ingredient_2
    },
])
burger_1 = Burger.create({
    label: 'Whopper'
})
burger_2 = Burger.create({
    label: 'Double Steakhouse'
})
BurgerIngredient.create([
   {
       burger: burger_1,
       ingredient: ingredient_1
   },
   {
       burger: burger_1,
       ingredient: ingredient_2
   },
   {
       burger: burger_2,
       ingredient: ingredient_2
   },
])
boisson_1 = Beverage.create({
    label: 'Coca Cola',
    ice: true,
    calories: 200.50,
    category: category_1
})
boisson_2 = Beverage.create({
    label: 'Jus d\'orange',
    ice: true,
    calories: 200.50,
    category: category_2
})
menu = Menu.create([
    {
        label: 'Menu Whopper',
        burger: burger_1
    },
    {
        label: 'Menu Double Steakhouse',
        burger: burger_2
    },
 ])