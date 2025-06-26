import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, update, remove } from 'firebase/database';

function Admin() {
  const db = getDatabase();

  const [parceiros, setParceiros] = useState([]);
  const [formParceiro, setFormParceiro] = useState({ nome: '', site: '' });
  const [editId, setEditId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const parceirosRef = ref(db, 'parceiros');
    onValue(parceirosRef, snapshot => {
      const data = snapshot.val() || {};
      const lista = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
      setParceiros(lista);
    });
  }, [db]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormParceiro(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formParceiro.nome.trim() || !formParceiro.site.trim()) {
      alert('Nome e site são obrigatórios.');
      return;
    }

    try {
      if (editId) {
        await update(ref(db, `parceiros/${editId}`), formParceiro);
        alert('Parceiro atualizado com sucesso!');
      } else {
        await push(ref(db, 'parceiros'), formParceiro);
        alert('Parceiro adicionado com sucesso!');
      }
      setFormParceiro({ nome: '', site: '' });
      setEditId(null);
      setFormVisible(false);
    } catch (err) {
      alert('Erro ao salvar parceiro: ' + err.message);
    }
  };

  const handleEdit = parceiro => {
    setFormParceiro({ nome: parceiro.nome, site: parceiro.site });
    setEditId(parceiro.id);
    setFormVisible(true);
  };

  const handleDelete = async id => {
    if (window.confirm('Tem certeza que deseja excluir este parceiro?')) {
      try {
        await remove(ref(db, `parceiros/${id}`));
        alert('Parceiro excluído!');
      } catch (err) {
        alert('Erro ao excluir parceiro: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormParceiro({ nome: '', site: '' });
    setEditId(null);
    setFormVisible(true);
  };

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Parceiros</h2>
        <button className="btn btn-success btn-sm" onClick={resetForm}>
          <i className="fas fa-plus mr-1"></i> Novo Parceiro
        </button>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="card card-body mb-4 p-3">
          <h5 className="h5 mb-3">{editId ? 'Editar Parceiro' : 'Cadastrar Novo Parceiro'}</h5>
          <div className="form-group">
            <label htmlFor="parceiroNome">Nome do Parceiro:</label>
            <input
              type="text"
              name="nome"
              id="parceiroNome"
              className="form-control form-control-sm"
              value={formParceiro.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="parceiroSite">Link do Site:</label>
            <input
              type="url"
              name="site"
              id="parceiroSite"
              className="form-control form-control-sm"
              value={formParceiro.site}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions text-right pt-3 mt-1">
            <button type="submit" className="btn btn-primary btn-sm mr-2">
              Salvar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm ms-2"
              onClick={() => {
                setFormVisible(false);
                setFormParceiro({ nome: '', site: '' });
                setEditId(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="list-container">
        {parceiros.length === 0 ? (
          <p className="text-muted text-center p-3">Nenhum parceiro cadastrado ainda.</p>
        ) : (
        <div className="list-group">
          {parceiros.map(parceiro => (
            <div key={parceiro.id} className="card mb-2 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <h5 className="mb-1">{parceiro.nome}</h5>
                  <p className="mb-1">
                    <a href={parceiro.site} target="_blank" rel="noopener noreferrer">
                      {parceiro.site}
                    </a>
                  </p>
                </div>
                <div>
                  <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleEdit(parceiro)}>
                    <i className="fas fa-edit"></i> Editar
                  </button>
                  <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(parceiro.id)}>
                    <i className="fas fa-trash"></i> Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

export default Admin;

