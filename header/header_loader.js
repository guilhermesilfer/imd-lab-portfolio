document.addEventListener("DOMContentLoaded", function () {
  fetch("../header/header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.createElement("div");
      headerContainer.innerHTML = data;
      document.body.prepend(headerContainer);

      const dropdownScript = document.createElement("script");
      dropdownScript.src = "../header/dropdown.js";
      document.body.appendChild(dropdownScript);
    });
});

