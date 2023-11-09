// Products
var quantities = {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
    p7: 0,
    p8: 0,
};

// Function to Update Quantity of Products and Price
function updateQuantity(product, price) {
    // Get the checkbox and output elements
    var checkbox = document.getElementById(product);

    // Update the quantity in the JavaScript object
    quantities[product] = checkbox.checked ? 1 : 0;

    // Update the total price
    updateTotalPrice();
}

// DISPLAY FINAL PRICE IN PURCHASE
function displayQuantities() {
    // Display the updated quantities
    for (var product in quantities) {
        console.log("Quantity for " + product + ": " + quantities[product]);
    }
}

function updateTotalPrice() {
    // Calculate the total price based on quantities and prices
    var totalPrice = 0;
    for (var product in quantities) {
        totalPrice += quantities[product] * getPrice(product);
    }

    // Update the displayed total price
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}

function getPrice(product) {
    
    if (product === 'p1') {
        return 20.99;
    } else if (product === 'p2') {
        return 15.99;
    } else if (product === 'p3') {
        return 30.99;
    } else if (product === 'p4') {
        return 25.99;
    } else if (product === 'p5') {
        return 1200.99;
    } else if (product === 'p6') {
        return 1300.99;
    } else if (product === 'p7') {
        return 13.99;
    }    else if (product === 'p8') {
        return 13.99;
    } else {
        return 0.00;
    } 
    
}

// Subtract the total from the balance
function purchase() {
  
}
