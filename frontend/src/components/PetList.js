import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../service/api";

const ListContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const PetItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: ${(props) => props.$edit ? "#2196F3" : "#f44336"};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background-color: ${(props) => props.$edit ? "#1976D2" : "#d32f2f"};
  }
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function PetList({ onPetAdicionado }) {
  const [pets, setPets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ nome: "", raca: "", d_nasc: "" });

  useEffect(() => {
    api.get("pets/")
      .then((response) => setPets(response.data))
      .catch((error) => console.log("Erro ao buscar pets:", error));
  }, [onPetAdicionado]);

  const handleDelete = (id) => {
    api.delete(`pets/${id}/`)
      .then(() => {
        setPets(pets.filter(pet => pet.id !== id));
      })
      .catch((error) => {
        console.log("Erro ao excluir pet:", error);
      });
  };

  const handleEditClick = (pet) => {
    setEditingId(pet.id);
    setEditData({
      nome: pet.nome,
      raca: pet.raca,
      d_nasc: pet.d_nasc,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (id) => {
    api.put(`pets/${id}/`, { ...editData, dono: pets.find(p => p.id === id).dono })
      .then((response) => {
        setPets(pets.map(pet => pet.id === id ? response.data : pet));
        setEditingId(null);
      })
      .catch((error) => {
        console.log("Erro ao editar pet:", error);
      });
  };

  return (
    <ListContainer>
      <h2>Pets cadastrados</h2>
      {pets.map((pet) => (
        <PetItem key={pet.id}>
          {editingId === pet.id ? (
            <div>
              <Input
                type="text"
                name="nome"
                value={editData.nome}
                onChange={handleEditChange}
              />
              <Input
                type="text"
                name="raca"
                value={editData.raca}
                onChange={handleEditChange}
              />
              <Input
                type="date"
                name="d_nasc"
                value={editData.d_nasc}
                onChange={handleEditChange}
              />
              <Button $edit onClick={() => handleEditSubmit(pet.id)}>Salvar</Button>
              <Button onClick={() => setEditingId(null)}>Cancelar</Button>
            </div>
          ) : (
            <>
              <p><strong>Nome: </strong>{pet.nome} - <strong>Raça:</strong> {pet.raca} - <strong>Dono:</strong>{pet.dono_nome}</p>
              <div>
                <Button onClick={() => handleDelete(pet.id)}>Excluir</Button>
                <Button $edit onClick={() => handleEditClick(pet)}>Editar</Button>
              </div>
            </>
          )}
        </PetItem>
      ))}
    </ListContainer>
  );
}

export default PetList;
