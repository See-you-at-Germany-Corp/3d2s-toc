import React from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import Clamp from "./clamp";
import DollGroup from "../Dolls";
import ClampDoll from "../Dolls/clamp_doll";
import CoinBox from "./coin_box";

import TextOverlay from "../TextOverlay";

import { clampStore, DFACurrentState, displayConfetti, DFASelector } from "../../store";

import { machineStateData } from '../../types/machineStateData';

import { MachineContiner } from "./style";
import "./style.css";
import GamePopup from "../Popup/Popup";
import { dollDatas } from '../Dolls/doll_data';
import Conf from "../Popup/Conf";




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
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    
    const DFACurrent = useRecoilValue(DFACurrentState);
    const [clampState,setClamp] = useRecoilState(clampStore);
    const [display, setDisplay] = useRecoilState(displayConfetti);
    const setDFA = useSetRecoilState(DFASelector);

    React.useEffect(() => {
        switch (DFACurrent.id) {
            case machineStateData.READY_TO_PLAY: {
                if (!isOpen) setIsOpen(true);
                break;
            }
            case machineStateData.READY_TO_GRAB: {
                if (isOpen) setIsOpen(false);
                break;
            }
            default:
                break;
        }
    }, [DFACurrent, isOpen]);

    return (

        <div className="machine-container">
            <MachineContiner className="machine">
                <Clamp />
                <ClampDoll />
                <DollGroup />
                <CoinRemain />
                <TextOverlay
                    text="Press Spacebar to Start."
                    top={380}
                    left={75}
                    isOpen={isOpen}
                    isBlink={true}
                />
                <Conf />
                <GamePopup data={dollDatas[clampState?.dollType]} open={display.cycle} 
                onClose={
                    () => {
                        setDisplay(
                            (prev) => ({ 
                                ...prev ,
                                cycle: false,
                            })
                        )
                        setDFA("X")
                        setClamp((prev) => ({
                            ...prev,
                            dollType: 0,
                        }));
                        }  
                    }/>
            </MachineContiner>

            <div className="button-box"></div>
            <CoinBox />
        </div>
    );
};

export default ClampMachine;
