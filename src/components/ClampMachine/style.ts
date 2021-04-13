import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const MachineContiner = styled.div`
    /* background: #333333; */
    width: 700px;
    height: 700px;
    display: flex;
    padding: 30px;
    padding-bottom: 10px;
    border: 20px dashed rgba(0, 225, 255, 0.4);
    border-bottom: 40px solid #333333;

    .coin-remaining-box {
        /* background: red; */
        display: flex;
        position: absolute;
        top: 710px;
        left: 600px;

        p {
            font-size: 2rem;
            padding: 0;
            margin: 5px;
        }
    }
`;

export const CoinBoxContainer = styled.div`
    background: #777777;
    display: flex;
    width: 800px;
    height: 150px;
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
        align-items: center;

        .coin-hole {
            background: #222222;
            width: 20%;
            height: 80%;
        }
    }

    .coin-withdraw-box {
        background: steelblue;
        width: 100%;
        height: 20%;

        :hover {
            cursor: pointer;
        }

        :active {
            filter: brightness(80%);
        }
    }
`;

export const CoinContainer = styled(motion.div)`
    /* background-color: red; */
    background-image: url("https://cdn.discordapp.com/attachments/817783466379968572/823885361872502834/unknown-removebg-preview.png");
    background-size: contain;
    width: 100px;
    height: 100px;
    display: flex;
    z-index: 10;

    :hover {
        cursor: grab;
    }

    :active {
        cursor: grabbing;
    } 
`;

export const swing = keyframes` 
    15% {
        transform: translateX(5px);
    }
    30% {
        transform: translateX(-5px);
    }
    50% {
        transform: translateX(3px);
    }
    65% {
        transform: translateX(-3px);
    }
    80% {
        transform: translateX(2px);
    }
    100% {
        transform: translateX(0);
    } 
`;

export const shake = keyframes`
  50% { transform: rotate(15deg)}
}`;

export const ClampBannerContainer = styled.div`
    background: lightpink;
    display: flex;

    width: 800px;
    height: 200px;

    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;

    .clamp-name {
        display: flex;
        flex-flow: row wrap;
        width: 70%;
        padding-top: 20px;

        justify-content: space-between;

        p {
            color: white;
            text-shadow: 4px 4px rgba(0, 0, 0, 0.3);
            font-size: 5rem;
            font-family: "Miltonian Tattoo", cursive;

            padding: 0;
            margin: 0;
        }

        p:first-child {
            color: #fafd5f;
        }
    }

    .star {
        width: 100px;
        height: 80px;
        background-size: cover;
        align-self: flex-start;
        margin-top: 15px;

        :hover {
            animation: ${shake} 1s infinite ease-in-out;
        }
    }

    .star-left {
        background-image: url("https://cdn.discordapp.com/attachments/817783466379968572/825646803381780480/white_star_group.png");
    }

    .star-right {
        background-image: url("https://cdn.discordapp.com/attachments/817783466379968572/825646807861690388/yellow_star_group.png");
    }

    :hover {
        p {
            animation: ${swing} 1s;
        }
    }
`;
