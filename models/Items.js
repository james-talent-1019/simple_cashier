define([], function () {

    const items = [
        {
            "name": "Burger",
            "value": 6.75,
            "icon": "assets/items/burger.svg"
        },
        {
            "name": "Pizza",
            "value": 9.90,
            "icon": "assets/items/pizza.svg"
        },
        {
            "name": "Drink",
            "value": 2.75,
            "icon": "assets/items/drink.svg"
        },
        {
            "name": "Coffee",
            "value": 1.25,
            "icon": "assets/items/coffee.svg"
        },
        {
            "name": "Daily Menu",
            "value": 12.75,
            "icon": "assets/items/restaurant.svg"
        }
    ]

    class Items {
        constructor() {
            
        }

        getItems = () => items

        getItem = (index) => index > items.length || index < 0 ? null : items[index]
        
    }

    return Items;
})