import styled from 'styled-components';

export const TimeCard = styled.div`
  background-color: #f7f7f7;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  width: 280px;
  padding: 25px;
  margin: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    width: 100%; /* Fazer os cartões ocuparem toda a largura disponível em dispositivos menores */
    max-width: 320px; /* Limitar o tamanho máximo dos cartões */
    margin: 10px 0; /* Ajustar a margem */
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const TimeCardImage = styled.img`
  border-radius: 10px;
  margin-bottom: 15px;
  max-width: 100%;
  height: auto;
`;

export const TimeCardTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 1.3rem; /* Ajustar o tamanho do título nos cartões */
  }
`;

export const TimeCardDetails = styled.p`
  font-size: 1rem;
  color: #000;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajustar o tamanho do texto em telas menores */
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  padding: 8px 20px;
  border: none;
  margin-top: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  margin-right: 18px;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%; /* Tornar os botões mais largos em telas pequenas */
    font-size: 1rem; /* Ajustar o tamanho da fonte */
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;
