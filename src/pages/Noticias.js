import React, { useRef, useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { getDatabase, ref, onValue } from "firebase/database";
import "../styles/Noticias.css";
import imgDefault from "../assets/img/lab_example.jpg";

const NoticiasPorProjeto = () => {
  const [projetos, setProjetos] = useState([]);
  const scrollRefs = useRef({});

  useEffect(() => {
    const db = getDatabase();
    const noticiasRef = ref(db, "noticias");

    onValue(noticiasRef, (snapshot) => {
      const data = snapshot.val() || {};
      const listaNoticias = Object.entries(data).map(([id, noticia]) => ({
        id,
        ...noticia,
      }));

      // Agrupar por projeto vinculado
      const agrupadoPorProjeto = {};
      listaNoticias.forEach((noticia) => {
        const projeto = noticia.projetoVinculado || "Sem Projeto";
        const slug = projeto.replace(/\s+/g, "-").toLowerCase();

        if (!agrupadoPorProjeto[slug]) {
          agrupadoPorProjeto[slug] = {
            nome: projeto,
            id: slug,
            noticias: [],
          };
        }

        agrupadoPorProjeto[slug].noticias.push({
          ...noticia,
          imagem: noticia.imagemRef
            ? `/img/${noticia.imagemRef}`
            : imgDefault,
          link: noticia.link || "#",
        });
      });

      setProjetos(Object.values(agrupadoPorProjeto));
    });
  }, []);

  const scroll = (id, direction) => {
    const scrollContainer = scrollRefs.current[id];
    if (!scrollContainer) return;
    const scrollAmount = 320;

    scrollContainer.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Container className="mt-5">
      {projetos.map((projeto) => (
        <div key={projeto.id} className="mb-5">
          <h2 className="mb-3">{projeto.nome}</h2>
          <div className="d-flex align-items-center position-relative">
            <Button
              variant="light"
              className="scroll-btn start"
              onClick={() => scroll(projeto.id, "prev")}
            >
              &#10094;
            </Button>

            <div
              className="noticias-scroll"
              ref={(el) => (scrollRefs.current[projeto.id] = el)}
            >
              {projeto.noticias.map((noticia, index) => (
                <Card className="noticia-card me-3" key={index}>
                  <Card.Img
                    variant="top"
                    src={noticia.imagem}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                      e.target.style.backgroundColor = "#ccc";
                      e.target.style.height = "180px";
                      e.target.style.objectFit = "cover";
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{noticia.titulo}</Card.Title>
                    <Card.Text>{noticia.descricao}</Card.Text>
                    <Button
                      variant="primary"
                      href={"./NoticiaExample"}
                      target="_blank"
                    >
                      Ler mais
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Button
              variant="light"
              className="scroll-btn end"
              onClick={() => scroll(projeto.id, "next")}
            >
              &#10095;
            </Button>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default NoticiasPorProjeto;

