import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Parceiros from './pages/Parceiros';
import Colaboradores from './pages/Colaboradores';
import Noticias from './pages/Noticias';
import NoticiaExample from './pages/NoticiaExample';
import Projetos from './pages/Projetos';
import ProjetoExample from './pages/ProjetoExample';
import Contato from './pages/Contato';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Parceiros" element={<Parceiros />} />
        <Route path="/Colaboradores" element={<Colaboradores />} />
        <Route path="/Noticias" element={<Noticias />} />
        <Route path="/NoticiaExample" element={<NoticiaExample />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Projetos" element={<Projetos />} />
        <Route path="/ProjetoExample" element={<ProjetoExample />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
