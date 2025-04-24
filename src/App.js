import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Estilos
const AppContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 20px;
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #1e3a8a;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px;
  margin: 12px 0;
  width: 80%;
  max-width: 500px;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 12px 25px;
  border: none;
  margin-top: 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TimeCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e7ff;
  width: 280px;
  padding: 25px;
  margin: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  }
`;

const TimeCardImage = styled.img`
  border-radius: 10px;
  margin-bottom: 15px;
  max-width: 100%;
  height: auto;
`;

const TimeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const TimeCardTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 10px 0;
`;

const TimeCardDetails = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
`;

// Componente principal
function App() {
  const [times, setTimes] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    tecnico: '',
    logo: '',
    estadio: '',
  });
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

      <Form onSubmit={handleSubmit}>
        <Input
          name="nome"
          placeholder="Nome do Time"
          value={form.nome}
          onChange={handleChange}
        />
        <Input
          name="tecnico"
          placeholder="Técnico"
          value={form.tecnico}
          onChange={handleChange}
        />
        <Input
          name="estadio"
          placeholder="Estádio"
          value={form.estadio}
          onChange={handleChange}
        />
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        <Button type="submit">
          {editandoId ? 'Salvar Alterações' : 'Adicionar Time'}
        </Button>
      </Form>

      <TimeListContainer>
        {times.map((time) => (
          <TimeCard key={time.id}>
            {time.logo && <TimeCardImage src={time.logo} alt={time.nome} />}
            <TimeCardTitle>{time.nome}</TimeCardTitle>
            <TimeCardDetails><strong>Técnico:</strong> {time.tecnico}</TimeCardDetails>
            <TimeCardDetails><strong>Estádio:</strong> {time.estadio}</TimeCardDetails>
            <Button onClick={() => handleEdit(time)}>Editar</Button>
            <Button onClick={() => handleDelete(time.id)}>Excluir</Button>
          </TimeCard>
        ))}
      </TimeListContainer>
    </AppContainer>
  );
}

export default App;
