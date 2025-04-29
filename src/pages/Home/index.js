import React, { useState, useEffect } from 'react';
import FormComponent from '../../components/Form/index';
import TimeCardComponent from '../../components/TimeCard/index';
import { AppContainer, Title, TimeListContainer } from './styles';

function Home() {
  const [times, setTimes] = useState([]);
  const [form, setForm] = useState({ nome: '', tecnico: '', logo: '', estadio: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  // Carregar dados do localStorage ao abrir o app
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('times');
    if (dadosSalvos) {
      setTimes(JSON.parse(dadosSalvos));
    }
  }, []);

  // Atualizar localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('times', JSON.stringify(times));
  }, [times]);

  const exibirMensagem = (texto) => {
    setMensagem(texto);
    setTimeout(() => setMensagem(''), 4000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nome || !form.tecnico || !form.estadio || !form.logo) {
      setErro('Por favor, preencha todos os campos.');
      setTimeout(() => setErro(''), 4000);
      return;
    }

    if (editandoId) {
      const listaAtualizada = times.map((time) =>
        time.id === editandoId ? { ...form, id: editandoId } : time
      );
      setTimes(listaAtualizada);
      exibirMensagem('Time editado com sucesso!');
      setEditandoId(null);
    } else {
      const novoTime = { ...form, id: Date.now() };
      setTimes([...times, novoTime]);
      exibirMensagem('Time adicionado com sucesso!');
    }

    setForm({ nome: '', tecnico: '', logo: '', estadio: '' });
  };

  const handleDelete = (id) => {
    const novaLista = times.filter((time) => time.id !== id);
    setTimes(novaLista);
    exibirMensagem('Time excluído com sucesso!');
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
