import React from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import Clamp from "./clamp";
import DollGroup from "../Dolls";
import ClampDoll from "../Dolls/clamp_doll";
import CoinBox from "./coin_box";
import ClampBanner from "./clamp_banner";

import TextOverlay from "../TextOverlay";
import GamePopup from "../Popup/Popup";
import Conf from "../Popup/Conf";

import {
    clampStore,
    DFACurrentState,
    displayConfetti,
    DFASelector,
} from "../../store";

import { machineStateData } from "../../types/machineStateData";
import { dollDatas } from "../Dolls/doll_data";

import { MachineContiner } from "./style";
import "./style.css";

const CoinRemain: React.FC = () => {
    const clampState = useRecoilValue(clampStore);
    const coinTextColor = clampState.coin >= 2 ? "limegreen" : "salmon";

    return (
        <div className="coin-remaining-box">
            <p>{`Coin:`}</p>
            <p style={{ color: coinTextColor }}>{`${clampState.coin}/2`}</p>
        </div>
    );
};

const ClampMachine: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const DFACurrent = useRecoilValue(DFACurrentState);
    const [clampState, setClamp] = useRecoilState(clampStore);
    const [display, setDisplay] = useRecoilState(displayConfetti);
    const setDFA = useSetRecoilState(DFASelector);

    React.useEffect(() => {
        if (DFACurrent.id === machineStateData.READY_TO_PLAY) {
            if (!isOpen) setIsOpen(true);
        } else if (isOpen) setIsOpen(false);

        // eslint-disable-next-line
    }, [DFACurrent]);

    function onPopupClose() {
        setDisplay((prev) => ({
            ...prev,
            cycle: false,
        }));
        setClamp((prev) => ({
            ...prev,
            dollType: 0,
        }));
        setDFA("X");
    }

    return (
        <div className="machine-container" style={{ margin: 25 }}>
            <ClampBanner />
            <MachineContiner className="machine">
                <Clamp />
                <ClampDoll />
                <DollGroup />

                <TextOverlay
                    text="Press Spacebar to Start."
                    marginTop={275}
                    isOpen={isOpen}
                    isBlink={true}
                />
                <Conf />
                <GamePopup
                    data={dollDatas[clampState?.dollType]}
                    open={display.cycle}
                    onClose={onPopupClose}
                />
            </MachineContiner>

            <div className="button-box">
                <div className="coin-remaining-container">
                    <div className="coin-img-box"></div>
                    <CoinRemain />
                </div>
                <div className="controller-container"></div>
                <div className="start-container"></div>
            </div>
            <CoinBox />
        </div>
    );
};

export default ClampMachine;
