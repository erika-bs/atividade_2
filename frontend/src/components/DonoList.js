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

const DonoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: ${(props) => (props.edit ? "#2196F3" : "#f44336")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background-color: ${(props) => (props.edit ? "#1976D2" : "#d32f2f")};
  }
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function DonoList({ onDonoAdicionado }) {
  const [donos, setDonos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ nome: "", telefone: "" });

  useEffect(() => {
    api.get("donos/")
      .then((response) => setDonos(response.data))
      .catch((error) => console.log("Erro ao buscar donos:", error));
  }, [onDonoAdicionado]);

  const handleDelete = (id) => {
    api.delete(`donos/${id}/`)
      .then(() => {
        setDonos(donos.filter((dono) => dono.id !== id));
      })
      .catch((error) => {
        console.log("Erro ao excluir dono:", error);
      });
  };

  const handleEditClick = (dono) => {
    setEditingId(dono.id);
    setEditData({ nome: dono.nome, telefone: dono.telefone });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (id) => {
    api.put(`donos/${id}/`, editData)
      .then((response) => {
        setDonos(donos.map((dono) => (dono.id === id ? response.data : dono)));
        setEditingId(null);
      })
      .catch((error) => {
        console.log("Erro ao editar dono:", error);
      });
  };

  return (
    <ListContainer>
      <h2>Donos cadastrados</h2>
      {donos.map((dono) => (
        <DonoItem key={dono.id}>
          {editingId === dono.id ? (
            <div>
              <Input
                type="text"
                name="nome"
                value={editData.nome}
                onChange={handleEditChange}
              />
              <Input
                type="text"
                name="telefone"
                value={editData.telefone}
                onChange={handleEditChange}
              />
              <Button edit onClick={() => handleEditSubmit(dono.id)}>Salvar</Button>
              <Button onClick={() => setEditingId(null)}>Cancelar</Button>
            </div>
          ) : (
            
            <>
              <p><strong>Nome:</strong> {dono.nome} - <strong>Telefone:</strong> {dono.telefone}</p>
              <div>
                <Button onClick={() => handleDelete(dono.id)}>Excluir</Button>
                <Button edit onClick={() => handleEditClick(dono)}>Editar</Button>
              </div>
            </>
          )}
        </DonoItem>
      ))}
    </ListContainer>
  );
}

export default DonoList;
