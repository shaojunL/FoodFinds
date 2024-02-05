const {recipe1} = require('./generate');

var selectedDiet = document.getElementById("selectDietaryRestrictions").value;
var cuisineInput = document.getElementById("cuisine").value;
var ingredientsInput = document.getElementById("ingredients").value;

foods = selectedDiet //change to ingredients input
cuisine = cuisineInput //change to cuisine input
dietary = ingredientsInput //change to dietary restriction input

async function main(foods, cuisine, dietary) {
    try {
      const res = await recipe1(foods, cuisine, dietary);
      console.log(res);
    } catch (error) {
      console.error("Error in main function response: ", error, "/n Please try again with proper inputs.");
    }
  }
  
main(foods, cuisine, dietary);
  





    
