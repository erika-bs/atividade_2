import React, { useState } from "react";
import styled from "styled-components";
import api from "../service/api";

const FormContainer = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: auto;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

function DonoForm({ onDonoAdicionado }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('donos/', { nome, telefone })
      .then(response => {
        onDonoAdicionado();
        setNome('');
        setTelefone('');
      })
      .catch(error => {
        console.log('Erro ao adicionar dono:', error);
      });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label>Nome do Dono</label>
      <Input
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      
      <label>Telefone</label>
      <Input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />
      
      <Button type="submit">Adicionar Dono</Button>
    </FormContainer>
  );
}

export default DonoForm;
