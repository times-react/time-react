import React, { useState, useEffect } from 'react';
import FormComponent from '../../components/Form';
import TimeCardComponent from '../../components/TimeCard';
import { AppContainer, Title, TimeListContainer } from './styles';

function Home() {
  const [times, setTimes] = useState([]);
  const [form, setForm] = useState({ nome: '', tecnico: '', logo: '', estadio: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const timesSalvos = JSON.parse(localStorage.getItem('times')) || [];
    setTimes(timesSalvos);
  }, []);

  useEffect(() => {
    if (times.length > 0) {
      localStorage.setItem('times', JSON.stringify(times));
    }
  }, [times]);

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
        const timesAtualizados = times.map((time) =>
          time.id === editandoId ? { ...form, id: editandoId } : time
        );
        setTimes(timesAtualizados);
        setEditandoId(null);
      } else {
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
    <AppContainer>
      <Title>{editandoId ? 'Editar Time' : 'Cadastro de Times'}</Title>
      <FormComponent 
        form={form} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        onFileChange={handleImageChange} 
        editandoId={editandoId} 
      />
      <TimeListContainer>
        {times.map((time) => (
          <TimeCardComponent key={time.id} time={time} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </TimeListContainer>
    </AppContainer>
  );
}

export default Home;
