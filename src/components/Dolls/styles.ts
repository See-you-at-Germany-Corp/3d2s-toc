import _ from "lodash";
import styled, { keyframes } from "styled-components";

export const DollContainer = styled.div`
    /* background-color: lightpink; */
    background: #fbfbfb;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-template-rows: 120px 120px 120px 120px 120px;
    width: 600px;
    height: 600px;
    padding: 50px;
`;

const randomDeg = `${(_.random(0, 36) * 10) / _.random(2, 9)}deg`;

const shake = keyframes`
  50% { transform: rotate(${randomDeg})}
}`;

const expand = keyframes`
  50% { transform: scale(1.75) }
}`;

interface IDollBoxProps {
    backgroundImg?: string;
    rotateString?: string;
}

export const DollBox = styled.div<IDollBoxProps>`
    /* background-color: deepskyblue; */
    background-image: url(${(props: IDollBoxProps) => props.backgroundImg});
    background-size: cover;
    transform: ${(props: IDollBoxProps) => props.rotateString};
    width: 120px;
    height: 120px;
    animation: ${shake} 40s infinite linear;

    :hover {
        animation: ${expand} 2s infinite ease-in-out;
        transform: none;
        z-index: 10;
    }
`;
