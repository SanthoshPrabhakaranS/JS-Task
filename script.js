const addBtn = document.querySelector(".add-btn");
const restName = document.querySelector("#restaurant-name");
const foodType = document.querySelector("#food-type");
const dishName = document.querySelector("#dish-name");
const imgBtn = document.querySelector(".img-btn");
const desc = document.querySelector("#desc");
const cardsContainer = document.querySelector(".cards-container");
const apiImg = document.querySelector('.api-img')

// buttons
const removeAllBtn = document.querySelector(".remove-all");
const showAllBtn = document.querySelector(".show-all-btn");
const breakfastBtn = document.querySelector(".breakfast-btn");
const brunchbtn = document.querySelector(".brunch-btn");
const lunchBtn = document.querySelector(".lunch-btn");
const dinnerBtn = document.querySelector(".dinner-btn");

addBtn.addEventListener("click", (e) => {
  e.target = e.preventDefault();
  formValidation();
  apiImg = ''
});

let IMAGE = "";
imgBtn.addEventListener("click", (e) => {
  e.target = e.preventDefault();
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      IMAGE = data.meals[0].strMealThumb;
    });

    // const apiImgContainer = document.createElement('img')
    // apiImgContainer.src = IMAGE
    // apiImg.appendChild(apiImgContainer)
    // console.log(apiImgContainer)
    // apiImg.innerHTML = `<img src=${data.cardImage} class="api-img" alt=""></img>`
})

function formValidation() {
  if (restName.value === "" && dishName.value === "" && desc.value === "") {
    alert("All Fields To Be Filled");
  } else if (restName.value === "") {
    alert("Restaurant Name cannot be empty");
  } else if (foodType.value == "choose" || foodType.value == "") {
    alert("Type Cannot be empty");
  } else if (dishName.value === "") {
    alert("Dish Name cannot be empty");
  } else {
    acceptData();
    resetForm();
  }
}

let data = {};

let acceptData = () => {
  data["NameOfRest"] = restName.value;
  data["typeOfFood"] = foodType.value;
  data["nameOfDish"] = dishName.value;
  data["DescOfDish"] = desc.value;
  if (IMAGE !== "") {
    data["cardImage"] = IMAGE;
  }

  createCards();
  IMAGE = "";
};

let createCards = () => {
  cardsContainer.innerHTML += `<div class="card card-length mt-4 m-3">
  <div class="card-header">
      <div class="card-header-left mt-1 fw-bold">${data.NameOfRest}
      </div>
      <div class="card-header-right mt-1">
          <i onClick="editCard(this)" class="fa-solid fa-file-pen edit-icon" ></i>
          <i onClick="deleteCard(this)" class="fa-solid fa-xmark close-icon"></i>
      </div>
  </div>

  <div class="card-content">
      <div class="card-content-left">
          <img src=${data.cardImage} class="card-img" alt=""></img>
      </div>
      <div class="card-body card-content-right">
          <h2 class="card-dish-name mt-1 card-title">${data.nameOfDish}</h2>
          <p class="card-dish-type mt-1 card-text">${data.typeOfFood}</p>
          <p class="desc mt-1 card-text">${data.DescOfDish}</p>
      </div>
  </div>
</div>`;
};

function resetForm() {
  restName.value = "";
  foodType.value = "";
  dishName.value = "";
  desc.value = "";
}

function deleteCard(e) {
  e.parentElement.parentElement.parentElement.remove();
}

function editCard(e) {
  let selectedCardOne = e.parentElement.parentElement;
  let selectedCardTwo = document.querySelector(".card-content-right");
  restName.value = selectedCardOne.children[0].innerHTML;
  foodType.value = selectedCardTwo.children[1].innerHTML;
  dishName.value = selectedCardTwo.children[0].innerHTML;
  desc.value = selectedCardTwo.children[2].innerHTML;
  console.log(selectedCardTwo);
  selectedCardOne.remove();
  selectedCardTwo.parentElement.parentElement.remove();
}

// filter options--

removeAllBtn.addEventListener("click", () => {
  cardsContainer.innerHTML = "";
});

breakfastBtn.addEventListener("click", filterBreakFast);
brunchbtn.addEventListener("click", filterBrunch);
lunchBtn.addEventListener("click", filterLunch);
dinnerBtn.addEventListener("click", filterDinner);
showAllBtn.addEventListener("click", filterAll);

function filterBreakFast() {
  let type = cardsContainer.querySelectorAll(".card-length");

  type.forEach(
    (type) =>
      (type.style.display = type
        .querySelector(".card-dish-type")
        .innerHTML.includes("Break-Fast")
        ? "initial"
        : "none")
  );
}

function filterBrunch() {
  let type = cardsContainer.querySelectorAll(".card-length");

  type.forEach(
    (type) =>
      (type.style.display = type
        .querySelector(".card-dish-type")
        .innerHTML.includes("Brunch")
        ? "initial"
        : "none")
  );
}

function filterLunch() {
  let type = cardsContainer.querySelectorAll(".card-length");

  type.forEach(
    (type) =>
      (type.style.display = type
        .querySelector(".card-dish-type")
        .innerHTML.includes("Lunch")
        ? "initial"
        : "none")
  );
}

function filterDinner() {
  let type = cardsContainer.querySelectorAll(".card-length");

  type.forEach(
    (type) =>
      (type.style.display = type
        .querySelector(".card-dish-type")
        .innerHTML.includes("Dinner")
        ? "initial"
        : "none")
  );
}

function filterAll() {
  let type = cardsContainer.querySelectorAll(".card-length");
  for (let i = 0; i < type.length; i++) {
    let span = type[i].querySelector(".card-dish-type");
    type[i].style.display = "initial";
  }
}

// const imgDiv = document.querySelector('.card-content-left')

// function fechImage(event){
//   event.preventDefault()

//   fetch('https://www.themealdb.com/api/json/v1/1/random.php')
//   .then(res => res.json())
//   .then(data => {
//     console.log(data)
//     imgDiv.innerHTML = `<img src="${data}"/>`
//   })
// }
