module.exports = function (userInput) {
  if (userInput === product_name) {
    return req.body.product_name;

  } else if (userInput === price) {
    return req.body.price;

  } else if (userInput === stock) {
    return req.body.stock;

  } else if (userInput === category_id) {
    return req.body.category_id;
    
  } else {
    throw console.error("user input incorrect");
  }
};
