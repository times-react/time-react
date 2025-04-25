
import React from 'react';
import { Form, Input, Button } from './styles';

const FormComponent = ({ form, onChange, onSubmit, onFileChange, editandoId }) => {
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
      <Input type="file" accept="image/*" onChange={onFileChange} />
      <Button type="submit">
        {editandoId ? 'Salvar Alterações' : 'Adicionar Time'}
      </Button>
    </Form>
  );
};

export default FormComponent;
