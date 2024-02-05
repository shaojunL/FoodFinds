const {recipe1} = require('./generate');
foods = 'nkjhfgmh' //change to ingredients input
cuisine = 'kjgfvbjuyfvb' //change to cuisine input
dietary = 'none' //change to dietary restriction input

async function main(foods, cuisine, dietary) {
    try {
      const res = await recipe1(foods, cuisine, dietary);
      console.log(res);
    } catch (error) {
      console.error("Error in main function response: ", error, "/n Please try again with proper inputs.");
    }
  }
  
main(foods, cuisine, dietary);
  





    
