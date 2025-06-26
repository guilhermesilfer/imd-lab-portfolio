import React from "react";
import "../styles/Contato.css";

const Contato = () => {
  return (
    <div className="main-wrapper">
      <main>
        <section className="secao-formulario">
          <div className="area-esquerda">
            <h1>Fale Conosco</h1>
            <p className="subtitulo-formulario">
              Mande suas dúvidas e sugestões que entraremos em contato.
            </p>
            <div className="info-contato">
              <p>
                <a href="mailto:laboratorioitamir@email.com.br">
                  laboratorioitamir@email.com.br
                </a>
              </p>
              <p>(84) 2222-3333 (ramal 100)</p>
            </div>
          </div>

          <div className="area-direita">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="campo">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" />
              </div>
              <div className="campo">
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  placeholder="(99) 99999-9999"
                />
              </div>
              <div className="campo">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="campo">
                <label htmlFor="assunto">Assunto:</label>
                <input type="text" id="assunto" name="assunto" />
              </div>
              <div className="campo campo-mensagem">
                <label htmlFor="mensagem">Mensagem:</label>
                <textarea id="mensagem" name="mensagem" rows="5"></textarea>
              </div>
              <button type="submit" className="botao-enviar">
                Enviar
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contato;

