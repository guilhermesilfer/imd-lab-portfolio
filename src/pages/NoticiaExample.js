import React from "react";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import exemploImg from "../assets/img/robotics_class.jpg";

const NoticiaExample = () => {
  const parceiros = [
    { nome: "Dell", link: "https://www.dell.com.br" },
    { nome: "Microsoft", link: "https://www.microsoft.com/pt-br" },
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-3">
        Alunos do projeto Futuro Brilhante ganham medalha em competição Internacional
      </h1>

      <Row className="align-items-center mb-4">
        <Col>
          <hr />
        </Col>
        <Col xs="auto">
          <span className="text-muted small">28 de Abril de 2025</span>
        </Col>
      </Row>

      <p className="text-justify mb-4 text-secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
      </p>

      <div className="text-center mb-4">
        <Image src={exemploImg} fluid rounded className="shadow-sm mb-2" />
        <p className="text-muted small">Guilherme Ferreira e Pedro Guedes durante competição.</p>
      </div>

      <p className="text-justify mb-4 text-secondary">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto obcaecati voluptate assumenda ullam!... maiores?
      </p>
      <p className="text-justify mb-4 text-secondary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus vero natus consequuntur minima officiis velit laboriosam...
      </p>

      <h2 className="text-center mt-5 mb-4">Parceiros desse projeto</h2>
      <Row className="justify-content-center gap-3">
        {parceiros.map((parceiro, idx) => (
          <Col xs="auto" key={idx} className="text-center">
            <a
              href={parceiro.link}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex justify-content-center align-items-center rounded-circle text-dark fw-bold shadow-sm"
              style={{
                width: "120px",
                height: "120px",
                backgroundColor: "#f0f0f0",
                textDecoration: "none",
              }}
            >
              <span>{parceiro.nome}</span>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NoticiaExample;

