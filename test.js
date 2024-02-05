const {recipe1} = require('./generate');

/*
var selectedDiet = document.getElementById("selectDietaryRestrictions").value;
var cuisineInput = document.getElementById("cuisine").value;
var ingredientsInput = document.getElementById("ingredients").value;

foods = ingredientsInput //change to ingredients input
cuisine = cuisineInput //change to cuisine input
dietary = selectedDiet //change to dietary restriction input
*/

async function main(foods, cuisine, dietary) {
    try {
      const res = await recipe1(foods, cuisine, dietary);
      console.log(res);
      updateOutput(res);
    } catch (error) {
      console.error("Error in main function response: ", error, "/n Please try again with proper inputs.");
    }
  }

//main(foods, cuisine, dietary);
  
function submitForm() {
  // Get values from the input fields
  var selectedDiet = document.getElementById("selectDietaryRestrictions").value;
  var cuisineInput = document.getElementById("cuisine").value;
  var ingredientsInput = document.getElementById("ingredients").value;

  // Call the main function with the form inputs
  document.getElementById("output-content").innerHTML = main(ingredientsInput, cuisineInput, selectedDiet);

  // Redirect to the output.html page
  window.location.href = "recipe.html";
}




    
