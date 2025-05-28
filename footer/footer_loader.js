document.addEventListener("DOMContentLoaded", () => {
  fetch("../footer/index.html")
    .then(response => response.text())
    .then(data => {
      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) {
        footerContainer.innerHTML = data;
      }
    })
    .catch(error => console.error("Erro ao carregar o footer:", error));
});
