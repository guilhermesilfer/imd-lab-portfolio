import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-main-section">
        <ul className="footer-links-list">
          <li className="list-title">Colaboradores</li>
          <li>Itamir Filho</li>
          <li>Jean Lima</li>
          <li>Guilherme Ferreira</li>
          <li>Matheus Guedes</li>
          <li>Pedro Guedes</li>
        </ul>

        <ul className="footer-links-list">
          <li className="list-title">Projetos</li>
          <li><a href="#projeto-melhorando-o-mundo">Melhorando o mundo</a></li>
          <li><a href="#projeto-futuro-brilhante">Futuro brilhante</a></li>
          <li><a href="#projeto-computadores-quantico">Computadores quânticos</a></li>
          <li><a href="#projeto-super-pesquisa">Super pesquisa</a></li>
          <li><a href="#projeto-internet-das-coisas">Internet das coisas</a></li>
        </ul>

        <ul className="footer-links-list">
          <li className="list-title">Parceiros</li>
          <li><a href="#parceiro-dell">Dell</a></li>
          <li><a href="#parceiro-microsoft">Microsoft</a></li>
          <li><a href="#parceiro-samsung">Samsung</a></li>
          <li><a href="#parceiro-acer">Acer</a></li>
          <li><a href="#parceiro-lg">LG</a></li>
        </ul>

        <div className="footer-contact-block">
          <h3 className="list-title">Contato</h3>
          <p className="contact-info-item">
            Email: <a href="mailto:contato@seuexemplo.com.br">contato@exemplo.com.br</a>
          </p>
          <p className="contact-info-item">
            Telefone: <a href="tel:+558433422216">(84) 3342-2216</a>
          </p>
          <p className="contact-info-item">Ramal: 100</p>
          <p className="contact-emphasis-text">Fale Conosco!</p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="bloco-esquerda">
          <p>Instituto Metrópole Digital</p>
          <p>Endereço: CIVT - UFRN - Av. Senador Salgado Filho, 3000</p>
          <p>Lagoa Nova, CEP 59.078.970 - Natal/RN</p>
        </div>
        <div className="bloco-meio">
          <a href="/admin" className="login-button">Login de Administradores</a>
        </div>
        <div className="bloco-direita">
          <p>Desenvolvido por Guilherme Ferreira, Matheus Guedes e Pedro Guedes</p>
          <p>Copyright © 2025 | Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

