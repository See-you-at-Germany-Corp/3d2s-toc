import React from "react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import "./App.css";
import ClampMachine from "./components/ClampMachine";
import DFAGraph from "./components/DFAGraph";

interface ContainerProps {
    scale: number;
}

const App = (): React.ReactElement => {
    return (
        <RecoilRoot>
            <Container id="dfa-clamp-machine" scale={window.innerHeight / 1450}>
                <ClampMachine />
                <DFAGraph />
            </Container>
        </RecoilRoot>
    );
};

const Container = styled.div<ContainerProps>`
    display: flex;
    max-width: 100vw;
`;

export default App;
