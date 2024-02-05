const {Configuration, OpenAI} = require('openai')
require('dotenv').config()
const openai = new OpenAI({
  api_key: process.env.OPENAI_API_KEY
});

const recipe1 = async (ingredients, cuisine, dietary) => {

    system_role_content = "You are a talented cook."
  
    prompt = `Create a recipe based on the following ingredients ${ingredients}.
        Do not use any other ingredients except salt, pepper and olive oil. Not all ingredients have to be used.
        Recipe should be of ${cuisine} cuisine. Recipe must adhere to deitary restriction of ${dietary}.
        Your answer should start with "Recipe: " and the name of the recipe. 
        If not food related words given in ingredients, suggest any dish instead of using above ingredients listed.
        If no proper cuisine given, use chinese cuisine.
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
    console.log(meal)
    console.log(name)

    const actual = name.toString()
    console.log(actual)

    const {imageUrl} = await createMealImage(actual)
    console.log(imageUrl)


}

const createMealImage = async (title) => {

  image_prompt = `${title}, high quality food photography`
  
  const image = await openai.images.generate({
      prompt: image_prompt,
      n: 1,
      size: '1024x1024'
  })

  console.log(image)
  console.log(image.data[0])

  const imageUrl = image.data[0].url
  
  return imageUrl
    
}

function dishname(meal){
  const lines = meal.split('\n')
  const name = lines.slice(0, 1)
  const title1 = name.map(line => line.replace('Recipe ', ''))
  const title2 = title1.map(line => line.replace('Title ', ''))
  const title3 = title2.map(line => line.replace(':', ''))
  return title3

}

module.exports = {recipe1}



    

