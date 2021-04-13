import React from "react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import "./App.css";
import ClampMachine from "./components/ClampMachine";
import DFAGraph from "./components/DFAGraph";

interface ContainerProps {}

const App = (): React.ReactElement => {
    return (
        <RecoilRoot>
            <Container id="dfa-clamp-machine">
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
