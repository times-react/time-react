import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 25px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 100%; /* Tornar o formulário flexível */

  @media (max-width: 768px) {
    padding: 15px; /* Reduzir o padding em dispositivos menores */
  }
`;

export const Input = styled.input`
  padding: 12px;
  margin: 12px 0;
  width: 80%;
  max-width: 500px;
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 90%; /* Tornar os inputs mais largos em telas menores */
    font-size: 0.9rem; /* Ajustar o tamanho da fonte */
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 12px 25px;
  border: none;
  margin-top: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%; /* Tornar o botão mais largo em telas menores */
    font-size: 1rem; /* Ajustar o tamanho da fonte */
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;
