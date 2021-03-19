import React from "react"; 

import Clamp from "./clamp";
import DollGroup from "../Dolls";

import "./style.css";

const ClampMachine: React.FC = () => {
    return (
        <div className="machine">
            <Clamp />
            <DollGroup />
        </div>
    );
};

export default ClampMachine;
