import React, { useState } from "react";
import { db } from "../components/Firebase";
import { ref, push } from "firebase/database";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Admin.css";

import SecaoColaboradores from "../components/SecaoColaboradores";
import SecaoParceiros from "../components/SecaoParceiros";
import SecaoNoticias from "../components/SecaoNoticias";
import SecaoProjetos from "../components/SecaoProjetos";
import pfp from "../assets/img/matheus.jpg";

const Admin = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [activeSection, setActiveSection] = useState("secaoColaboradores");

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await push(ref(db, "logins"), {
        username,
        password,
        timestamp: new Date().toISOString()
      });

      setShowLogin(false);
    } catch (error) {
      alert("Erro ao registrar login: " + error.message);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "secaoColaboradores":
        return <SecaoColaboradores />;
      case "secaoNoticias":
        return <SecaoNoticias />;
      case "secaoParceiros":
        return <SecaoParceiros />;
      case "secaoProjetos":
        return <SecaoProjetos />;
      default:
        return <p>Bem-vindo!</p>;
    }
  };

  if (showLogin) {
    return (
      <div id="login-modal-overlay">
        <div id="login-modal" className="p-4 bg-white rounded shadow">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Usuário:</label>
              <input type="text" className="form-control" id="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <input type="password" className="form-control" id="password" required />
            </div>
            <p className="forgot-password">
              <a href="#!" id="forgot-password-link">Esqueceu sua senha?</a>
            </p>
            <button type="submit" className="btn btn-primary btn-block">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <aside className="col-lg-3 mb-4">
          <div className="p-3 border border-lightgrey rounded shadow-sm text-center sticky-sidebar">
            <img src={pfp} alt="Foto de Matheus Guedes" className="img-fluid rounded-circle" />
            <h2 className="h5 mt-2 mb-3">Matheus Guedes</h2>
            <nav>
              <ul className="nav d-flex flex-column align-items-center nav-pills">
                <li className=" nav-item">
                  <button className="nav-link btn" onClick={() => setActiveSection("secaoColaboradores")}>
                    <i className="fas fa-users mr-2"></i>Colaboradores
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => setActiveSection("secaoNoticias")}>
                    <i className="fas fa-newspaper mr-2"></i>Notícias
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => setActiveSection("secaoParceiros")}>
                    <i className="fas fa-handshake mr-2"></i>Parceiros
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => setActiveSection("secaoProjetos")}>
                    <i className="fas fa-project-diagram mr-2"></i>Projetos
                  </button>
                </li>
                <li className="nav-item">
                  <a href="/index/index.html" target="_blank" rel="noopener noreferrer" className="nav-link">
                    <i className="fas fa-globe mr-2"></i>Site
                  </a>
                </li>
                <li className="nav-item mt-3">
                  <button className="btn btn-danger btn-sm w-100 text-white">
                    <i className="fas fa-sign-out-alt mr-2"></i>Sair
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <main className="col-lg-9">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Admin;

