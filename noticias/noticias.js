// noticias de exemplo
const projetos = [
  {
    titulo: "Inteligência Artificial Aplicada",
    noticias: [
      {
        imagem: "robotics_class2.jpg",
        titulo: "Publicação Internacional",
        texto: "Nosso artigo foi aceito na conferência XYZ sobre IA aplicada.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "IA em Jogos",
        texto: "Como a IA pode ser aplicada em jogos.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Publicação Internacional",
        texto: "Nosso artigo foi aceito na conferência XYZ sobre IA aplicada.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "IA em Jogos",
        texto: "Como a IA pode ser aplicada em jogos.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Nova Notícia",
        texto: "Nova notícia sobre nosso projeto.",
        link: "#"
      }
    ]
  },
  {
    titulo: "Robótica na Educação",
    noticias: [
      {
        imagem: "robotics_class2.jpg",
        titulo: "Workshop",
        texto: "Estaremos presentes no workshop X no centro de convenções.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Publicação Técnica",
        texto: "Artigo sobre protocolos publicado na conferência ABC.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Oportunidade de Estágio",
        texto: "Abrem 5 novas vagas para o nosso projeto.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Workshop",
        texto: "Estaremos presentes no workshop X no centro de convenções.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Publicação Técnica",
        texto: "Artigo sobre protocolos publicado na conferência ABC.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Oportunidade de Estágio",
        texto: "Abrem 5 novas vagas para o nosso projeto.",
        link: "#"
      }
    ]
  },
  {
    titulo: "Inteligência Artificial Aplicada",
    noticias: [
      {
        imagem: "robotics_class2.jpg",
        titulo: "Publicação Internacional",
        texto: "Nosso artigo foi aceito na conferência XYZ sobre IA aplicada.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "IA em Jogos",
        texto: "Como a IA pode ser aplicada em jogos.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Publicação Internacional",
        texto: "Nosso artigo foi aceito na conferência XYZ sobre IA aplicada.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "IA em Jogos",
        texto: "Como a IA pode ser aplicada em jogos.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Nova Notícia",
        texto: "Nova notícia sobre nosso projeto.",
        link: "#"
      }
    ]
  },
  {
    titulo: "Robótica na Educação",
    noticias: [
      {
        imagem: "robotics_class2.jpg",
        titulo: "Workshop",
        texto: "Estaremos presentes no workshop X no centro de convenções.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Publicação Técnica",
        texto: "Artigo sobre protocolos publicado na conferência ABC.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Oportunidade de Estágio",
        texto: "Abrem 5 novas vagas para o nosso projeto.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Workshop",
        texto: "Estaremos presentes no workshop X no centro de convenções.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Publicação Técnica",
        texto: "Artigo sobre protocolos publicado na conferência ABC.",
        link: "#"
      },
      {
        imagem: "robotics_class2.jpg",
        titulo: "Oportunidade de Estágio",
        texto: "Abrem 5 novas vagas para o nosso projeto.",
        link: "#"
      }
    ]
  },
];

function criarCarrossel(projeto, index) {
  const noticiasHTML = projeto.noticias.map((n) => `
    <div class="px-[10px] pb-[10px] shadow-md hover:shadow-xl card bg-white rounded-[12px] min-w-[300px] max-w-[300px] flex flex-col overflow-hidden flex-none">
      <img src="${n.imagem}" alt="${n.titulo}">
      <div class="flex flex-col p-[16px] justify-between grow">
        <h3 class="text-[1.2rem] mb-[8px]">${n.titulo}</h3>
        <p class="text-[0.95rem] text-[#666] grow mb-[12px]">${n.texto}</p>
        <a href="${n.link}" class="text-[#0077cc] no-underline font-bold">Ler mais →</a>
      </div>
    </div>
  `).join("");

  return `
    <div class="p-4 border-4 border-gray-100 rounded-lg shadow">
      <div class="project-section" data-project="${index}">
        <div class="mb-[16px]">
          <div class="flex justify-between items-center gap-[30px]">
            <h2 class="text-[1.8rem] text-[#1a1a1a]">${projeto.titulo}</h2>
            <div class="flex gap-[8px]">
              <button class="btn-prev w-[32px] h-[32px] cursor-pointer text-[1.2rem] bg-[#fff] border border-[#ccc] rounded-[50%]" aria-label="Anterior">&#10094;</button>
              <button class="btn-next w-[32px] h-[32px] cursor-pointer text-[1.2rem] bg-[#fff] border border-[#ccc] rounded-[50%]" aria-label="Próximo">&#10095;</button>
            </div>
          </div>
        </div>
        <div class="overflow-hidden">
          <div class="carousel-track flex gap-[16px] transition-transform duration-300 ease-in-out">
            ${noticiasHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}

function inicializar() {
  const container = document.getElementById("carrossel-container");
  projetos.forEach((projeto, index) => {
    container.innerHTML += criarCarrossel(projeto, index);
  });

  // Adiciona funcionalidade de navegação
  document.querySelectorAll(".project-section").forEach((section, i) => {
    const track = section.querySelector(".carousel-track");
    const prev = section.querySelector(".btn-prev");
    const next = section.querySelector(".btn-next");

    let position = 0;
    const gap = 16;
    const card = track.querySelector('.card');
    const cardWidth = card.offsetWidth + gap;

    prev.addEventListener("click", () => {
      position = Math.max(position - cardWidth, 0);
      track.style.transform = `translateX(-${position}px)`;
    });

    next.addEventListener("click", () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      position = Math.min(position + cardWidth, maxScroll);
      track.style.transform = `translateX(-${position}px)`;
    });
  });
}

document.addEventListener("DOMContentLoaded", inicializar);

