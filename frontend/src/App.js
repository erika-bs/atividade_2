import React, { useState } from "react";
import styled from "styled-components";
import DonoForm from "./components/DonoForm";
import DonoList from "./components/DonoList";
import PetForm from "./components/PetForm";
import PetList from "./components/PetList";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const SectionTitle = styled.h1`
  color: #333;
  margin-top: 30px;
  margin-bottom: 10px;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
`;

function App() {
  const [refresh, setRefresh] = useState(false);

  const updateList = () => setRefresh(!refresh);

  return (
    <Container>
      <SectionTitle>Cadastro de Donos</SectionTitle>
      <DonoForm onDonoAdicionado={updateList} />
      <DonoList key={refresh ? "donos-refresh" : "donos"} onDonoAdicionado={updateList} />

      <SectionTitle>Cadastro de Pets</SectionTitle>
      <PetForm onPetAdicionado={updateList} />
      <PetList key={refresh ? "pets-refresh" : "pets"} onPetAdicionado={updateList} />
    </Container>
  );
}

export default App;
