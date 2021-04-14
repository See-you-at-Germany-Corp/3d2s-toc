import React, { memo } from "react";
import styled from "styled-components";
import { iState } from "../../types/dfa.types";

interface Props {
    state: iState;
}

interface ContainerProps {
    x: number;
    y: number;
    size: number;
}

const DFANode: React.FC<Props> = memo((props) => {
    const nodeSize = props.state.isFinal ? 136 : 120;

    return (
        <Container x={props.state.x} y={props.state.y} size={nodeSize}>
            {props.state.id}
        </Container>
    );
});

const Container = styled.div<ContainerProps>`
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
    border-radius: 50%;

    position: absolute;
    top: ${(p) => p.y}px;
    left: ${(p) => p.x}px;
    transition: 0.1s ease-in-out;
    transform: translate(-50%, -50%);

    opacity: 0.5;
    background-color: brown;
`;

export { DFANode };
