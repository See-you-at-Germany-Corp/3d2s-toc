import React from "react";
import styled from "styled-components";

// import Xarrow from "react-xarrows";
import { MapInteractionCSS } from "react-map-interaction";

import { useRecoilValue } from "recoil";
import { DFACurrentState } from "../../store/index";

import { DFANode } from "./DFANode";

import dfa_graph from "../../asset/DFA_graph.png";

const DFAGraph: React.FC = () => {
    const currentState = useRecoilValue(DFACurrentState);

    return (
        <Container>
            <MapInteractionCSS>
                <img src={dfa_graph} alt="dfa graph" />
                <DFANode state={currentState} />
            </MapInteractionCSS>
        </Container>
    );
};

const Container = styled.div`
    width: 800px;
    height: 800px;
    margin-top: 25px;

    display: flex;
    background-color: blanchedalmond;
    justify-content: space-between;

    img {
        position: absolute;
    }
`;

export default DFAGraph;
