import React, { useState, useEffect } from "react";
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

const Select = styled.select`
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
  
  &:hover {
    background-color: #45a049;
  }
`;

function PetForm({ onPetAdicionado }) {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [dono, setDono] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [donos, setDonos] = useState([]);

  useEffect(() => {
    api.get('donos/')
      .then(response => setDonos(response.data))
      .catch(error => console.log('Erro ao buscar donos:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificação de dados antes de enviar
    if (!nome || !raca || !dono || !dataNascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const petData = { nome, raca, dono: parseInt(dono), d_nasc: dataNascimento };
    console.log("Dados enviados para o backend:", petData);

    // Enviar dados para o servidor
    api.post('pets/', petData)
      .then(response => {
        onPetAdicionado();
        setNome('');
        setRaca('');
        setDono('');
        setDataNascimento('');
      })
      .catch(error => {
        console.log('Erro ao adicionar pet:', error.response ? error.response.data : error);
        alert('Erro ao adicionar pet. Tente novamente.');
      });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label>Nome do Pet</label>
      <Input
        type="text"
        placeholder="Nome do pet"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <label>Raça</label>
      <Input
        type="text"
        placeholder="Raça do pet"
        value={raca}
        onChange={(e) => setRaca(e.target.value)}
      />

      <label>Data de Nascimento</label>
      <Input
        type="date"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
      />

      <label>Escolha o Dono</label>
      <Select value={dono} onChange={(e) => setDono(e.target.value)}>
        <option value="">Selecione um dono</option>
        {donos.map(dono => (
          <option key={dono.id} value={dono.id}>
            {dono.nome}
          </option>
        ))}
      </Select>

      <Button type="submit">Adicionar Pet</Button>
    </FormContainer>
  );
}

export default PetForm;
