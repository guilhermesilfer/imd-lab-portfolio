const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    const submenu = this.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
  });

  // Fecha dropdown se clicar fora
  window.addEventListener('click', function(e) {
    dropdownToggles.forEach(toggle => {
      if (!toggle.contains(e.target) && !toggle.nextElementSibling.contains(e.target)) {
        toggle.nextElementSibling.style.display = 'none';
      }
    });
  });
});

// Menu principal
const botaoMenu = document.querySelector('.botao-menu');
const navegacao = document.querySelector('.navegacao');

botaoMenu.addEventListener('click', () => {
  navegacao.classList.toggle('ativo');
});

