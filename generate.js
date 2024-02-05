const {Configuration, OpenAI} = require('openai')
require('dotenv').config()
const openai = new OpenAI({
  api_key: process.env.OPENAI_API_KEY
});

const recipe1 = async (ingredients) => {

    system_role_content = "You are a talented cook."
  
    prompt = `Create a recipe based on the following ingredients ${ingredients}.
        Do not use any other ingredients except salt, pepper and olive oil. Not all ingredients have to be used.
        Your answer should start with "Recipe: " and the name of the recipe
      `
  
    messages = [
      { 'role': 'system', 'content': system_role_content },
      { 'role': 'user', 'content': prompt }
    ]
  
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 400,
      n: 1
    })

    meal = response.choices[0].message.content

    const name = dishname(meal)
    const actual = name.toString()

    const foodl = ingredientlist(meal)

    const instructionsl = stepslist(meal)

    const imageUrl = await createMealImage(actual)

}

const createMealImage = async (title) => {

  image_prompt = `${title}, high quality food photography`
  
  const image = await openai.images.generate({
      prompt: image_prompt,
      n: 1,
      size: '1024x1024'
  })


  const url = JSON.stringify(image.data[0])
  const temp1 = url.replace('{"url":"', '')
  const temp2 = temp1.replace('"}', '')
  return temp2
    
}

function dishname(meal){
  const lines = meal.split('\n')
  const name = lines.slice(0, 1)
  const title1 = name.map(line => line.replace('Recipe: ', ''))
  return title1
}

function ingredientlist(meal){
  const temp1 = meal.split("Ingredients:\n")
  const temp2 = temp1[1].split("Instructions:\n")
  return temp2[0]
}

function stepslist(meal){
  const temp = meal.split("Instructions:\n")
  return temp[1]
}

module.exports = {recipe1}



    

