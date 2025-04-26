import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import FormComponent from '../../components/Form';
import TimeCardComponent from '../../components/TimeCard';
import { AppContainer, Title, TimeListContainer } from './styles';

function Home() {
  const [times, setTimes] = useState([]);
  const [form, setForm] = useState({ nome: '', tecnico: '', logo: '', estadio: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetchTimes();
  }, []);

  const fetchTimes = async () => {
    try {
      const res = await api.get('/listar');
      setTimes(res.data);
    } catch (error) {
      console.error('Erro ao buscar times:', error);
      setErro('Erro ao carregar times. Tente novamente mais tarde.');
      setTimeout(() => setErro(''), 4000);
    }
  };

  const exibirMensagem = (texto) => {
    setMensagem(texto);
    setTimeout(() => setMensagem(''), 4000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.tecnico || !form.estadio || !form.logo) {
      setErro('Por favor, preencha todos os campos.');
      setTimeout(() => setErro(''), 4000);
      return;
    }

    try {
      if (editandoId) {
        await api.put(`/${editandoId}`, form);
        exibirMensagem('Time editado com sucesso!');
        setEditandoId(null);
      } else {
        await api.post('/criar', form);
        exibirMensagem('Time adicionado com sucesso!');
      }

      // Atualizar a lista após adicionar ou editar
      fetchTimes();
      setForm({ nome: '', tecnico: '', logo: '', estadio: '' });
    } catch (error) {
      console.error('Erro ao salvar time:', error);
      setErro('Erro ao salvar time. Tente novamente.');
      setTimeout(() => setErro(''), 4000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      exibirMensagem('Time excluído com sucesso!');
      fetchTimes();
    } catch (error) {
      console.error('Erro ao excluir time:', error);
      setErro('Erro ao excluir time. Tente novamente.');
      setTimeout(() => setErro(''), 4000);
    }
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

      {mensagem && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: '#065f46',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          {mensagem}
        </div>
      )}

      {erro && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          {erro}
        </div>
      )}

      <FormComponent
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editandoId={editandoId}
      />

      <TimeListContainer>
        {times.map((time) => (
          <TimeCardComponent
            key={time.id}
            time={time}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </TimeListContainer>
    </AppContainer>
  );
}

export default Home;
