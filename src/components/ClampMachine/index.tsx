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
    isMStateStore,
} from "../../store";

import { machineStateData } from "../../types/machineStateData";
import { machineInput } from "../../types/machine.type";
import { dollDatas } from "../Dolls/doll_data";
import { DFADisableKeyLists } from "./clamp_data";

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

const ControlBox: React.FC = () => {
    const DFACurrent = useRecoilValue(DFACurrentState);
    const setDFA = useSetRecoilState(DFASelector);
    const setIsMStateChange = useSetRecoilState(isMStateStore);

    function inputToDFA(input: machineInput) {
        function isDFACurrentStateAccept(
            input: machineInput,
            acceptedStringID: number
        ): boolean {
            let isAccept = false;

            switch (acceptedStringID) {
                case 1: {
                    if (input === "B") isAccept = true;
                    break;
                }
                case 2: {
                    if (input === "B" || input === "Y") isAccept = true;
                    break;
                }
                case 3: {
                    if (input === "X" || input === "Y") isAccept = true;
                    break;
                }
                case 4: {
                    if (input !== "B" && input !== "Y") isAccept = true;
                    break;
                }
                case 5: {
                    if (input === "A" || input === "S" || input === "B")
                        isAccept = true;
                    break;
                }
                case 6: {
                    if (input === "X") isAccept = true;
                    break;
                }
                default:
                    break;
            }

            return isAccept;
        }

        if (!DFADisableKeyLists.includes(DFACurrent.id)) {
            if (isDFACurrentStateAccept(input, DFACurrent.acceptedStringID)) {
                setDFA(input);
                setIsMStateChange(true);
            }
        }
    }

    return (
        <>
            <div className="controller-container">
                <div className="grid">
                    <div className="empty"></div>
                    <div
                        className="arrow up"
                        onMouseDown={() => inputToDFA("W")}
                    ></div>
                    <div className="empty"></div>
                    <div
                        className="arrow left"
                        onMouseDown={() => inputToDFA("A")}
                    ></div>
                    <div className="empty"></div>
                    <div
                        className="arrow right"
                        onMouseDown={() => inputToDFA("D")}
                    ></div>
                    <div className="empty"></div>
                    <div
                        className="arrow down"
                        onMouseDown={() => inputToDFA("S")}
                    ></div>
                    <div className="empty"></div>
                </div>
            </div>
            <div className="start-container">
                <div
                    className="start"
                    onMouseDown={() => inputToDFA("X")}
                ></div>
                <h1>Start/Grab</h1>
            </div>
        </>
    );
};

const ClampMachine: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const DFACurrent = useRecoilValue(DFACurrentState);
    const setDFA = useSetRecoilState(DFASelector);
    const [clampState, setClamp] = useRecoilState(clampStore);
    const [display, setDisplay] = useRecoilState(displayConfetti);

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
                <ControlBox />
            </div>
            <CoinBox />
        </div>
    );
};

export default ClampMachine;
