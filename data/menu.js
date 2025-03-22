// Restaurant Menu Data
const menuData = {
    categories: [
        { id: 'all', name: 'All' },
        { id: 'breakfast', name: 'Breakfast' },
        { id: 'main-dishes', name: 'Main Dishes' },
        { id: 'drinks', name: 'Drinks' },
        { id: 'desserts', name: 'Desserts' }
    ],
    items: [
        {
            id: 1,
            name: 'Jollof Rice',
            description: 'Aromatic rice cooked in rich tomato sauce with African spices',
            price: 15.99,
            rating: 4.8,
            category: 'main-dishes',
            image: 'imgs/jollof.jpeg',
            ingredients: ['Rice', 'Tomatoes', 'Onions', 'Peppers', 'African Spices', 'Garlic', 'Ginger', 'Stock', 'Oil', 'Seasonings'],
            popular: true
        },
        {
            id: 2,
            name: 'Waakye',
            description: 'Traditional rice and beans dish served with special waakye sauce',
            price: 14.99,
            rating: 4.9,
            category: 'main-dishes',
            image: 'imgs/waakye.jpeg',
            ingredients: ['Rice', 'Beans', 'Waakye Leaves', 'Sorghum Stalks', 'Salt', 'Onions', 'Garlic', 'Ginger', 'Pepper', 'Spices'],
            popular: true
        },
        {
            id: 3,
            name: 'Banku with Tilapia',
            description: 'Fermented corn dough served with grilled tilapia and pepper sauce',
            price: 18.99,
            rating: 4.7,
            category: 'main-dishes',
            image: 'imgs/banku-tilapia.jpeg',
            ingredients: ['Corn Dough', 'Cassava Dough', 'Tilapia', 'Pepper', 'Onions', 'Tomatoes', 'Garlic', 'Ginger', 'Spices', 'Oil'],
            popular: true
        },
        {
            id: 4,
            name: 'Fufu',
            description: 'Pounded cassava and plantain dough served with light soup',
            price: 16.99,
            rating: 4.9,
            category: 'main-dishes',
            image: 'imgs/fufu.jpeg',
            ingredients: ['Cassava', 'Plantain', 'Meat/Fish', 'Pepper', 'Onions', 'Tomatoes', 'Spices', 'Herbs', 'Salt', 'Stock'],
            popular: true
        },
        {
            id: 5,
            name: 'Red Red',
            description: 'Black-eyed peas stewed in palm oil with plantains',
            price: 13.99,
            rating: 4.6,
            category: 'main-dishes',
            image: 'imgs/red_red.jpeg',
            ingredients: ['Black-eyed Peas', 'Palm Oil', 'Plantains', 'Onions', 'Pepper', 'Ginger', 'Garlic', 'Tomatoes', 'Fish', 'Spices'],
            popular: true
        },
        {
            id: 6,
            name: 'Hausa Koko',
            description: 'Spiced millet porridge served with koose',
            price: 8.99,
            rating: 4.5,
            category: 'breakfast',
            image: 'imgs/hausa_koko.jpeg',
            ingredients: ['Millet', 'Pepper', 'Ginger', 'Cloves', 'Spices', 'Sugar', 'Milk', 'Koose', 'Salt', 'Water'],
            popular: false
        },
        {
            id: 7,
            name: 'Fresh Fruit Smoothie',
            description: 'Blend of seasonal fresh fruits with yogurt',
            price: 7.99,
            rating: 4.8,
            category: 'drinks',
            image: 'imgs/fruit_smoothie.jpeg',
            ingredients: ['Mixed Fruits', 'Yogurt', 'Honey', 'Ice', 'Milk', 'Mint'],
            popular: false
        },
        {
            id: 8,
            name: 'Sobolo',
            description: 'Refreshing hibiscus drink with spices and fruit',
            price: 5.99,
            rating: 4.7,
            category: 'drinks',
            image: 'imgs/sobolo.jpeg',
            ingredients: ['Hibiscus', 'Pineapple', 'Ginger', 'Cloves', 'Sugar', 'Water'],
            popular: false
        }
    ]
};
