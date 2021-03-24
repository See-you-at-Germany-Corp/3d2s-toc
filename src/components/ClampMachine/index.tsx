import React from "react";
import { useRecoilValue } from "recoil";

import Clamp from "./clamp";
import DollGroup from "../Dolls";
import ClampDoll from "../Dolls/clamp_doll";
import CoinBox from "./coin_box";

import { clampStore } from "../../store";

import { MachineContiner } from "./style";
import "./style.css";

const CoinRemain: React.FC = () => {
    const clampState = useRecoilValue(clampStore);
    const coinTextColor = clampState.coin >= 2 ? "limegreen" : "salmon";
    return (
        <div className="coin-remaining-box">
            <p>{`Coin:`}</p>
            <p style={{ color: coinTextColor }}>{`${clampState.coin} / 2`}</p>
        </div>
    );
}

const ClampMachine: React.FC = () => { 
    return (
        <div className="machine-container">
            <MachineContiner className="machine">
                <Clamp />
                <ClampDoll />
                <DollGroup />
                <CoinRemain />
            </MachineContiner>

            <CoinBox />
        </div>
    );
};

export default ClampMachine;
