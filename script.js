"use strict";

const drinkInput = document.querySelector(".drink-input");
const searchBtn = document.querySelector(".search-btn");
const drinkImg = document.querySelector("img");
const drinkName = document.querySelector("h1");
const ingList = document.querySelector(".ing-list");

// let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
// let returnData;

// fetch(url)
//   .then((res) => res.json()) // parse response as JSON
//   .then((data) => {
//     console.log(data);
//     renderPage(data);
//   })
//   .catch((err) => {
//     console.log(`error ${err}`);
//   });

function searchDrink() {
  let drink = drinkInput.value;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      renderPage(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  drinkInput.value = "";
  drinkInput.blur();
}

function renderPage(data) {
  drinkImg.src = data.drinks[0].strDrinkThumb;
  drinkName.textContent = data.drinks[0].strDrink;
  renderIngredients(data);
}

function renderIngredients(data) {
  const drinkData = data.drinks[0];
  let html = "";
  for (let i = 1; i <= 15; i++) {
    const ing = drinkData[`strIngredient${i}`];
    if (ing === null) break;
    html += `<li>${ing}</li>`;
  }
  ingList.insertAdjacentHTML("afterbegin", html);
}

searchBtn.addEventListener("click", searchDrink);
