import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, update, remove } from 'firebase/database';

function SecaoProjetos() {
  const db = getDatabase();

  const [projetos, setProjetos] = useState([]);
  const [formProjeto, setFormProjeto] = useState({
    titulo: '',
    descricao: '',
    colaboradores: '',
    parceiros: ''
  });
  const [editId, setEditId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const projetosRef = ref(db, 'projetos');
    onValue(projetosRef, snapshot => {
      const data = snapshot.val() || {};
      const lista = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
      setProjetos(lista);
    });
  }, [db]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormProjeto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { titulo, descricao } = formProjeto;
    if (!titulo.trim() || !descricao.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }

    try {
      if (editId) {
        await update(ref(db, `projetos/${editId}`), formProjeto);
        alert('Projeto atualizado com sucesso!');
      } else {
        await push(ref(db, 'projetos'), formProjeto);
        alert('Projeto adicionado com sucesso!');
      }
      resetForm();
    } catch (err) {
      alert('Erro ao salvar projeto: ' + err.message);
    }
  };

  const handleEdit = projeto => {
    setFormProjeto({
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      colaboradores: projeto.colaboradores || '',
      parceiros: projeto.parceiros || ''
    });
    setEditId(projeto.id);
    setFormVisible(true);
  };

  const handleDelete = async id => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await remove(ref(db, `projetos/${id}`));
        alert('Projeto excluído!');
      } catch (err) {
        alert('Erro ao excluir projeto: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormProjeto({
      titulo: '',
      descricao: '',
      colaboradores: '',
      parceiros: ''
    });
    setEditId(null);
    setFormVisible(false);
  };

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Projetos</h2>
        <button className="btn btn-success btn-sm" onClick={() => setFormVisible(true)}>
          <i className="fas fa-plus mr-1"></i> Novo Projeto
        </button>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="card card-body mb-4 p-3">
          <h5 className="h5 mb-3">{editId ? 'Editar Projeto' : 'Cadastrar Novo Projeto'}</h5>

          <div className="form-group">
            <label>Título do Projeto:</label>
            <input
              type="text"
              name="titulo"
              className="form-control form-control-sm"
              value={formProjeto.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <textarea
              name="descricao"
              className="form-control form-control-sm"
              rows="3"
              value={formProjeto.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Colaboradores (texto livre):</label>
            <input
              type="text"
              name="colaboradores"
              className="form-control form-control-sm"
              value={formProjeto.colaboradores}
              onChange={handleChange}
              placeholder="Ex: João, Maria"
            />
          </div>

          <div className="form-group">
            <label>Parceiros (texto livre):</label>
            <input
              type="text"
              name="parceiros"
              className="form-control form-control-sm"
              value={formProjeto.parceiros}
              onChange={handleChange}
              placeholder="Ex: IFPR, UTFPR"
            />
          </div>

          <div className="form-actions text-right pt-3 mt-1">
            <button type="submit" className="btn btn-primary btn-sm mr-2">Salvar</button>
            <button type="button" onClick={resetForm} className="btn btn-secondary btn-sm ms-2">Cancelar</button>
          </div>
        </form>
      )}

      <div className="list-container">
        {projetos.length === 0 ? (
          <p className="text-muted text-center p-3">Nenhum projeto cadastrado ainda.</p>
        ) : (
          projetos.map(projeto => (
            <div key={projeto.id} className="card mb-2 p-3">
              <h5 className="mb-1">{projeto.titulo}</h5>
              <p className="mb-1">{projeto.descricao}</p>
              {projeto.colaboradores && (
                <p className="mb-1"><strong>Colaboradores:</strong> {projeto.colaboradores}</p>
              )}
              {projeto.parceiros && (
                <p className="mb-2"><strong>Parceiros:</strong> {projeto.parceiros}</p>
              )}
              <div>
                <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleEdit(projeto)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(projeto.id)}>
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

export default SecaoProjetos;

