import React from 'react';
import { Form, Input, Button } from './styles';

const FormComponent = ({ form, onChange, onSubmit, editandoId }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        name="nome"
        placeholder="Nome do Time"
        value={form.nome}
        onChange={onChange}
      />
      <Input
        name="tecnico"
        placeholder="Técnico"
        value={form.tecnico}
        onChange={onChange}
      />
      <Input
        name="estadio"
        placeholder="Estádio"
        value={form.estadio}
        onChange={onChange}
      />
      {/* Apenas campo de URL de imagem */}
      <Input
        name="logo"
        placeholder="URL da Imagem do Time"
        value={form.logo}
        onChange={onChange}
      />
      <Button type="submit">
        {editandoId ? 'Salvar Alterações' : 'Adicionar Time'}
      </Button>
    </Form>
  );
};

export default FormComponent;
