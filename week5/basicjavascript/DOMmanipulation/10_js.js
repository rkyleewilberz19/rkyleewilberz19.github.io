// 10_js.js

// Helper
function setDisplay(id, value) {
  const el = document.getElementById(id);
  if (el) el.style.display = value;
}

// Clicking "Filter Articles" shows the checkbox menu
function showFilter() {
  setDisplay("filterContent", "block");
  setDisplay("newContent", "none");
}

// Clicking "Add New Article" shows  form
function showAddNew() {
  setDisplay("newContent", "flex");   // your CSS expects flex for the form
  setDisplay("filterContent", "none");
}

// Checking/unchecking filters hides/shows matching articles
function filterArticles() {
  const opinionOn = document.getElementById("opinionCheckbox")?.checked;
  const recipeOn  = document.getElementById("recipeCheckbox")?.checked;
  const updateOn  = document.getElementById("updateCheckbox")?.checked;

  // Opinion
  document.querySelectorAll("article.opinion").forEach(a => {
    a.style.display = opinionOn ? "" : "none";
  });

  // Recipe
  document.querySelectorAll("article.recipe").forEach(a => {
    a.style.display = recipeOn ? "" : "none";
  });

  // Update
  document.querySelectorAll("article.update").forEach(a => {
    a.style.display = updateOn ? "" : "none";
  });
}

// Add new article and style
function addNewArticle() {
  const title = document.getElementById("inputHeader").value.trim();
  const text  = document.getElementById("inputArticle").value.trim();

  const opinionRadio = document.getElementById("opinionRadio").checked;
  const recipeRadio  = document.getElementById("recipeRadio").checked;
  const lifeRadio    = document.getElementById("lifeRadio").checked;

  // Type picked
  let typeClass = "";
  let typeLabel = "";

  if (opinionRadio) {
    typeClass = "opinion";
    typeLabel = "Opinion";
  } else if (recipeRadio) {
    typeClass = "recipe";
    typeLabel = "Recipe";
  } else if (lifeRadio) {
    typeClass = "update";
    typeLabel = "Update";
  }

  if (!title || !text || !typeClass) {
    alert("Please enter a title, text, and pick a type.");
    return;
  }

  // Create new <article> element
  const article = document.createElement("article");
  article.className = typeClass;

  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = typeLabel;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  pLink.appendChild(a);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  // Add to list
  const list = document.getElementById("articleList");
  list.appendChild(article);

  // Apply current filters
  filterArticles();

  // Clear inputs
  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  document.getElementById("opinionRadio").checked = false;
  document.getElementById("recipeRadio").checked = false;
  document.getElementById("lifeRadio").checked = false;
}

window.addEventListener("DOMContentLoaded", () => {

  filterArticles();
});
