import React, { useEffect } from "react";
import styled from "styled-components";
import { iState } from "../../types/dfa.types";

interface Props {
    state: iState;
}

interface ContainerProps {
    x: number;
    y: number;
}

const DFANode: React.FC<Props> = (props) => {
    useEffect(() => {
        // console.log(props.state);
    }, [props.state]);

    return <Container x={props.state.x} y={props.state.y}></Container>;
};

const Container = styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    border-radius: 50%;

    position: absolute;
    top: ${p => p.y}px;
    left: ${p => p.x}px;

    background-color: brown;
`;

export { DFANode };
