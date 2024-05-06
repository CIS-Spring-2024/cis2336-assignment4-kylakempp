const express = require('express');
const app = express();
const PORT = 3000;

// body parser middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// serve static files from 'frontend' folder
app.use(express.static(__dirname + '/../frontend'));

// GET request to serve order form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../frontend/HTML/cafeorder.html');
});

// POST request to handle form submission
app.post('/submit', (req, res) => {
    // Extract quantities of selected items from the request body
    const itemQuantities = Object.keys(req.body)
        .filter(key => key.endsWith('_quantity'))
        .map(key => parseInt(req.body[key]) || 0);

    //  prices for each item 
    const foodPrices = {
        pancakes: 6.99,
        omelette: 8.99,
        frenchToast: 7.49,
        muffins: 5.99,
        waffles: 8.49,
        grilledCheese: 4.99,
        sandwich: 5.99,
        salad: 7.99,
        burger: 8.49,
        chickenWrap: 6.99,
        soup: 5.49,
        pizza: 10.99,
        chickenRice: 9.99,
        pasta: 10.99,
        bbqWings: 12.49,
        chickenParm: 12.99,
        vegStirfry: 11.99,
        sushi: 14.49,
        soda: 1.49,
        coffee: 4.99,
        milk: 1.99,
        brownie: 2.99,
        cookie: 1.99,
        cupcake: 2.99
    };

    // Check for negative quantities or quantities exceeding a certain limit
    const hasInvalidQuantity = itemQuantities.some(quantity => quantity < 0 || quantity > 10);
    if (hasInvalidQuantity) {
        return res.status(400).send('Invalid quantity for one or more items.');
    }
    

    // Calculate total amount based on quantities and prices
    let total = 0;
    itemQuantities.forEach((quantity, index) => {
        const itemName = Object.keys(req.body)[index].split('_')[0]; // Extract item name from input name
        if (foodPrices[itemName]) {
            total += quantity * foodPrices[itemName];
        }
    });

    // send back the total in response
    res.send(`Total: $${total.toFixed(2)}`);
});

// server listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
