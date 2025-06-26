import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import pfp1 from "../assets/img/pfp1.png";
import pfp2 from "../assets/img/pfp2.png";
import pfp3 from "../assets/img/pfp3.png";
import "../styles/Colaboradores.css";

const Colaboradores = () => {
  const colaboradores = [
    {
      nome: "João Costa",
      imagem: pfp1,
      linkedin: "https://linkedin.com",
      email: "mailto:emailgenerico@gmail.com",
      cargo: "Cargo",
      formacao: "Formação",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      nome: "Caio Silva",
      imagem: pfp2,
      linkedin: "https://linkedin.com",
      email: "mailto:emailgenerico@gmail.com",
      cargo: "Cargo",
      formacao: "Formação",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      nome: "José Tadeu",
      imagem: pfp3,
      linkedin: "https://linkedin.com",
      email: "mailto:emailgenerico@gmail.com",
      cargo: "Cargo",
      formacao: "Formação",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="main-wrapper">
      <main>
        <section>
          <h1 className="colaboradores-txt">Colaboradores</h1>
          <div className="flex-column">
            {colaboradores.map((colab, index) => (
              <React.Fragment key={index}>
                <div className="colaborador flex-row-to-column">
                  <img src={colab.imagem} alt={`Foto de ${colab.nome}`} />
                  <div className="info flex-column">
                    <div className="nome-links flex-row">
                      <h2 className="nome-colaborador">{colab.nome}</h2>
                      <div className="links flex-row">
                        <a href={colab.linkedin} target="_blank" rel="noopener noreferrer">
                          <FaLinkedin />
                        </a>
                        <a href={colab.email} target="_blank" rel="noopener noreferrer">
                          <MdOutlineAttachEmail />
                        </a>
                      </div>
                    </div>
                    <h3>{colab.cargo}</h3>
                    <h3>{colab.formacao}</h3>
                    <p>{colab.descricao}</p>
                  </div>
                </div>
                {index < colaboradores.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Colaboradores;

