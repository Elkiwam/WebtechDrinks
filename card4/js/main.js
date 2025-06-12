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

//slider test for toggle 
const slider = document.querySelector(".slider");

// card element change colors on click
const card = document.querySelector(".card");
card.style.backgroundColor = "rgb(120, 120, 240)";
card.style.color = "rgb(210, 210, 255)";
card.style.borderRadius = "0px";
//collapsible background color
const content = document.querySelector(".content");
content.style.backgroundColor = "rgb(50, 68, 127)";
//glass type change color on click
glassType.style.backgroundColor = "rgb(50, 68, 127)";
const glassImgElement = document.querySelector("glass-type img");


// button colors to change on click
 const button1 = document.querySelector(".button1");
 const button2 = document.querySelector(".button2");
 const collapsible = document.querySelector(".collapsible");
 button1.style.backgroundColor = "rgb(255, 255, 255)"; 
 button1.style.color = "rgb(0, 0, 0)"; 
 collapsible.style.backgroundColor = "rgb(255, 255, 255)";
 collapsible.style.color = "rgb(0, 0, 0)";

// Change the border-radius of buttons
button1.style.borderRadius = "25px"; 
button2.style.borderRadius = "25px";
collapsible.style.borderRadius = "25px"; 

//change the font of h2 on toggle
const h2Elements = document.querySelectorAll("h2");
h2Elements.forEach((h2) => {
  h2.style.fontFamily = "PlayPen, sans-serif";
  h2.style.color = "rgb(255, 255, 255)"; // Change to your desired color
});
// Add hover state for the buttons
const buttons = [button1, button2, collapsible];

buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "rgb(50, 68, 127)"; // Change to hover color
    button.style.color = "rgb(255, 255, 255)"; // Change to hover text color
  });

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "rgb(255, 255, 255)"; // original color
    button.style.color = "rgb(0, 0, 0)"; // original text color
  });
});

//style saver should include button hover colors
// Function to save the current style to localStorage
function saveStyleToLocalStorage() {
  const styleData = {
    cardBackgroundColor: card.style.backgroundColor,
    cardTextColor: card.style.color,
    buttonBackgroundColor: button1.style.backgroundColor,
    buttonBorderRadius: button1.style.borderRadius,
    buttonHoverBackgroundColor: "rgb(50, 68, 127)", // Default hover color for darker mode
    buttonHoverTextColor: "rgb(255, 255, 255)", // Default hover text color for darker mode
    h2FontFamily: h2Elements[0].style.fontFamily,
    h2Color: h2Elements[0].style.color,
    glassTypeBackgroundColor: glassType.style.backgroundColor,
    contentBackgroundColor: content.style.backgroundColor,
  };
  localStorage.setItem("styleData", JSON.stringify(styleData));
}

// Function to load the style from localStorage
function loadStyleFromLocalStorage() {
  const styleData = JSON.parse(localStorage.getItem("styleData"));
  if (styleData) {
    card.style.backgroundColor = styleData.cardBackgroundColor;
    card.style.color = styleData.cardTextColor;
    button1.style.backgroundColor = styleData.buttonBackgroundColor;
    button1.style.borderRadius = styleData.buttonBorderRadius;
    button2.style.borderRadius = styleData.buttonBorderRadius;
    collapsible.style.borderRadius = styleData.buttonBorderRadius;
    h2Elements.forEach((h2) => {
      h2.style.fontFamily = styleData.h2FontFamily;
      h2.style.color = styleData.h2Color;
    });
    glassType.style.backgroundColor = styleData.glassTypeBackgroundColor;
    content.style.backgroundColor = styleData.contentBackgroundColor;

    // Apply hover colors to buttons
    buttons.forEach((button) => {
      button.dataset.hoverBackgroundColor = styleData.buttonHoverBackgroundColor;
      button.dataset.hoverTextColor = styleData.buttonHoverTextColor;

      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = styleData.buttonHoverBackgroundColor;
        button.style.color = styleData.buttonHoverTextColor;
      });

      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = styleData.buttonBackgroundColor;
        button.style.color = "rgb(0, 0, 0)"; // Default text color
      });
    });
  }
}

// Ensure DOM is fully loaded before executing the code
document.addEventListener("DOMContentLoaded", () => {
  // Load the style when the page is loaded
  loadStyleFromLocalStorage();

  // Save the style whenever the slider is clicked
  if (slider) {
    slider.addEventListener("click", saveStyleToLocalStorage);
  }
});
//style saver done

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

// toggler styling the card bg and texts 
slider.addEventListener("click", function() {
  const currentColor = card.style.backgroundColor;
  const color1 = "rgb(30, 30, 30)"; 
  const color2 = "rgb(120, 120, 240)"; 
  const currentTextColor = card.style.color;
  const textColor1 = "rgb(210, 210, 255)"; 
  const textColor2 = "rgb(255, 255, 255)"; 
  currentButtonColor = button1.style.backgroundColor;
  const buttonColor1 = "rgb(255, 255, 255)"; 
  const buttonColor2 = "rgb(255,255,255)"; 

  if (currentColor === color1) {
    card.style.backgroundColor = color2; 
    card.style.color = textColor1; 
    card.style.borderRadius = "25px";
    //buttons here
     button1.style.backgroundColor = buttonColor1; 
     button1.style.borderRadius = "25px"; 
     button2.style.borderRadius = "25px";
     collapsible.style.borderRadius = "25px";
     // h2 styling
     h2Elements.forEach((h2) => {
       h2.style.fontFamily = "PlayPen, sans-serif";
       h2.style.color = "rgb(255, 255, 255)";
       //glass type background color
       glassType.style.backgroundColor = "rgb(50, 68, 127)";
           //collapsible background color
          content.style.backgroundColor = "rgb(50, 68, 127)";
       //button hover
       buttons.forEach((button) => {
        button.addEventListener("mouseover", () => {
          button.style.backgroundColor = "rgb(50, 68, 127)"; // Change to hover color
          button.style.color = "rgb(255, 255, 255)"; // Change to hover text color
        });
      
        button.addEventListener("mouseout", () => {
          button.style.backgroundColor = "rgb(255, 255, 255)"; // original color
          button.style.color = "rgb(0, 0, 0)"; // original text color

         
        });
      });
     });
    console.log("Color mode 1");
  } else {
    card.style.backgroundColor = color1; 
    card.style.color = textColor2;
    card.style.borderRadius = "0px";
        //buttons here
     button1.style.backgroundColor = buttonColor2;
     button1.style.borderRadius = "0px"; 
     button2.style.borderRadius = "0px";
     collapsible.style.borderRadius = "0px";
     // h2 styling
     h2Elements.forEach((h2) => {
       h2.style.fontFamily = "BebasNeue, sans-serif";
       h2.style.color = "rgb(255, 255, 255)";
    //glass type background color
    glassType.style.backgroundColor = "rgb(200, 68, 127)";
    //collapsible background color
    content.style.backgroundColor = "rgb(200, 68, 127)";
//button hover
              buttons.forEach((button) => {
                button.addEventListener("mouseover", () => {
                  button.style.backgroundColor = "rgb(200, 68, 127)"; // Change to hover color
                  button.style.color = "rgb(255, 255, 255)"; // Change to hover text color
                });
              
                button.addEventListener("mouseout", () => {
                  button.style.backgroundColor = "rgb(255, 255, 255)"; // original color
                  button.style.color = "rgb(0, 0, 0)"; // original text color
                });
              });

     });
    console.log("Color mode 2");
  }
});

//hover effect on full card
card.addEventListener("mouseover", function() {
  card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
});
card.addEventListener("mouseout", () => {
  card.style.boxShadow = "0 0 0 rgb(0, 0, 0)";
});

// Add slight movement to the card based on mouse position
card.addEventListener("mousemove", (event) => {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left; 
  const y = event.clientY;

  const centerX = rect.width;
  const centerY = rect.height;

  const rotateX = ((y - centerY) / centerY) * -15;
  const rotateY = ((x - centerX) / centerX) * -15;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Reset the card's position when the mouse leaves
card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
});