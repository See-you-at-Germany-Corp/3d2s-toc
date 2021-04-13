import React from "react";
import styled from "styled-components";

// import Xarrow from "react-xarrows";
import { MapInteractionCSS } from "react-map-interaction";

import { useRecoilValue } from "recoil";
import { DFACurrentState } from "../../store/index";

import { DFANode } from "./DFANode";

import dfa_graph from "../../asset/DFA_graph.png";

import { swing, shake } from "../ClampMachine/style";

const DFAGraph: React.FC = () => {
    const currentState = useRecoilValue(DFACurrentState);

    return (
        <Container>
            <HeaderContainer>
                <div className="star star-left"></div>
                <div className="dfa-name">
                    <p>Deterministic&nbsp;</p>
                    <p>Finite Automata</p>
                </div>
                <div className="star star-right"></div>
            </HeaderContainer>
            <MapContainer style={{ width: "calc(100vw - 895px)" }}>
                <MapInteractionCSS>
                    <img src={dfa_graph} alt="dfa-graph" />
                    <DFANode state={currentState} />
                </MapInteractionCSS>
            </MapContainer>
        </Container>
    );
};

const Container = styled.div`
    margin-top: 25px;

    display: flex;
    flex-direction: column;
`;

const HeaderContainer = styled.div`
    height: 200px;
    margin-bottom: 25px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        margin: 0;
        color: white;
        font-size: 5rem;
        text-align: center;
        text-shadow: 4px 4px rgba(0, 0, 0, 0.3);
        font-family: "Miltonian Tattoo", cursive;

        :first-child {
            color: #fafd5f;
        }
    }

    .dfa-name {
        display: flex;
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

    background-color: lightpink;
`;

const MapContainer = styled.div`
    height: 1150px;
    min-width: 400px;
    border-radius: 15px;
    border: 10px #e85f99 solid;

    img {
        top: 0;
        position: absolute;
    }
`;

export default DFAGraph;
