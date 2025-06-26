import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, update, remove } from 'firebase/database';

function SecaoNoticias() {
  const db = getDatabase();

  const [noticias, setNoticias] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [formNoticia, setFormNoticia] = useState({
    nome: '',
    data: '',
    descricao: '',
    projetoVinculado: '',
    imagemRef: '',
    legendaImagem: ''
  });
  const [editId, setEditId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    // Carregar notícias
    const noticiasRef = ref(db, 'noticias');
    onValue(noticiasRef, snapshot => {
      const data = snapshot.val() || {};
      const lista = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
      setNoticias(lista);
    });

    // Carregar projetos
    const projetosRef = ref(db, 'projetos');
    onValue(projetosRef, snapshot => {
      const data = snapshot.val() || {};
      const lista = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
      setProjetos(lista);
    });
  }, [db]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormNoticia(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { nome, data, descricao, projetoVinculado } = formNoticia;
    if (!nome.trim() || !data.trim() || !descricao.trim() || !projetoVinculado) {
      alert('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    try {
      if (editId) {
        await update(ref(db, `noticias/${editId}`), formNoticia);
        alert('Notícia atualizada com sucesso!');
      } else {
        await push(ref(db, 'noticias'), formNoticia);
        alert('Notícia adicionada com sucesso!');
      }
      resetForm();
    } catch (err) {
      alert('Erro ao salvar notícia: ' + err.message);
    }
  };

  const handleEdit = noticia => {
    setFormNoticia({
      nome: noticia.nome || '',
      data: noticia.data || '',
      descricao: noticia.descricao || '',
      projetoVinculado: noticia.projetoVinculado || '',
      imagemRef: noticia.imagemRef || '',
      legendaImagem: noticia.legendaImagem || ''
    });
    setEditId(noticia.id);
    setFormVisible(true);
  };

  const handleDelete = async id => {
    if (window.confirm('Deseja excluir esta notícia?')) {
      try {
        await remove(ref(db, `noticias/${id}`));
        alert('Notícia excluída!');
      } catch (err) {
        alert('Erro ao excluir notícia: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormNoticia({
      nome: '',
      data: '',
      descricao: '',
      projetoVinculado: '',
      imagemRef: '',
      legendaImagem: ''
    });
    setEditId(null);
    setFormVisible(false);
  };

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h2 className="h4 mb-0">Notícias</h2>
        <button className="btn btn-success btn-sm" onClick={() => setFormVisible(true)}>
          <i className="fas fa-plus mr-1"></i> Nova Notícia
        </button>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="card card-body mb-4 p-3">
          <h5 className="h5 mb-3">{editId ? 'Editar Notícia' : 'Cadastrar Nova Notícia'}</h5>

          <div className="form-group">
            <label>Nome da Notícia:</label>
            <input
              type="text"
              name="nome"
              className="form-control form-control-sm"
              value={formNoticia.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Data:</label>
            <input
              type="date"
              name="data"
              className="form-control form-control-sm"
              value={formNoticia.data}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <textarea
              name="descricao"
              className="form-control form-control-sm"
              rows="4"
              value={formNoticia.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Projeto Vinculado:</label>
            <select
              name="projetoVinculado"
              className="form-control form-control-sm"
              value={formNoticia.projetoVinculado}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um projeto</option>
              {projetos.map(proj => (
                <option key={proj.id} value={proj.titulo}>{proj.titulo}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Referência da Imagem (texto):</label>
            <input
              type="text"
              name="imagemRef"
              className="form-control form-control-sm"
              value={formNoticia.imagemRef}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Legenda da Imagem:</label>
            <input
              type="text"
              name="legendaImagem"
              className="form-control form-control-sm"
              value={formNoticia.legendaImagem}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions text-right border-top pt-3 mt-1">
            <button type="submit" className="btn btn-primary btn-sm mr-2">Salvar</button>
            <button type="button" onClick={resetForm} className="btn btn-secondary btn-sm ms-2">Cancelar</button>
          </div>
        </form>
      )}

      <div className="list-container">
        {noticias.length === 0 ? (
          <p className="text-muted text-center p-3">Nenhuma notícia cadastrada ainda.</p>
        ) : (
          noticias.map(noticia => (
            <div key={noticia.id} className="card mb-2 p-3">
              <h5 className="mb-1">{noticia.nome}</h5>
              <p className="mb-1">{noticia.descricao}</p>
              <p className="mb-1"><strong>Data:</strong> {noticia.data}</p>
              <p className="mb-1"><strong>Projeto Vinculado:</strong> {noticia.projetoVinculado}</p>
              {noticia.imagemRef && (
                <p className="mb-1"><strong>Imagem:</strong> {noticia.imagemRef}</p>
              )}
              {noticia.legendaImagem && (
                <p className="mb-1"><strong>Legenda:</strong> {noticia.legendaImagem}</p>
              )}
              <div>
                <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(noticia)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(noticia.id)}>
                  <i className="fas fa-trash"></i> Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default SecaoNoticias;

