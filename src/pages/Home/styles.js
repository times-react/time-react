import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 100%; /* Tornar o container flexível */
  
  @media (max-width: 768px) {
    padding: 20px; /* Menos padding em telas menores */
  }
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 2rem; /* Ajuste o tamanho do título em telas menores */
  }
`;

export const TimeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 10px; /* Reduzir o espaçamento entre os cartões em telas menores */
  }
`;

