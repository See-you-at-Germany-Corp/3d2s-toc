import React from "react";  

import Clamp from "./clamp";
import DollGroup from "../Dolls";
import ClampDoll from '../Dolls/clamp_doll'

import "./style.css";

const ClampMachine: React.FC = () => { 
    return (
        <div className="machine">
            <Clamp />
            <ClampDoll />
            <DollGroup />
        </div>
    );
};

export default ClampMachine;
