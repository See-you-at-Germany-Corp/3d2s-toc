import React, { useEffect } from "react";
import styled from "styled-components";
import Xarrow from "react-xarrows";
import { MapInteractionCSS } from "react-map-interaction";
import { useRecoilSnapshot, useRecoilState } from "recoil";
import { DFACurrentState, DFASelector } from "../../store/index";

interface iMachine {
    currentStateId: number;
    states: iState[];
    transitions: iTransition[];
}

interface iState {
    id: number;
    name: string;
}

interface iTransition {
    from: number;
    to: number;
    input: string[];
}

const machine: iMachine = {
    currentStateId: 199,
    states: [
        {
            id: 1,
            name: "IDLE",
        },
        {
            id: 2,
            name: "FIRST COIN",
        },
        {
            id: 3,
            name: "READY TO PLAY",
        },
    ],
    transitions: [
        {
            from: 1,
            to: 1,
            input: ["X", "W", "A", "S", "D", "Y"],
        },
        {
            from: 1,
            to: 2,
            input: ["B"],
        },
    ],
};

const stateTransition = (machine: iMachine, input: string) => {
    const newMachine = { ...machine };

    const transition = newMachine.transitions.filter(
        (transition) =>
            transition.input.includes(input) &&
            transition.from === machine.currentStateId
    )[0];

    const nextState = newMachine.states.filter(
        (state) => state.id === transition.to
    )[0];

    console.log(newMachine.currentStateId, nextState.id);
    console.log((newMachine.currentStateId = transition.to));
};

const DFAGraph: React.FC = () => {
    const [currentState, _] = useRecoilState(DFACurrentState);
    const [dfaSelector, setDFASelector] = useRecoilState(DFASelector);

    useEffect(() => {}, []);

    return (
        <Container>
            <MapInteractionCSS></MapInteractionCSS>
            <button onClick={() => setDFASelector("B")}>
                {currentState.id}
            </button>
        </Container>
    );
};

const Container = styled.div`
    width: 500px;
    height: 500px;

    display: flex;
    background-color: blanchedalmond;
    justify-content: space-between;
`;

export default DFAGraph;
