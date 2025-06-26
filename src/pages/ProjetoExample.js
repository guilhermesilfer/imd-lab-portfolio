import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import exemplo1 from "../assets/img/robotics_class.jpg";
import exemplo2 from "../assets/img/robotics_class_2.jpg";
import parceiroImg from "../assets/img/parceiro.jpg";
import noticiaImg from "../assets/img/example_project_image.png";

const ProjetoExample = () => {
  const parceiros = [
    { nome: "Dell", link: "https://www.dell.com.br" },
    { nome: "Microsoft", link: "https://www.microsoft.com/pt-br" },
    { nome: "Samsung", link: "https://www.samsung.com/br/" },
    { nome: "Acer", link: "https://www.acer.com/br-pt" },
    { nome: "Lenovo", link: "https://www.lenovo.com/br/pt/" },
  ];

  const noticias = [
    {
      titulo: "Nova Inauguração",
      descricao: "Laboratório de tecnologia é inaugurado com recursos avançados.",
      imagem: noticiaImg,
      link: "noticia.html",
    },
    {
      titulo: "Novos Investidores",
      descricao: "Novas empresas demonstram interesse nesse projeto.",
      imagem: noticiaImg,
      link: "noticia.html",
    },
    {
      titulo: "Novas Parcerias",
      descricao: "Novas colaborações com universidades foram firmadas.",
      imagem: noticiaImg,
      link: "noticia.html",
    },
  ];

  return (
    <div className="py-5">
      <Container>
        <h1 className="mb-4">Nome do Projeto</h1>
      </Container>

      <Container className="mb-4">
        <Image src={exemplo1} fluid className="w-100" />
      </Container>

      <Container>
        <p>
          <strong>Project Description: </strong>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat..."
        </p>
      </Container>

      <Container className="my-4">
        <Image src={exemplo2} fluid className="w-100" />
      </Container>

      <Container>
        <h2 className="text-center my-4">Parceiros</h2>
        <Row className="justify-content-center mb-5">
          {parceiros.map((parceiro, idx) => (
            <Col key={idx} xs={6} sm={4} md={2} className="mb-3 text-center">
              <a href={parceiro.link} target="_blank" rel="noopener noreferrer">
                <Image src={parceiroImg} fluid rounded />
              </a>
            </Col>
          ))}
        </Row>

        <div className="noticias">
          <h2 className="text-center mb-4">Notícias</h2>
          <Row>
            {noticias.map((noticia, idx) => (
              <Col key={idx} md={4} className="mb-4">
                <Card>
                  <a href={noticia.link}>
                    <Card.Img variant="top" src={noticia.imagem} />
                    <Card.Body>
                      <Card.Title>{noticia.titulo}</Card.Title>
                      <Card.Text>{noticia.descricao}</Card.Text>
                    </Card.Body>
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ProjetoExample;

