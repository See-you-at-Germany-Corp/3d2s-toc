import _ from "lodash";
import styled, { keyframes } from "styled-components";

export const DollContainer = styled.div`
    background-color: lightpink;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-template-rows: 200px 200px 200px 200px 200px;
    width: 1000px;
    height: 1000px;
`;

const randomDeg = `${(_.random(0, 36) * 10) / _.random(2, 9)}deg`; 

const shake = keyframes`
  50% { transform: rotate(${randomDeg})}
}`;

interface IDollBoxProps {
    backgroundImg: string;
    rotateString: string;
}

export const DollBox = styled.div<IDollBoxProps>`
    /* background-color: deepskyblue; */
    background-image: url(${(props: IDollBoxProps) => props.backgroundImg});
    background-size: cover;
    transform: ${(props: IDollBoxProps) => props.rotateString};
    width: 200px;
    height: 200px;
    animation: ${shake} 40s infinite linear;
`;
