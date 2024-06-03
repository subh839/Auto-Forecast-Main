import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import styled from "styled-components";
import tw from "twin.macro";
import "./App.css";
import { HomePage } from "./app/containers/HomePage";
import PredictPrice from "./app/components/PredictPrice"

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `};
`;

function App() {
  return (
    <AppContainer>
        <Router>
      <Routes>
      <Route path="/" element={[<HomePage />]}/>
      <Route path="/predict" element={[<PredictPrice />]}/>
      </Routes>
    </Router>
    </AppContainer>
    
    
  );
}

export default App;
