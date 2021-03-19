// import _ from "lodash";
import styled from "styled-components";

export const DollContainer = styled.div`
    background-color: lightpink;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-template-rows: 200px 200px 200px 200px 200px;
    width: 1000px;
    height: 1000px;
`;

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
`;
