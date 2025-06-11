console.log("...fetching a random cocktail");

// prepare needed dom elements
const titleContainer = document.querySelector("[data-js='title']");
const imgContainer = document.querySelector("[data-js='photo']");
// glass type container
const glassType = document.querySelector("[data-js='glassType']");
//ingredient counter
const ingredientList = document.querySelector("[data-js='ingredients']");
const ingredients = new Array();
const ingrCounter = document.querySelector("[data-js='ingrCounter']");
//  preparation instructions
const preparationContainer = document.querySelector("[data-js='preparation']");

// // card element change colors on click
const card = document.querySelector(".card");
card.style.backgroundColor = "rgb(120, 120, 240)";
card.style.color = "rgb(210, 210, 255)";
// // toggle button color
// const button1 = document.querySelector(".button1");
// const button2 = document.querySelector(".button2");
// button1.style.backgroundColor = "rgb(240, 30, 30)"; 
// button1.style.color = "rgb(0, 255, 255)"; 
// button2.style.backgroundColor = "rgb(30, 30, 30)"; 
// button2.style.color = "rgb(255, 255, 255)";

//slider test for toggle 
const slider = document.querySelector(".slider");

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
      const formattedMeasure = measure ? `${measure} ` : '';
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
//try to sanitize /rewrite 
const glassImages = {
  "Highball glass": "./glasses/highball-glass.svg",
  "Cocktail glass": "./glasses/martini-glass.svg",
  "Old-fashioned glass": "./glasses/old-fashioned.svg",
  "Collins Glass": "./glasses/collins-glass.svg",
  "Collins glass": "./glasses/collins-glass.svg",
  "Champagne flute": "./glasses/champagne-flute.svg",
  "Whiskey glass": "./glasses/whiskey-glass.svg",
  "Martini glass": "./glasses/martini-glass.svg",
  "Shot glass": "./glasses/shot-glass.svg",
  "Pint glass": "./glasses/pint-glass.svg",
  "Beer glass": "./glasses/pint-glass.svg",
  "Margarita glass": "./glasses/margharita-glass.svg",
  "Hurricane glass": "./glasses/hurricane.svg",
  "Wine Glass": "./glasses/wine-glass.svg",
  "Beer mug": "./glasses/mug.svg",
  "Mason jar": "./glasses/mason-jar.svg",
  "Other/unknown": "./glasses/undefined.svg",
};

// Check if the glass type exists in the mapping and assign the corresponding image
const glassImageSrc = glassImages[drink.strGlass] || glassImages["Other/unknown"];

// Create an img element for the glass type and append it to the DOM
const glassImg = document.createElement("img");
glassImg.src = glassImageSrc;
glassImg.alt = drink.strGlass;
glassType.appendChild(glassImg);

// Label the drink based on the number of ingredients
const ingredientCount = ingredients.filter(ingredient => ingredient).length;
console.log("Ingredients Count:", ingredientCount);

if (ingredientCount <= 2) {
  console.log("This drink difficulty is labeled as: Quick and Easy");
  ingrCounter.innerHTML += `Quick and Easy!  (${ingredientCount} ingredients)`;
} else if (ingredientCount <= 4) {
  console.log("This drink difficulty is labeled as: Quite easy!");
  ingrCounter.innerHTML += `Quite easy!  (${ingredientCount} ingredients)`;
}else if (ingredientCount <= 6) {
  console.log("This drink difficulty is labeled as: Worth it!");
  ingrCounter.innerHTML += `Worth it!  (${ingredientCount} ingredients)`;
} else {
  console.log("This drink is labeled as: Impressive!");
  ingrCounter.innerHTML += ` Impressive! (${ingredientCount} ingredients)`;
}

  // Check if the drink has preparation instructions
  if (drink.strInstructions) {
    // Display the preparation instructions in the container
    preparationContainer.innerHTML = `<p>${drink.strInstructions}</p>`;
  } else {
    // If no instructions are available, display a default message
    preparationContainer.innerHTML = `<p>Preparation instructions are not available for this drink.</p>`;
  }

  console.log("prep:", drink.strInstructions);

  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });


  // event listener for description collapsible
  var coll = document.getElementsByClassName("collapsible");
  var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// color toggler styling the card bg and texts 
slider.addEventListener("click", function() {
  const currentColor = card.style.backgroundColor;
  const color1 = "rgb(30, 30, 30)"; 
  const color2 = "rgb(120, 120, 240)"; 
  const currentTextColor = card.style.color;
  const textColor1 = "rgb(210, 210, 255)"; 
  const textColor2 = "rgb(255, 255, 255)"; 
  // const buttonColor1 = "rgb(240, 30, 30)"; 
  // const buttonColor2 = "rgb(30, 30, 30)"; 
  // const button2Color1 = "rgb(240, 30, 30)";
  // const button2Color2 = "rgb(30, 30, 30)";

  if (currentColor === color1) {
    card.style.backgroundColor = color2; 
    card.style.color = textColor1; 
    // button1.style.backgroundColor = buttonColor1; 
    // button2.style.backgroundColor = button2Color1;
    console.log("Color mode 1");
  } else {
    card.style.backgroundColor = color1; // Change back to original color
    card.style.color = textColor2;
    // button1.style.backgroundColor = buttonColor2;
    // button2.style.backgroundColor = button2Color2;
    console.log("Color mode 2");
  }
});