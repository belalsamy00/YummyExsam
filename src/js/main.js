$(".open-close").on("click", function () {
  if ($(".nav").css("left") == "0px") {
    close();
  } else {
    open();
  }
});

$("#toggleDark").on("click", function () {
  if ($("html").attr("data-bs-theme")) {
    $("html").removeAttr("data-bs-theme");
    $(this).html('<i class="fa-solid fa-moon fs-4"></i>');
    localStorage.setItem("mode", "light");
  } else {
    localStorage.setItem("mode", "dark");
    $("html").attr("data-bs-theme", "dark");
    $(this).html('<i class="fa-solid fa-lightbulb fs-4"></i>');
  }
});

$("#AllCategoryBtn").on("click", async function () {
  loadingfadeIn();
  $("#searchContainer").html("");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  disAllCategory(response.categories);
  close();
  loadingfadeOut();
});

$("#AreaBtn").on("click", async function () {
  $("#rowData").html("");
  loadingfadeIn();
  $("#searchContainer").html("");

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  disArea(respone.meals);
  close();
  loadingfadeOut();
});

$("#IngredientsBtn").on("click", async function () {
  $("#rowData").html("");
  loadingfadeIn();
  $("#searchContainer").html("");

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  disIngredients(respone.meals.slice(0, 20));
  close();
  loadingfadeOut();
});

$("#SearchBtn").on("click", function () {
  $("#searchContainer").html(`<div class="row py-4 ">
          <div class="col-md-6 ">
              <input onkeyup="nameSearch(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
          </div>
          <div class="col-md-6">
              <input onkeyup="FirestLetterSearch(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
          </div>
      </div>`);
  $("#rowData").html("");
  close();
});

$("#ContactUsBtn").on("click", function () {
  $(
    "#rowData"
  ).html(`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
          <div class="container w-75 text-center">
              <div class="row g-4">
                  <div class="col-md-6">
                      <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                      <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Special characters and numbers not allowed
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                      <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Email not valid *exemple@xxx.xxx
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                      <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid Phone Number
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
                      <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid age
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input  id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                      <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid password *Minimum eight characters, at least one letter and one number:*
                      </div>
                  </div>
                  <div class="col-md-6">
                      <input  id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                      <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid repassword 
                      </div>
                  </div>
              </div>
              <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
          </div>
      </div> `);
  formValid();
  close();
});

function loadingfadeIn() {
  $(".loading").fadeIn(300);
  $("body").css("overflow", "hidden");
}

function loadingfadeOut() {
  $(".loading").fadeOut(300);
  $("body").css("overflow", "visible");
}

function open() {
  $(".nav").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close").removeClass("fa-align-justify");
  $(".open-close").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function close() {
  let boxWidth = $(".nav .nav-tab").outerWidth();
  $(".nav").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".open-close").addClass("fa-align-justify");
  $(".open-close").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}

function disMeals(array) {
  let cartoona = "";

  for (let i = 0; i < array.length; i++) {
    cartoona += `
          <div class="col-md-3">
                  <div role="button" onclick="fetchMealDetails('${array[i].idMeal}')" class="meal-card position-relative overflow-hidden rounded-2 ">
                      <img class="w-100" src="${array[i].strMealThumb}" alt="" srcset="">
                      <div class="meal-card-layer position-absolute d-flex align-items-center text-black p-2">
                          <h3>${array[i].strMeal}</h3>
                      </div>
                  </div>
          </div>
          `;
  }

  $("#rowData").html(cartoona);
}

function disAllCategory(array) {
  let cartoona = "";

  for (let i = 0; i < array.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div role="button" onclick="fetchCategoryMeals('${
                  array[i].strCategory
                }')" class="meal-card position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${
                      array[i].strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-card-layer position-absolute text-center text-black p-2">
                        <h3>${array[i].strCategory}</h3>
                        <p>${array[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
  }
  $("#rowData").html(cartoona);
}

function disArea(array) {
  let cartoona = "";

  for (let i = 0; i < array.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div role="button" onclick="fetchAreaMeals('${array[i].strArea}')" class="rounded-2 text-center ">
                        <i role="button" class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${array[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  $("#rowData").html(cartoona);
}

function disIngredients(array) {
  let cartoona = "";

  for (let i = 0; i < array.length; i++) {
    cartoona += `
        <div role="button" class="col-md-3">
                <div onclick="fetchIngredientsMeals('${
                  array[i].strIngredient
                }')" class="rounded-2 text-center ">
                        <i role="button" class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${array[i].strIngredient}</h3>
                        <p>${array[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  $("#rowData").html(cartoona);
}

async function fetchCategoryMeals(category) {
  $("#rowData").html("");
  loadingfadeIn();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  disMeals(response.meals.slice(0, 20));
  loadingfadeOut();
}

async function fetchAreaMeals(area) {
  $("#rowData").html("");
  loadingfadeIn();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  disMeals(response.meals.slice(0, 20));
  loadingfadeOut();
}

async function fetchIngredientsMeals(ingredients) {
  $("#rowData").html("");
  loadingfadeIn();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  disMeals(response.meals.slice(0, 20));
  loadingfadeOut();
}

async function fetchMealDetails(mealID) {
  close();
  $("#rowData").html("");
  loadingfadeIn();

  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  disMealDetails(respone.meals[0]);
  loadingfadeOut();
}

function disMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  // let tags = meal.strTags.split(",")
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  $("#rowData").html(cartoona);
}

async function nameSearch(key) {
  close();
  $("#rowData").html("");
  loadingfadeIn();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`
  );
  response = await response.json();

  response.meals ? disMeals(response.meals) : disMeals([]);
  loadingfadeOut();
}

async function FirestLetterSearch(key) {
  close();
  $("#rowData").html("");
  loadingfadeIn();

  key == "" ? (key = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`
  );
  response = await response.json();

  response.meals ? disMeals(response.meals) : disMeals([]);
  loadingfadeOut();
}

function nameValid() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValid() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValid() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValid() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValid() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValid() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

function formValid() {
  $("#nameInput").on("keyup", function () {
    if (nameValid()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      submitBtnDisabled();
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  $("#emailInput").on("keyup", function () {
    if (emailValid()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      submitBtnDisabled();
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  $("#phoneInput").on("keyup", function () {
    if (phoneValid()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      submitBtnDisabled();
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  });
  $("#ageInput").on("keyup", function () {
    if (ageValid()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      submitBtnDisabled();
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  });
  $("#passwordInput").on("keyup", function () {
    if (passwordValid()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      submitBtnDisabled();
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  });
  $("#repasswordInput").on("keyup", function () {
    if (repasswordValid()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
      submitBtnDisabled();
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  });
}
function submitBtnDisabled() {
  if (
    nameValid() &&
    emailValid() &&
    phoneValid() &&
    ageValid() &&
    passwordValid() &&
    repasswordValid()
  ) {
    $("#submitBtn").removeAttr("disabled");
  } else {
    $("#submitBtn").attr("disabled", true);
  }
}

$(document).ready(() => {
  if (localStorage.getItem("mode")) {
    if (localStorage.getItem("mode") == "dark") {
      $("html").attr("data-bs-theme", "dark");
      $("#toggleDark").html('<i class="fa-solid fa-lightbulb fs-4"></i>');
    } else {
      $("html").removeAttr("data-bs-theme");
      $("#toggleDark").html('<i class="fa-solid fa-moon fs-4"></i>');
    }
  } else {
    $("html").attr("data-bs-theme", "dark");
    $("#toggleDark").html('<i class="fa-solid fa-lightbulb fs-4"></i>');
  }
  nameSearch("");
});
