import React from "react";

import Clamp from "./clamp";
import DollGroup from "../Dolls";
import ClampDoll from "../Dolls/clamp_doll";
import CoinBox from "./coin_box";

import { MachineContiner } from "./style";
import "./style.css";

const ClampMachine: React.FC = () => {
    return (
        <div className="machine-container">
            <MachineContiner className="machine">
                <Clamp />
                <ClampDoll />
                <DollGroup />
            </MachineContiner>

            <CoinBox />
        </div>
    );
};

export default ClampMachine;
