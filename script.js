"use strict";

const drinkInput = document.querySelector(".drink-input");
const searchBtn = document.querySelector(".search-btn");
const drinkImg = document.querySelector("img");
const drinkName = document.querySelector("h1");
const ingList = document.querySelector(".ing-list");
const instructions = document.querySelector(".instructions");
const drinkList = document.querySelector(".drink-list");
let result;

function searchDrink() {
  let drink = drinkInput.value;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      result = data;
      renderDrinkList(data);
      // renderPage(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  drinkInput.value = "";
  drinkInput.blur();
}

function renderPage(e) {
  const drink = result.drinks.find(
    (drink) => drink.strDrink === e.target.textContent
  );
  drinkImg.src = drink.strDrinkThumb;
  drinkName.textContent = drink.strDrink;
  instructions.textContent = drink.strInstructions;
  renderIngredients(drink);
}

function renderIngredients(drink) {
  ingList.innerHTML = "";
  let html = "";
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    if (ing === null) break;
    html += `<li>${ing}</li>`;
  }
  ingList.insertAdjacentHTML("afterbegin", html);
}

function renderDrinkList(data) {
  drinkList.innerHTML = "";
  let html = "";
  for (let i = 0; i < data.drinks.length; i++) {
    const drink = `<li class="drink-link">${data.drinks[i].strDrink}</li>`;
    drinkList.insertAdjacentHTML("beforeend", drink);
    const drinkLink = document.querySelector(".drink-link:last-child");
    drinkLink.addEventListener("click", renderPage);
  }
  // drinkList.insertAdjacentHTML("afterbegin", html);
}

searchBtn.addEventListener("click", searchDrink);
