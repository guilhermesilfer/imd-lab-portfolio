import React from 'react';
import { Link } from 'react-router-dom';
import ufrnLogo from '../assets/img/ufrn-logo-1.png';
import imdLogo from '../assets/img/imd.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="acessibilidade">
        <div className="centro">
          <input type="text" placeholder="Buscar..." />
          <button type="submit">Buscar</button>
        </div>
        <div className="direita">
          <button className="botao-social"><FaFacebook /></button>
          <button className="botao-social"><FaInstagram /></button>
          <button className="botao-social"><FaLinkedin /></button>
          <button className="botao-social"><FaTwitter /></button>
          <button className="botao-social"><FaYoutube /></button>
        </div>
      </div>

      <div className="principal d-flex justify-content-between align-items-center px-4">
        <div className="logo d-flex align-items-center gap-2">
          <img className="img1" src={ufrnLogo} alt="UFRN" />
          <img className="img2" src={imdLogo} alt="IMD" />
        </div>

        <nav className="navegacao d-flex gap-3">
          <div className="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">
              Institucional
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/">Sobre o Laboratório</Link></li>
              <li><Link className="dropdown-item" to="/parceiros">Parceiros</Link></li>
              <li><Link className="dropdown-item" to="/colaboradores">Colaboradores</Link></li>
            </ul>
          </div>

          <div className="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">
              Projetos
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/projetos">Todos os Projetos</Link></li>
              <li><Link className="dropdown-item" to="/projetoExample">Projeto A</Link></li>
              <li><Link className="dropdown-item" to="/projetoExample">Projeto B</Link></li>
              <li><Link className="dropdown-item" to="/projetoExample">Projeto C</Link></li>
            </ul>
          </div>

          <button className="btn btn-secondary">
            <Link to="/noticias" className="text-white text-decoration-none">Notícias</Link>
          </button>
          <button className="btn btn-secondary">
            <Link to="/contato" className="text-white text-decoration-none">Contato</Link>
          </button>

        </nav>
      </div>
    </header>
  );
}

export default Header;
