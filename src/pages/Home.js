import React from 'react';
import imdPredio from '../assets/img/IMD_Predio.jpg';
import labExample from '../assets/img/lab_example.jpg';
import roboticsClass from '../assets/img/robotics_class2.jpg';

function Home() {
  return (
    <div className="main-wrapper">
      <main className="container-md my-1 text-dark">
        <section>
          <div className="mb-4 pb-2 border-bottom border-4 border-secondary">
            <h1 className="h2 h-lg-1 text-secondary">
              Institucional <span className="fw-semibold">| LabCoMU</span>
            </h1>
          </div>

          <div className="my-4">
            <img src={imdPredio} alt="imagem imd" className="img-fluid rounded shadow" />
          </div>

          <div className="mt-4 mb-5">
            <p className="fs-5 mb-4">
              O Laboratório de Computação Móvel e Ubíqua (LabCOMU) do Instituto Metrópole Digital (IMD) da Universidade Federal do
              Rio Grande do Norte (UFRN) é um espaço dedicado à inovação, pesquisa e desenvolvimento na área
              de comunicação e suas interseções com a tecnologia.
            </p>
            <p className="fs-5 mb-4">
              No LabCOMU, estudantes, pesquisadores e professores colaboram em projetos que buscam aplicar conhecimentos
              teóricos em contextos práticos, contribuindo para o avanço científico e tecnológico, além de oferecer
              serviços e produtos de comunicação de alto impacto para a comunidade acadêmica e a sociedade em geral.
            </p>
          </div>

          <div className="my-4">
            <img src={labExample} alt="laboratório imagem ilustrativa" className="img-fluid rounded shadow" />
          </div>

          <div className="my-5 pt-4 border-top border-2">
            <h2 className="h3 text-warning mb-3 fw-semibold">Portfólio de Projetos</h2>
            <p className="fs-5 text-secondary">
              Este site serve como uma vitrine dinâmica para os projetos desenvolvidos pelos talentosos alunos que
              integram o laboratório. Aqui, você encontrará uma diversidade de trabalhos que refletem a
              criatividade, a competência técnica e a visão inovadora dos nossos estudantes.
            </p>
          </div>

          <div className="mb-5 p-4 border rounded shadow-sm bg-light">
            <h2 className="h4 text-primary border-bottom pb-2 mb-3 fw-bold">Últimas Notícias</h2>

            <div className="d-flex justify-content-center mb-3 gap-3">
              <button className="btn btn-outline-secondary rounded-circle px-3">&#10094;</button>
              <button className="btn btn-outline-secondary rounded-circle px-3">&#10095;</button>
            </div>

            <div className="d-flex flex-nowrap overflow-auto gap-3 pb-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div
                  key={i}
                  className="card shadow-sm flex-shrink-0"
                  style={{ minWidth: '300px', maxWidth: '300px' }}
                >
                  <img src={roboticsClass} className="card-img-top" alt={`Notícia ${i + 1}`} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Publicação Internacional</h5>
                    <p className="card-text text-muted mb-3">
                      Nosso artigo foi aceito na conferência XYZ sobre IA aplicada.
                    </p>
                    <a href="#" className="btn btn-link p-0 fw-bold">
                      Ler mais →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

