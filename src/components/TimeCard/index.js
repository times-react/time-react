import React from 'react';
import { TimeCard, TimeCardImage, TimeCardTitle, TimeCardDetails, Button } from './styles';

const TimeCardComponent = ({ time, onEdit, onDelete }) => {
  return (
    <TimeCard>
      {time.logo && <TimeCardImage src={time.logo} alt={time.nome} />}
      <TimeCardTitle>{time.nome}</TimeCardTitle>
      <TimeCardDetails><strong>Técnico:</strong> {time.tecnico}</TimeCardDetails>
      <TimeCardDetails><strong>Estádio:</strong> {time.estadio}</TimeCardDetails>
      <Button onClick={() => onEdit(time)}>Editar</Button>
      <Button onClick={() => onDelete(time.id)}>Excluir</Button>
    </TimeCard>
  );
};

export default TimeCardComponent;
