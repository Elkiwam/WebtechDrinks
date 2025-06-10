console.log("...fetching a random cocktail 🍹");

// prepare dom elements
const titleContainer = document.querySelector("[data-js='title']");
const imgContainer = document.querySelector("[data-js='photo']");
const ingredientList = document.querySelector("[data-js='ingredients']");
const ingredients = new Array();
const glassType = document.querySelector("[data-js='glassType']");

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((response) => response.json())
  .then((data) => {
    // Process the fetched data here

    // select the first (and only drink of the results)
    const drink = data.drinks[0];

    // check in console
    console.log("drink: ", drink);

    // display title in title container
    titleContainer.innerHTML = drink.strDrink;

    // display drink image to the screen
    // first create an img tag on the fly
    const img = document.createElement("img");
    img.src = drink.strDrinkThumb;
    img.alt = drink.strDrink;
    imgContainer.appendChild(img);

    // display the ingredients
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (ingredient) {
        const formattedMeasure = measure ? measure : '';
        ingredients[i - 1] = `${formattedMeasure}${ingredient}`.trim();
      }
    }

    // check in console
    console.log("All Ingredients:", ingredients);
    ingredients.forEach(ing => console.log(ing));

    // restructure ingredients to be single words in the ingredientList
    ingredientList.innerHTML = ingredients
      .map(ingredient => `<ul>${ingredient}</ul>`)
      .join('');

//line below displays glass type in text
//glassType.innerHTML = drink.strGlass;

// check glass type in console
console.log("Glass Type:", drink.strGlass);

// Assign different images to each glass type
const glassImages = {
  "Highball glass": "./glasses/001.png",
  "Cocktail glass": "./glasses/001.png",
  "Old-fashioned glass": "./glasses/001.png",
  "Collins glass": "./glasses/001.png",
  "Champagne flute": "./glasses/001.png",
  "Whiskey glass": "./glasses/001.png",
  "Martini glass": "images/martini_glass.png",
  "Shot glass": "./glasses/001.png",
  "Pint glass": "./glasses/001.png",
  "Margarita glass": "./glasses/001.png",
  "Hurricane glass": "./glasses/002.png",
  "Wine Glass": "./glasses/002.png",
  "Beer mug": "./glasses/002.png",
  "Mason jar": "./glasses/002.png",
  "Other/unknown": "./glasses/002.png"
};

// Check if the glass type exists in the mapping and assign the corresponding image
const glassImageSrc = glassImages[drink.strGlass] || glassImages["Other/unknown"];

// Create an img element for the glass type and append it to the DOM
const glassImg = document.createElement("img");
glassImg.src = glassImageSrc;
glassImg.alt = drink.strGlass;
glassType.appendChild(glassImg);


  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });