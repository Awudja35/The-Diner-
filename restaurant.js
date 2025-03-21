 export const dishes = {
   jollof: {
     title: "Jollof Rice",
     image: "/imgs/jollof.jpeg",
     description:
       "A West African favorite, our Jollof rice is slow-cooked with tomatoes, onions, and a blend of traditional spices. Served with your choice of grilled chicken or beef.",
     basePrice: 18.0,
     price: "GHc18.00",
     rating: "4.8",
     category: "main_dishes",
     ingredients: [
       { name: "Long Grain Rice", included: true, price: 0 },
       { name: "Tomatoes", included: true, price: 0 },
       { name: "Onions", included: true, price: 0 },
       { name: "Scotch Bonnet Peppers", included: true, price: 0 },
       { name: "Ginger", included: true, price: 0 },
       { name: "Bay Leaves", included: true, price: 0 },
       { name: "Thyme", included: true, price: 0 },
       { name: "Grilled Chicken", included: true, price: 0 },
       { name: "Grilled Beef", included: false, price: 3.0 },
       { name: "Fried Plantains", included: false, price: 2.5 },
       { name: "Grilled Vegetables", included: false, price: 2.0 },
     ],
   },
   friedRice: {
     title: "Fried Rice",
     image: "/imgs/fried_rice.jpeg",
     description:
       "A delicious and aromatic rice dish stir-fried with mixed vegetables, soy sauce, and a blend of savory spices. Served with your choice of grilled chicken or shrimp.",
     basePrice: 20.0,
     price: "GHc20.00",
     rating: "4.7",
     category: "main_dishes",
     ingredients: [
       { name: "Basmati Rice", included: true, price: 0 },
       { name: "Carrots", included: true, price: 0 },
       { name: "Peas", included: true, price: 0 },
       { name: "Green Beans", included: true, price: 0 },
       { name: "Soy Sauce", included: true, price: 0 },
       { name: "Garlic", included: true, price: 0 },
       { name: "Spring Onions", included: true, price: 0 },
       { name: "Grilled Chicken", included: true, price: 0 },
       { name: "Grilled Shrimp", included: false, price: 4.0 },
       { name: "Fried Egg", included: false, price: 2.0 },
       { name: "Extra Vegetables", included: false, price: 2.5 },
     ],
   },
   noodles: {
     title: "Stir-Fried Noodles",
     image: "/imgs/noodles.webp",
     description:
       "Savory stir-fried noodles tossed with fresh vegetables, soy sauce, and a mix of aromatic spices. Served with your choice of chicken, shrimp, or tofu.",
     basePrice: 16.0,
     price: "GHc16.00",
     rating: "4.6",
     category: "main_dishes",
     ingredients: [
       { name: "Egg Noodles", included: true, price: 0 },
       { name: "Bell Peppers", included: true, price: 0 },
       { name: "Carrots", included: true, price: 0 },
       { name: "Cabbage", included: true, price: 0 },
       { name: "Soy Sauce", included: true, price: 0 },
       { name: "Garlic", included: true, price: 0 },
       { name: "Spring Onions", included: true, price: 0 },
       { name: "Grilled Chicken", included: false, price: 3.0 },
       { name: "Grilled Shrimp", included: false, price: 4.0 },
       { name: "Tofu", included: false, price: 2.5 },
       { name: "Fried Egg", included: false, price: 2.0 },
     ],
   },

   waakye: {
     title: "Waakye",
     image: "/imgs/waakye.jpeg",
     description:
       "A beloved Ghanaian dish made with rice and black-eyed beans, cooked with dried millet leaves for a rich flavor. Served with your choice of protein and accompaniments.",
     basePrice: 20.0,
     price: "GHc20.00",
     rating: "4.8",
     category: "main_dishes",
     ingredients: [
       { name: "Rice", included: true, price: 0 },
       { name: "Black-Eyed Beans", included: true, price: 0 },
       { name: "Millet Leaves", included: true, price: 0 },
       { name: "Spaghetti", included: false, price: 2.0 },
       { name: "Fried Plantains", included: false, price: 2.5 },
       { name: "Shito (Black Pepper Sauce)", included: true, price: 0 },
       { name: "Gari", included: false, price: 1.5 },
       { name: "Boiled Eggs", included: false, price: 1.5 },
       { name: "Grilled Chicken", included: false, price: 3.0 },
       { name: "Fried Fish", included: false, price: 3.5 },
       { name: "Beef", included: false, price: 3.0 },
     ],
   },

   banku: {
     title: "Banku with Tilapia",
     image: "/imgs/banku-tilapia.jpeg",
     description:
       "Fermented corn and cassava dough, kneaded into a smooth, slightly sour paste. Served with grilled tilapia, pepper sauce, and fresh tomato salsa.",
     basePrice: 22.0,
     price: "GHc22.00",
     rating: "4.9",
     category: "main_dishes",
     ingredients: [
       { name: "Fermented Corn Dough", included: true, price: 0 },
       { name: "Cassava Dough", included: true, price: 0 },
       { name: "Grilled Tilapia", included: true, price: 0 },
       { name: "Pepper Sauce", included: true, price: 0 },
       { name: "Tomato Salsa", included: true, price: 0 },
       { name: "Lime Wedges", included: true, price: 0 },
       { name: "Grilled Shrimp", included: false, price: 5.0 },
       { name: "Extra Pepper Sauce", included: false, price: 1.0 },
       { name: "Okra Stew", included: false, price: 3.0 },
     ],
   },
   red_red: {
     title: "Red Red",
     image: "/imgs/red_red.jpeg",
     description:
       "A traditional West African dish made with black-eyed peas cooked in a rich tomato sauce, served with fried plantains and a side of spicy pepper sauce.",
     basePrice: 15.0,
     price: "GHc15.00",
     rating: "4.7",
     category: "main_dishes",
     ingredients: [
       { name: "Black-eyed Peas", included: true, price: 0 },
       { name: "Tomato Sauce", included: true, price: 0 },
       { name: "Onions", included: true, price: 0 },
       { name: "Garlic", included: true, price: 0 },
       { name: "Fried Plantains-8", included: false, price: 8.0 },
       { name: "Pepper Sauce", included: true, price: 0 },
       { name: "Smoked Fish", included: false, price: 4.0 },
       { name: "Boiled Eggs", included: false, price: 1.5 },
       { name: "Sautéed Spinach", included: false, price: 2.0 },
       { name: "Avocado Slices", included: false, price: 2.5 },
     ],
   },
   salad: {
     title: "Fresh Salad",
     image: "/imgs/salad.jpeg",
     description:
       "A vibrant mix of fresh greens, vegetables, and your choice of protein, topped with a light vinaigrette dressing. A perfect healthy option.",
     basePrice: 20.0,
     price: "GHc20.00",
     rating: "4.6",
     category: "desserts",
     ingredients: [
       { name: "Mixed Greens", included: true, price: 0 },
       { name: "Cucumber", included: true, price: 0 },
       { name: "Tomatoes", included: true, price: 0 },
       { name: "Carrots", included: true, price: 0 },
       { name: "Red Onion", included: true, price: 0 },
       { name: "Olives", included: true, price: 0 },
       { name: "Vinaigrette Dressing", included: true, price: 0 },
       { name: "Grilled Chicken", included: false, price: 3.5 },
       { name: "Grilled Shrimp", included: false, price: 4.0 },
       { name: "Tofu", included: false, price: 2.5 },
       { name: "Feta Cheese", included: false, price: 1.5 },
       { name: "Avocado Slices", included: false, price: 2.0 },
       { name: "Hard-Boiled Eggs", included: false, price: 1.0 },
     ],
   },

   fufu: {
     title: "Fufu with Light Soup",
     image: "/imgs/fufu.jpeg",
     description:
       "Pounded cassava and plantain dough served with light soup - a spicy, clear broth with your choice of goat meat, beef, or fish.",
     basePrice: 19.5,
     price: "GHc19.50",
     rating: "4.6",
     category: "main_dishes",
     ingredients: [
       { name: "Cassava", included: true, price: 0 },
       { name: "Plantain", included: true, price: 0 },
       { name: "Light Soup Base", included: true, price: 0 },
       { name: "Goat Meat", included: true, price: 0 },
       { name: "Ginger", included: true, price: 0 },
       { name: "Onions", included: true, price: 0 },
       { name: "Scotch Bonnet Peppers", included: true, price: 0 },
       { name: "Beef", included: false, price: 3.0 },
       { name: "Fish", included: false, price: 3.5 },
       { name: "Extra Meat", included: false, price: 4.0 },
     ],
   },
   hausa_koko: {
     title: "Hausa Koko",
     image: "/imgs/hausa_koko.jpeg",
     description:
       "A traditional Ghanaian spicy millet porridge served hot, paired with your choice of tea. Enjoy it with sugar, milk, or other tasty additions.",
     basePrice: 8.0,
     price: "GHc8.00",
     rating: "4.8",
     category: "breakfast",
     ingredients: [
       { name: "Millet Porridge (Hausa Koko)", included: true, price: 0 },
       { name: "Ginger", included: true, price: 0 },
       { name: "Cloves", included: true, price: 0 },
       { name: "Sugar", included: true, price: 0 },
       { name: "Evaporated Milk", included: false, price: 1.0 },
       { name: "Groundnuts", included: false, price: 1.5 },
     ],
   },

   tea: {
     title: "Tea Selection",
     image: "/imgs/tea.jpeg",
     description:
       "A warm and comforting cup of tea with your choice of flavors. Customize it with milk, sugar, or honey for a perfect start to your day.",
     basePrice: 5.0,
     price: "GHc5.00",
     rating: "4.7",
     category: "breakfast",
     ingredients: [
       { name: "Milo", included: false, price: 3.0 },
       { name: "Lipton Tea", included: false, price: 2.0 },
       { name: "Nescafé", included: false, price: 2.5 },
       { name: "Bournvita", included: false, price: 3.0 },
       { name: "Horlicks", included: false, price: 3.5 },
       { name: "Green Tea", included: false, price: 2.5 },
       { name: "Black Tea", included: false, price: 2.0 },
       { name: "Sugar", included: true, price: 0 },
       { name: "Honey", included: false, price: 1.0 },
       { name: "Evaporated Milk", included: false, price: 1.5 },
       { name: "Ginger", included: false, price: 0.5 },
     ],
   },
acheke: {
     title: "Acheke",
     image: "/imgs/acheke.jpeg",
     description:
       "A traditional dish from Côte d'Ivoire made from grated cassava, typically served with grilled fish, sauce, and vegetables. It’s a popular and flavorful meal enjoyed across West Africa.",
     basePrice: 10.5,
     price: "GHc10.50",
     rating: "4.6",
     category: "main_dishes",
     ingredients: [
       { name: "Grated Cassava", included: true, price: 0 },
       { name: "Vegetable Oil", included: true, price: 0 },
       { name: "Onions", included: true, price: 0 },
       { name: "Tomatoes", included: true, price: 0 },
       { name: "Garlic", included: true, price: 0 },
       { name: "Spices", included: true, price: 0 },
       { name: "Grilled Fish", included: false, price: 4.0 },
       { name: "Steamed Vegetables", included: false, price: 2.5 },
       { name: "Hot Pepper Sauce", included: false, price: 1.5 },
       { name: "Fried Plantains", included: false, price: 2.0 },
       { name: "Boiled Eggs", included: false, price: 1.5 },
     ],
   },

avocado_egg_toast: {
     title: "Avocado Egg Toast",
     image: "/imgs/avocado_egg.jpeg",
     description:
       "A trendy and nutritious breakfast dish featuring creamy avocado spread on toasted bread, topped with a perfectly fried or poached egg. Served with a side of greens for a balanced meal.",
     basePrice: 11.0,
     price: "GHc11.00",
     rating: "4.7",
     category: "breakfast",
     ingredients: [
       { name: "Sourdough Bread", included: true, price: 0 },
       { name: "Avocado", included: true, price: 0 },
       { name: "Egg", included: true, price: 0 },
       { name: "Olive Oil", included: true, price: 0 },
       { name: "Lemon Juice", included: true, price: 0 },
       { name: "Salt", included: true, price: 0 },
       { name: "Pepper", included: true, price: 0 },
       { name: "Feta Cheese", included: false, price: 1.5 },
       { name: "Bacon", included: false, price: 2.5 },
       { name: "Tomato Slices", included: false, price: 1.0 },
       { name: "Chili Flakes", included: false, price: 0.5 },
       { name: "Spinach", included: false, price: 1.5 },
     ],
   },
waffles: {
     title: "Waffles",
     image: "/imgs/waffle.jpeg",
     description:
       "Crispy on the outside, fluffy on the inside waffles served with a dusting of powdered sugar and maple syrup. Customize with your favorite toppings for a delicious breakfast treat.",
     basePrice: 9.0,
     price: "GHc9.00",
     rating: "4.7",
     category: "breakfast",
     ingredients: [
       { name: "Flour", included: true, price: 0 },
       { name: "Eggs", included: true, price: 0 },
       { name: "Milk", included: true, price: 0 },
       { name: "Baking Powder", included: true, price: 0 },
       { name: "Butter", included: true, price: 0 },
       { name: "Maple Syrup", included: true, price: 0 },
       { name: "Vanilla Extract", included: true, price: 0 },
       { name: "Powdered Sugar", included: true, price: 0 },
       { name: "Fresh Berries", included: false, price: 2.0 },
       { name: "Chocolate Chips", included: false, price: 1.5 },
       { name: "Whipped Cream", included: false, price: 1.0 },
       { name: "Banana Slices", included: false, price: 1.0 },
       { name: "Bacon", included: false, price: 2.5 },
     ],
   },
bread_and_egg_toasted: {
     title: "Bread and Egg Toasted",
     image: "/imgs/breadegg.jpeg",
     description:
       "A simple yet satisfying breakfast with toasted bread topped with a perfectly fried or scrambled egg. Served with a sprinkle of seasoning and a side of greens for a light, hearty meal.",
     basePrice: 6.5,
     price: "GHc6.50",
     rating: "4.5",
     category: "breakfast",
     ingredients: [
       { name: "Bread", included: true, price: 0 },
       { name: "Egg", included: true, price: 0 },
       { name: "Butter", included: true, price: 0 },
       { name: "Salt", included: true, price: 0 },
       { name: "Pepper", included: true, price: 0 },
       { name: "Olive Oil", included: false, price: 0.5 },
       { name: "Cheese", included: false, price: 1.0 },
       { name: "Avocado", included: false, price: 1.5 },
       { name: "Tomato Slices", included: false, price: 1.0 },
       { name: "Spinach", included: false, price: 1.0 },
     ],
   },

pancakes: {
     title: "Pancakes",
     image: "/imgs/pancakes.jpeg",
     description:
       "Fluffy and golden pancakes served with a drizzle of maple syrup, butter, and your choice of toppings. Perfect for a sweet and satisfying breakfast.",
     basePrice: 8.0,
     price: "GHc8.00",
     rating: "4.8",
     category: "breakfast",
     ingredients: [
       { name: "Flour", included: true, price: 0 },
       { name: "Eggs", included: true, price: 0 },
       { name: "Milk", included: true, price: 0 },
       { name: "Baking Powder", included: true, price: 0 },
       { name: "Butter", included: true, price: 0 },
       { name: "Maple Syrup", included: true, price: 0 },
       { name: "Vanilla Extract", included: true, price: 0 },
       { name: "Blueberries", included: false, price: 1.5 },
       { name: "Chocolate Chips", included: false, price: 1.5 },
       { name: "Banana Slices", included: false, price: 1.0 },
       { name: "Whipped Cream", included: false, price: 1.0 },
       { name: "Bacon", included: false, price: 2.5 },
     ],
   },

   french_toast: {
     title: "Brioche French Toast",
     image: "/imgs/french_toast.jpeg",
     description:
       "Thick slices of brioche bread soaked in a vanilla-cinnamon custard and grilled to golden perfection. Served with maple syrup, fresh berries, and a dusting of powdered sugar.",
     basePrice: 13.5,
     price: "GHc13.50",
     rating: "4.9",
     category: "breakfast",
     ingredients: [
       { name: "Brioche Bread", included: true, price: 0 },
       { name: "Vanilla-Cinnamon Custard", included: true, price: 0 },
       { name: "Maple Syrup", included: true, price: 0 },
       { name: "Mixed Berries", included: true, price: 0 },
       { name: "Powdered Sugar", included: true, price: 0 },
       { name: "Whipped Cream", included: false, price: 1.0 },
       { name: "Banana Slices", included: false, price: 1.5 },
       { name: "Chocolate Sauce", included: false, price: 1.5 },
       { name: "Bacon Strips", included: false, price: 3.0 },
       { name: "Caramelized Pecans", included: false, price: 2.0 },
     ],
   },
   oats: {
     title: "Oats Porridge",
     image: "/imgs/oats.jpeg",
     description:
       "A comforting bowl of oats cooked with milk or water and sweetened with honey or fruit. A perfect breakfast to start your day.",
     basePrice: 12.0,
     price: "GHc12.00",
     rating: "4.8",
     category: "breakfast",
     ingredients: [
       { name: "Rolled Oats", included: true, price: 0 },
       { name: "Milk", included: true, price: 0 },
       { name: "Water", included: true, price: 0 },
       { name: "Honey", included: true, price: 0 },
       { name: "Cinnamon", included: true, price: 0 },
       { name: "Fresh Berries", included: false, price: 12.0 },
       { name: "Banana Slices", included: false, price: 10.5 },
       { name: "Almonds", included: false, price: 6.0 },
       { name: "Chia Seeds", included: false, price: 6.0 },
       { name: "Peanut Butter", included: false, price: 5.5 },
     ],
   },
   tom_brown: {
     title: "Tom Brown",
     image: "/imgs/tom_brown.jpeg",
     description:
       "A delicious Ghanaian breakfast dish made from roasted corn flour, served with bread. It’s a nutritious and comforting way to start the day.",
     basePrice: 8.0,
     price: "GHc8.00",
     rating: "4.7",
     category: "breakfast",
     ingredients: [
       { name: "Roasted Corn Flour", included: true, price: 0 },
       { name: "Water", included: true, price: 0 },
       { name: "Sugar", included: true, price: 0 },
       { name: "Milk (optional)", included: false, price: 1.0 },
       { name: "Bread", included: true, price: 0 },
       { name: "Peanut Butter", included: false, price: 1.5 },
       { name: "Boiled Eggs", included: false, price: 1.0 },
     ],
   },

   chocolate_cake: {
     title: "Triple Chocolate Cake",
     image: "/imgs/chocolate_cake.jpeg",
     description:
       "Three layers of moist chocolate cake filled with chocolate ganache and frosted with chocolate buttercream. A chocolate lover's dream.",
     basePrice: 9.0,
     price: "GHc9.00",
     rating: "4.9",
     category: "desserts",
     ingredients: [
       { name: "Chocolate Cake", included: true, price: 0 },
       { name: "Chocolate Ganache", included: true, price: 0 },
       { name: "Chocolate Buttercream", included: true, price: 0 },
       { name: "Chocolate Shavings", included: true, price: 0 },
       { name: "Vanilla Ice Cream", included: false, price: 2.5 },
       { name: "Raspberry Sauce", included: false, price: 1.5 },
       { name: "Caramel Drizzle", included: false, price: 1.0 },
       { name: "Whipped Cream", included: false, price: 1.0 },
     ],
   },
   cheesecake: {
     title: "New York Cheesecake",
     image: "/imgs/cheesecake.jpeg",
     description:
       "Classic New York style cheesecake with a graham cracker crust. Rich, creamy, and perfectly balanced. Served with your choice of topping.",
     basePrice: 8.5,
     price: "GHc8.50",
     rating: "4.8",
     category: "desserts",
     ingredients: [
       { name: "Cream Cheese", included: true, price: 0 },
       { name: "Graham Cracker Crust", included: true, price: 0 },
       { name: "Vanilla Extract", included: true, price: 0 },
       { name: "Fresh Strawberry Topping", included: false, price: 1.5 },
       { name: "Blueberry Compote", included: false, price: 1.5 },
       { name: "Caramel Sauce", included: false, price: 1.0 },
       { name: "Chocolate Sauce", included: false, price: 1.0 },
       { name: "Whipped Cream", included: false, price: 1.0 },
     ],
   },
   tiramisu: {
     title: "Classic Tiramisu",
     image: "/imgs/tiramusu.jpeg",
     description:
       "Layers of espresso-soaked ladyfingers and mascarpone cream dusted with cocoa powder. An Italian classic made with authentic ingredients.",
     basePrice: 9.5,
     price: "GHc9.50",
     rating: "4.7",
     category: "desserts",
     ingredients: [
       { name: "Ladyfingers", included: true, price: 0 },
       { name: "Mascarpone Cheese", included: true, price: 0 },
       { name: "Espresso", included: true, price: 0 },
       { name: "Cocoa Powder", included: true, price: 0 },
       { name: "Marsala Wine", included: true, price: 0 },
       { name: "Chocolate Shavings", included: false, price: 1.0 },
       { name: "Coffee Liqueur", included: false, price: 2.0 },
       { name: "Fresh Berries", included: false, price: 2.0 },
     ],
   },

   sobolo: {
     title: "Sobolo (Hibiscus Drink)",
     image: "/imgs/sobolo.jpeg",
     description:
       "A refreshing traditional Ghanaian drink made from dried hibiscus flowers, pineapple, ginger, and aromatic spices. Served chilled with a hint of sweetness.",
     basePrice: 5.0,
     price: "GHc5.00",
     rating: "4.8",
     category: "drinks",
     ingredients: [
       { name: "Dried Hibiscus Flowers", included: true, price: 0 },
       { name: "Pineapple", included: true, price: 0 },
       { name: "Ginger", included: true, price: 0 },
       { name: "Cloves", included: true, price: 0 },
       { name: "Cinnamon", included: true, price: 0 },
       { name: "Natural Sweetener", included: true, price: 0 },
       { name: "Mint Leaves", included: false, price: 0.5 },
       { name: "Extra Pineapple", included: false, price: 1.0 },
       { name: "Lime Wedge", included: false, price: 0.5 },
     ],
   },
   asana: {
     title: "Asana (Fermented Corn Drink)",
     image: "/imgs/asana.jpeg",
     description:
       "A traditional Ghanaian milky beverage made from fermented corn, sugar, and milk. Smooth, creamy, and slightly tangy with a natural sweetness.",
     basePrice: 4.5,
     price: "GHc4.50",
     rating: "4.7",
     category: "drinks",
     ingredients: [
       { name: "Fermented Corn", included: true, price: 0 },
       { name: "Milk", included: true, price: 0 },
       { name: "Sugar", included: true, price: 0 },
       { name: "Vanilla", included: true, price: 0 },
       { name: "Nutmeg", included: true, price: 0 },
       { name: "Coconut Milk Option", included: false, price: 1.0 },
       { name: "Cinnamon Sprinkle", included: false, price: 0.5 },
       { name: "Honey (instead of sugar)", included: false, price: 0.75 },
     ],
   },
   palm_wine: {
     title: "Palm Wine",
     image: "/imgs/palm_wine.jpeg",
     description:
       "Fresh, naturally fermented sap collected from palm trees. This traditional West African drink has a sweet, mildly alcoholic taste that varies from sweet to sour depending on fermentation time.",
     basePrice: 6.5,
     price: "GHc6.50",
     rating: "4.6",
     category: "drinks",
     ingredients: [
       { name: "Fresh Palm Sap", included: true, price: 0 },
       { name: "Natural Fermentation", included: true, price: 0 },
       { name: "Served Chilled", included: true, price: 0 },
       { name: "Traditional Calabash Serving", included: false, price: 2.0 },
       { name: "Honey Sweetening", included: false, price: 1.0 },
       { name: "Lime Wedge", included: false, price: 0.5 },
     ],
   },
   don_simon: {
     title: "Don Simon Sangria",
     image: "/imgs/don simon.jpeg",
     description:
       "Imported Spanish sangria with a perfect balance of red wine and fruit flavors. Served chilled with fresh fruit garnish.",
     basePrice: 7.5,
     price: "GHc7.50",
     rating: "4.5",
     category: "drinks",
     ingredients: [
       { name: "Don Simon Sangria", included: true, price: 0 },
       { name: "Ice", included: true, price: 0 },
       { name: "Orange Slice", included: true, price: 0 },
       { name: "Apple Slice", included: true, price: 0 },
       { name: "Mixed Fresh Fruit", included: false, price: 1.5 },
       { name: "Splash of Brandy", included: false, price: 2.0 },
       { name: "Cinnamon Stick", included: false, price: 0.5 },
     ],
   },
   coca_cola: {
     title: "Coca-Cola",
     image: "/imgs/coca cola.jpeg",
     description:
       "Classic Coca-Cola served ice cold with a slice of lemon. Available in regular or zero sugar options.",
     basePrice: 3.0,
     price: "GHc3.00",
     rating: "4.9",
     category: "drinks",
     ingredients: [
       { name: "Coca-Cola", included: true, price: 0 },
       { name: "Ice", included: true, price: 0 },
       { name: "Lemon Slice", included: true, price: 0 },
       { name: "Zero Sugar Option", included: false, price: 0 },
       { name: "Lime Instead of Lemon", included: false, price: 0 },
       { name: "Cherry Flavor", included: false, price: 0.5 },
     ],
   },
   fruit_smoothie: {
     title: "Tropical Fruit Smoothie",
     image: "/imgs/fruit_smoothie.jpeg",
     description:
       "A refreshing blend of mango, pineapple, banana, and orange juice. All natural ingredients with no added sugar.",
     basePrice: 6.0,
     price: "GHc6.00",
     rating: "4.8",
     category: "drinks",
     ingredients: [
       { name: "Fresh Mango", included: true, price: 0 },
       { name: "Pineapple", included: true, price: 0 },
       { name: "Banana", included: true, price: 0 },
       { name: "Orange Juice", included: true, price: 0 },
       { name: "Ice", included: true, price: 0 },
       { name: "Yogurt", included: false, price: 1.0 },
       { name: "Coconut Milk", included: false, price: 1.0 },
       { name: "Protein Boost", included: false, price: 2.0 },
       { name: "Chia Seeds", included: false, price: 0.75 },
       { name: "Spinach", included: false, price: 1.0 },
     ],
   },
   fresh_coconut: {
     title: "Fresh Coconut Water",
     image: "/imgs/coconut.jpeg",
     description:
       "Pure coconut water served in the shell. A natural hydrating drink rich in electrolytes. Harvested from young green coconuts.",
     basePrice: 5.5,
     price: "GHc5.50",
     rating: "4.9",
     category: "drinks",
     ingredients: [
       { name: "Young Green Coconut", included: true, price: 0 },
       { name: "Natural Coconut Water", included: true, price: 0 },
       { name: "Straw", included: true, price: 0 },
       { name: "Coconut Meat Spoon", included: true, price: 0 },
       { name: "Rum Shot Addition", included: false, price: 3.5 },
       { name: "Lime Juice", included: false, price: 0.5 },
       { name: "Mint Leaves", included: false, price: 0.5 },
     ],
   },
   bissap: {
     title: "Bissap (Hibiscus Tea)",
     image: "/imgs/bissap.jpeg",
     description:
       "A West African favorite made from dried hibiscus flowers, similar to Sobolo but with a different blend of spices. Sweet, tart, and refreshing.",
     basePrice: 5.0,
     price: "GHc5.00",
     rating: "4.7",
     category: "drinks",
     ingredients: [
       { name: "Dried Hibiscus Flowers", included: true, price: 0 },
       { name: "Mint", included: true, price: 0 },
       { name: "Ginger", included: true, price: 0 },
       { name: "Sugar", included: true, price: 0 },
       { name: "Orange Essence", included: true, price: 0 },
       { name: "Vanilla", included: false, price: 0.5 },
       { name: "Lemon Slice", included: false, price: 0.5 },
       { name: "Honey (instead of sugar)", included: false, price: 0.75 },
     ],
   },
 };
