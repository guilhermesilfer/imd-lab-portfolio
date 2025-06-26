import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Projetos = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const projetosRef = ref(db, 'projetos');

    onValue(projetosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.entries(data).map(([id, obj]) => ({
          id,
          ...obj,
        }));
        setProjetos(lista);
      }
    });
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Projetos do Laboratório</h1>
      <Row>
        {projetos.map((projeto) => (
          <Col key={projeto.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              {projeto.imagem ? (
                <Card.Img
                  variant="top"
                  src={projeto.imagem}
                  alt={projeto.titulo}
                  style={{ objectFit: 'cover', height: '180px' }}
                />
              ) : (
                <div
                  style={{
                    height: '180px',
                    backgroundColor: '#e0e0e0',
                  }}
                />
              )}
              <Card.Body>
                <Card.Title className="text-center">{projeto.titulo}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Projetos;

