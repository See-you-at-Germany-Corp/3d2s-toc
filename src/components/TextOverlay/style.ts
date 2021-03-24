import styled, { keyframes } from "styled-components";

interface ITextOLProps {
    isBlink: boolean;
}

const blink = keyframes`
    0% { opacity: 0.5 }
    25% { opacity: 0 }
    50% { opacity: 0.5 }
    75% { opacity: 1 } 
    100% { opacity: 1 } 
`;

export const TextOverlayContainer = styled.div<ITextOLProps>`
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    position: absolute;
    z-index: 99;
    width: 700px;
    text-align: center;
    padding: 20px 0;

    .text {
        color: #ffffff;
        text-shadow: 4px 4px rgba(0, 0, 0, 0.9);
        font-size: 3.5rem;
        padding: 0;
        margin: 0;
        animation: ${blink} 2s infinite linear;
    }
`;
