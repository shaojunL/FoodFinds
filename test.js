const {recipe1} = require('./generate');
foods = 'broccoli, chicken, fish, vegetables, cabbage, eggs'

async function main(foods) {
    try {
      const res = await recipe1(foods);
      console.log(res);
    } catch (error) {
      console.error("Error in main function response:", error);
    }
  }
  
main(foods);
  





    
