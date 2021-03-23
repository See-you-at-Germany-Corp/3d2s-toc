import styled from "styled-components";
import { motion } from "framer-motion";

export const MachineContiner = styled.div`
    background: #333333;
    width: 700px;
    height: 700px;
    padding: 50px;
    margin: 25px 25px 0 25px;
    display: flex;
`;

export const CoinBoxContainer = styled.div`
    background: #777777;
    display: flex;
    width: 800px;
    height: 150px;
    margin-left: 25px;
    margin-bottom: 25px;
    align-items: center;
`;

export const CoinHoleContainer = styled(motion.div)`
    background-color: red;
    margin-left: 50px;
    width: 100px;
    height: 150px;
    display: flex;
    flex-flow: row wrap;

    .coin-hole-box {
        background: snow;
        width: 100px;
        height: 80%;
        display: flex;
        justify-content: center;

        .coin-hole {
            background: #222222;
            width: 30%;
            height: 100%;
        }
    }

    .coin-withdraw-box {
        background: deepskyblue;
        width: 100%;
        height: 20%;

        :hover {
            cursor: pointer;
        }

        :active {
            filter: brightness(80%)
        }
    } 
`;

export const CoinContainer = styled(motion.div)`
    /* background-color: red; */
    width: 100px;
    height: 100px;
    display: flex; 

    :hover {
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
`;
