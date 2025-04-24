import React, { useState } from 'react';
import './App.css';

function App() {
  const [times, setTimes] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    tecnico: '',
    logo: '',
    estadio: '',
  });
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prevForm) => ({ ...prevForm, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.nome && form.tecnico && form.logo && form.estadio) {
      if (editandoId) {
        // Atualizar time existente
        const timesAtualizados = times.map((time) =>
          time.id === editandoId ? { ...form, id: editandoId } : time
        );
        setTimes(timesAtualizados);
        setEditandoId(null);
      } else {
        // Adicionar novo time
        setTimes([...times, { ...form, id: Date.now() }]);
      }

      setForm({ nome: '', tecnico: '', logo: '', estadio: '' });
    }
  };

  const handleDelete = (id) => {
    setTimes(times.filter((time) => time.id !== id));
  };

  const handleEdit = (time) => {
    setForm({
      nome: time.nome,
      tecnico: time.tecnico,
      logo: time.logo,
      estadio: time.estadio,
    });
    setEditandoId(time.id);
  };

  return (
    <div className="App">
      <h1>{editandoId ? 'Editar Time' : 'Cadastro de Times'}</h1>

      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome do Time" value={form.nome} onChange={handleChange} />
        <input name="tecnico" placeholder="Técnico" value={form.tecnico} onChange={handleChange} />
        <input name="estadio" placeholder="Estádio" value={form.estadio} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">{editandoId ? 'Salvar Alterações' : 'Adicionar Time'}</button>
      </form>

      <hr />

      <div className="times-list">
        {times.map((time) => (
          <div key={time.id} className="time-card">
            {time.logo && <img src={time.logo} alt={time.nome} width="100" />}
            <h2>{time.nome}</h2>
            <p><strong>Técnico:</strong> {time.tecnico}</p>
            <p><strong>Estádio:</strong> {time.estadio}</p>
            <button onClick={() => handleEdit(time)}>Editar</button>
            <button onClick={() => handleDelete(time.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
