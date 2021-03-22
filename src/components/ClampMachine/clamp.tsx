import React from "react";
import _ from "lodash";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";

import {
    clampStore,
    clampPositionStore,
    dollStore,
    DFACurrentState,
    DFASelector,
} from "../../store";

import { machineStateData } from "../../types/machineStateData";

import { machineInput } from "../../types/machine.type";

interface IBackwardInput {
    x: string[];
    y: string[];
}

const Clamp = (): React.ReactElement => {
    const [clampPos, setClampPos] = useRecoilState(clampPositionStore);
    const [clampState, setClamp] = useRecoilState(clampStore);
    const [dollState, setDoll] = useRecoilState(dollStore);

    const DFACurrent = useRecoilValue(DFACurrentState);
    const setDFA = useSetRecoilState(DFASelector);

    const [isMStateChange, setIsMStateChange] = React.useState<boolean>(false);
    const [backwardInput, setBackwardInput] = React.useState<IBackwardInput>({
        x: [],
        y: [],
    });

    const machineSize = 1000;
    const clampSize: number = 80;
    const clampStep: number = 20;

    const DFADisableKeyLists: number[] = [
        machineStateData.MOVE_DOWN,
        machineStateData.GRAB,
        machineStateData.MOVE_UP_GRAB,
        machineStateData.READY_T0_BACK_GRAB,
        machineStateData.MOVE_BACKKWARD_GRAB,
        machineStateData.MOVE_LEFT_GRAB, 
        machineStateData.RELEASE, 
        machineStateData.RESULT, 
    ];

    function grabDoll(isGrabDoll: boolean) {
        if (isGrabDoll) {
            setClamp((prev) => ({
                ...prev,
                isGrab: true,
                isHave: true,
                dollType: dollState.dollTypes[getDollIndex()],
            }));

            const newDollTypes = _.map(dollState.dollTypes, (doll, index) => {
                if (index === getDollIndex()) return 0;
                else return doll;
            });

            setDoll((prev) => ({
                ...prev,
                dollTypes: newDollTypes,
            }));
        } else {
            setClamp((prev) => ({
                ...prev,
                isGrab: true,
                isHave: false,
            }));
        }
    }

    function getDollIndex(): number {
        function getClampArrayPos(
            clampPos: { x: number; y: number },
            clampSize: number = 80,
            dollSize: number = 200
        ): { row: number; col: number } {
            const machinePadding: number = 100;

            const col: number = Math.floor(
                (clampPos.x - machinePadding + clampSize - clampSize / 2) /
                    dollSize
            );

            const row: number = Math.floor(
                (clampPos.y - machinePadding + clampSize - clampSize / 2) /
                    dollSize
            );

            return {
                row,
                col,
            };
        }

        const { row, col } = getClampArrayPos(clampPos);
        const dollIndex: number = 5 * row + col;
        // console.log("dollIndex :>> ", dollIndex);
        return dollIndex;
    }

    function isClampGetDoll(): boolean {
        function isHaveDoll(): boolean {
            if (dollState.dollTypes[getDollIndex()] === 0) return false;
            else return true;
        }

        if (isHaveDoll() && !clampState.isGrab) return true;
        else return false;
    }

    function isClampCanMove(input: machineInput): boolean {
        const position = clampPos;
        let isCanmove = true;

        switch (input) {
            case "W": {
                if (position.y + clampSize < 200) isCanmove = false;
                break;
            }
            case "A": {
                if (position.x + clampSize < 200) isCanmove = false;
                break;
            }
            case "S": {
                if (position.y - clampSize > machineSize - clampSize)
                    isCanmove = false;
                break;
            }
            case "D": {
                if (position.x - clampSize > machineSize - clampSize)
                    isCanmove = false;
                break;
            }
        }
        return isCanmove;
    }

    function setClampPosition(moveX: number = 0, moveY: number = 0) {
        let input: machineInput = "W";

        if (moveY < 0) input = "W";
        if (moveX < 0) input = "A";
        if (moveY > 0) input = "S";
        if (moveX > 0) input = "D";

        if (isClampCanMove(input)) {
            setClampPos((prev) => ({
                x: prev.x + moveX,
                y: prev.y + moveY,
            }));
        }
    }

    function inputToDFA(input: machineInput) {
        setDFA(input);
        setIsMStateChange(true);
    }

    function inputToDFAAndTrack(input: machineInput) {
        function getNewBackwardInput(): IBackwardInput {
            let newBackwardInputX = _.clone(backwardInput.x);
            let newBackwardInputY = _.clone(backwardInput.y);
            const lastItemX = _.last(newBackwardInputX);
            const lastItemY = _.last(newBackwardInputY);

            if (newBackwardInputX.length === 0 && ["A", "D"].includes(input)) {
                newBackwardInputX.push(input);
            }
            if (newBackwardInputY.length === 0 && ["W", "S"].includes(input))
                newBackwardInputY.push(input);
            if (
                newBackwardInputX.length !== 0 ||
                newBackwardInputY.length !== 0
            )
                switch (input) {
                    case "W": {
                        if (lastItemY === "S")
                            newBackwardInputY = _.dropRight(newBackwardInputY);
                        if (lastItemY === "W") newBackwardInputY.push("W");
                        break;
                    }
                    case "A": {
                        if (lastItemX === "D")
                            newBackwardInputX = _.dropRight(newBackwardInputX);
                        if (lastItemX === "A") newBackwardInputX.push("A");
                        break;
                    }
                    case "S": {
                        if (lastItemY === "W")
                            newBackwardInputY = _.dropRight(newBackwardInputY);
                        if (lastItemY === "S") newBackwardInputY.push("S");
                        break;
                    }
                    case "D": {
                        if (lastItemX === "A")
                            newBackwardInputX = _.dropRight(newBackwardInputX);
                        if (lastItemX === "D") newBackwardInputX.push("D");
                        break;
                    }
                }
            return {
                x: newBackwardInputX,
                y: newBackwardInputY,
            };
        }
 
        if (!DFADisableKeyLists.includes(DFACurrent.id)) { 
            if (isClampCanMove(input)) setBackwardInput(getNewBackwardInput());
            inputToDFA(input);
        }
    }

    function moveClampToStart() {
        const lenArrayX = backwardInput.x.length;
        const lenArrayY = backwardInput.y.length;

        if (lenArrayY > 0) {
            setTimeout(inputToDFA, 40, "S");
            setBackwardInput((prev) => ({
                ...prev,
                y: _.take(prev.y, lenArrayY - 1),
            }));
        } else if (lenArrayX > 0) {
            setTimeout(inputToDFA, 40, "A");
            setBackwardInput((prev) => ({
                ...prev,
                x: _.take(prev.x, lenArrayX - 1),
            }));
        } else {
            inputToDFA("B");
        }
    }

    const onKeyDown = React.useCallback(
        (key: KeyboardEvent) => {
            switch (key.code) {
                case "KeyW":
                    inputToDFAAndTrack("W");
                    break;
                case "KeyA":
                    inputToDFAAndTrack("A");
                    break;
                case "KeyS":
                    inputToDFAAndTrack("S");
                    break;
                case "KeyD":
                    inputToDFAAndTrack("D");
                    break;
                case "Space":
                    inputToDFA("X");
                    break; 
                default:
                    break;
            }
        },
        // eslint-disable-next-line
        [clampState.isGrab, clampState.isHave, clampPos]
    );

    React.useEffect(() => {
        document.body.addEventListener("keydown", onKeyDown, false);
        return () =>
            document.body.removeEventListener("keydown", onKeyDown, false);
    }, [onKeyDown]);

    React.useEffect(() => {
        setIsMStateChange(false);
        if (isMStateChange)
            switch (DFACurrent.id) {
                case machineStateData.MOVE_FORWARD: {
                    setClampPosition(0, -clampStep);
                    break;
                }
                case machineStateData.MOVE_LEFT: {
                    setClampPosition(-clampStep, 0);
                    break;
                }
                case machineStateData.MOVE_BACKWARD: {
                    setClampPosition(0, clampStep);
                    break;
                }
                case machineStateData.MOVE_RIGHT: {
                    setClampPosition(clampStep, 0);
                    break;
                }
                case machineStateData.MOVE_DOWN: {
                    setTimeout(() => {
                        inputToDFA("B");
                    }, 500);
                    break;
                }
                case machineStateData.GRAB: {
                    if (!clampState.isGrab) {
                        grabDoll(isClampGetDoll());
                    }
                    setTimeout(() => {
                        inputToDFA("B");
                    }, 500);
                    break;
                }
                case machineStateData.MOVE_UP_GRAB: {
                    setTimeout(() => {
                        inputToDFA("B");
                    }, 500);
                    break;
                }
                case machineStateData.READY_T0_BACK_GRAB: {
                    moveClampToStart();
                    break;
                }
                case machineStateData.MOVE_LEFT_GRAB: {
                    moveClampToStart();
                    setClampPosition(-clampStep, 0);
                    break;
                }
                case machineStateData.MOVE_BACKKWARD_GRAB: {
                    moveClampToStart();
                    setClampPosition(0, clampStep);
                    break;
                }
                case machineStateData.RELEASE: {
                    setTimeout(() => {
                        setClamp((prev) => ({
                            ...prev,
                            isGrab: false,
                            isHave: false,
                        }));
                    }, 400);
                    setTimeout(inputToDFA, 1400, "B");
                    break;
                }
                case machineStateData.RESULT: {
                    /// tricker result popup here. 
                    alert("เต้น่ารัก");
                    break;
                }

                default:
                    break;
            }

        // eslint-disable-next-line
    }, [isMStateChange, backwardInput, DFACurrent.id]);
  
    return (
        <motion.div
            className="move"
            style={{ height: clampSize, width: clampSize }}
            animate={clampPos}
        ></motion.div>
    );
};

export default Clamp;
