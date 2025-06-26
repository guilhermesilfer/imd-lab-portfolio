import React, { useState, useEffect } from "react";
import { ref, push, update, remove, onValue } from "firebase/database";
import { db } from "./Firebase";

const SecaoColaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    colabNome: "",
    colabCargo: "",
    colabFormacao: "",
    colabLinkedin: "",
    colabEmail: "",
    colabImagem: "",
    colabDescricao: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const colabsRef = ref(db, "colaboradores");
    onValue(colabsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const lista = Object.entries(data).map(([id, val]) => ({
        id,
        ...val,
      }));
      setColaboradores(lista);
    });
  }, [db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.colabNome || !formData.colabCargo) {
      alert("Nome e cargo são obrigatórios");
      return;
    }

    try {
      if (editId) {
        await update(ref(db, `colaboradores/${editId}`), formData);
        alert("Colaborador atualizado!");
      } else {
        await push(ref(db, "colaboradores"), formData);
        alert("Colaborador adicionado!");
      }
      resetForm();
    } catch (err) {
      alert("Erro ao salvar colaborador: " + err.message);
    }
  };

  const handleEdit = (colab) => {
    setFormData(colab);
    setEditId(colab.id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja excluir este colaborador?")) {
      try {
        await remove(ref(db, `colaboradores/${id}`));
      } catch (err) {
        alert("Erro ao excluir: " + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormVisible(false);
    setFormData({
      colabNome: "",
      colabCargo: "",
      colabFormacao: "",
      colabLinkedin: "",
      colabEmail: "",
      colabImagem: "",
      colabDescricao: "",
    });
    setEditId(null);
  };

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Colaboradores</h2>
        <button className="btn btn-success btn-sm" onClick={() => { resetForm(); setFormVisible(true); }}>
          <i className="fas fa-plus mr-1"></i> Novo Colaborador
        </button>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="card card-body mb-4 p-3 bg-light">
          <h5 className="h5 mb-3">{editId ? "Editar" : "Novo"} Colaborador</h5>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Nome:</label>
              <input
                type="text"
                className="form-control"
                name="colabNome"
                value={formData.colabNome}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Cargo:</label>
              <input
                type="text"
                className="form-control"
                name="colabCargo"
                value={formData.colabCargo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Formação:</label>
            <input
              type="text"
              className="form-control"
              name="colabFormacao"
              value={formData.colabFormacao}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>LinkedIn:</label>
              <input
                type="url"
                className="form-control"
                name="colabLinkedin"
                value={formData.colabLinkedin}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="colabEmail"
                value={formData.colabEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Imagem (texto):</label>
            <input
              type="text"
              className="form-control"
              name="colabImagem"
              value={formData.colabImagem}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <textarea
              className="form-control"
              name="colabDescricao"
              rows="3"
              value={formData.colabDescricao}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="text-right mt-3">
            <button type="submit" className="btn btn-primary btn-sm mr-2">
              {editId ? "Atualizar" : "Salvar"}
            </button>
            <button type="button" className="btn btn-secondary btn-sm ms-2" onClick={resetForm}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {colaboradores.length === 0 ? (
        <p className="text-muted text-center">Nenhum colaborador cadastrado.</p>
      ) : (
        <div className="list-group">
          {colaboradores.map((colab) => (
            <div key={colab.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{colab.colabNome}</strong> — {colab.colabCargo}
                </div>
                <div>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(colab)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(colab.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SecaoColaboradores;

