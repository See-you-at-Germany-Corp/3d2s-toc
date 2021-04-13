import React from "react";
import _ from "lodash";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import Grabber from "./Graber.png";
import GrabberGrab from "./GraberGrab.png";

import {
    clampStore,
    clampPositionStore,
    dollStore,
    DFACurrentState,
    DFASelector,
    displayConfetti,
    isMStateStore,
} from "../../store";

import { machineStateData } from "../../types/machineStateData";
import { DFADisableKeyLists } from "./clamp_data";

import { machineInput } from "../../types/machine.type";

interface IBackwardInput {
    x: string[];
    y: string[];
}

const Clamp = (): React.ReactElement => {
    const [clampPos, setClampPos] = useRecoilState(clampPositionStore);
    const [clampState, setClamp] = useRecoilState(clampStore);
    const [dollState, setDoll] = useRecoilState(dollStore);
    const [movingDown, setMovingDown] = React.useState(false);

    const DFACurrent = useRecoilValue(DFACurrentState);
    const setDFA = useSetRecoilState(DFASelector);
    const setDisplay = useSetRecoilState(displayConfetti);
    const [isMStateChange, setIsMStateChange] = useRecoilState(isMStateStore);

    const [backwardInput, setBackwardInput] = React.useState<IBackwardInput>({
        x: [],
        y: [],
    });

    const machineSize = 700;
    const clampSize: number = 120;
    const clampStep: number = 20;

    function backwardCalculate(): IBackwardInput {
        const { row, col } = getClampArrayPos(clampPos, clampSize);

        const backwardXAmount = (col + 1) * 8;
        const backwardYAmount = (4 - row + 1) * 8;
        
        let newBackwardX: string[] = [];
        let newBackwardY: string[] = [];

        for (let i: number = 0; i < backwardXAmount; i++)
            newBackwardX.push("A");

        for (let j: number = 0; j < backwardYAmount; j++)
            newBackwardY.push("S");

        return {
            x: newBackwardX,
            y: newBackwardY,
        };
    }

    function grabDoll(isGrabDoll: boolean) {
        setBackwardInput(backwardCalculate());
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

    function getClampArrayPos(
        clampPos: { x: number; y: number },
        clampSize: number = 120,
        dollSize: number = 120
    ): { row: number; col: number } {
        const machinePadding: number = 50;

        const col: number = Math.floor(
            (clampPos.x - machinePadding + clampSize - clampSize / 2) / dollSize
        );

        const row: number = Math.floor(
            (clampPos.y - machinePadding + clampSize - clampSize / 2) / dollSize
        );

        return {
            row,
            col,
        };
    }

    function getDollIndex(): number {
        const { row, col } = getClampArrayPos(clampPos, clampSize);
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

    function setClampPosition(moveX: number = 0, moveY: number = 0) {
        function isClampCanMove(input: machineInput): boolean {
            const position = clampPos;
            let isCanmove = true;

            switch (input) {
                case "W": {
                    if (position.y + clampSize < 140) isCanmove = false;
                    break;
                }
                case "A": {
                    if (position.x + clampSize < 140) isCanmove = false;
                    break;
                }
                case "S": {
                    if (position.y - clampSize > machineSize - 260)
                        isCanmove = false;
                    break;
                }
                case "D": {
                    if (position.x - clampSize > machineSize - 260)
                        isCanmove = false;
                    break;
                }
            }
            return isCanmove;
        }
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

    function moveClampToStart() {
        const lenArrayX = backwardInput.x.length;
        const lenArrayY = backwardInput.y.length;

        if (lenArrayY > 0) {
            setTimeout(() => {
                setBackwardInput((prev) => ({
                    ...prev,
                    y: _.take(prev.y, lenArrayY - 1),
                }));
                inputToDFA("S");
            }, 40);
        } else if (lenArrayX > 0) {
            setTimeout(() => {
                setBackwardInput((prev) => ({
                    ...prev,
                    x: _.take(prev.x, lenArrayX - 1),
                }));
                inputToDFA("A");
            }, 40);
        } else {
            inputToDFA("B");
        }
    }

    const onKeyDown = React.useCallback(
        (key: KeyboardEvent) => {
            switch (key.code) {
                case "KeyW":
                    if (!DFADisableKeyLists.includes(DFACurrent.id))
                        inputToDFA("W");
                    break;
                case "KeyA":
                    if (!DFADisableKeyLists.includes(DFACurrent.id))
                        inputToDFA("A");
                    break;
                case "KeyS":
                    if (!DFADisableKeyLists.includes(DFACurrent.id))
                        inputToDFA("S");
                    break;
                case "KeyD":
                    if (!DFADisableKeyLists.includes(DFACurrent.id))
                        inputToDFA("D");
                    break;
                case "Space":
                    if (!DFADisableKeyLists.includes(DFACurrent.id))
                        inputToDFA("X");
                    break;
                default:
                    break;
            }
        },
        // eslint-disable-next-line
        [clampState, clampPos, DFACurrent.id]
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
                case machineStateData.IDLE: {
                    if (clampState.dollType !== 0)
                        setClamp((prev) => ({
                            ...prev,
                            dollType: 0,
                        }));
                    break;
                }
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
                    setMovingDown(true);
                    setTimeout(inputToDFA, 500, "B");
                    break;
                }
                case machineStateData.GRAB: {
                    setMovingDown(false);
                    if (!clampState.isGrab) {
                        grabDoll(isClampGetDoll());
                    }
                    setTimeout(inputToDFA, 500, "B");
                    break;
                }
                case machineStateData.MOVE_UP_GRAB: {
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
                        inputToDFA("B");
                    }, 400);
                    // setTimeout(inputToDFA, 1400, "B");
                    break;
                }
                case machineStateData.RESULT: {
                    /// tricker result popup here.
                    setDisplay({ display: true, cycle: true });
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
            style={{
                height: clampSize,
                width: clampSize,
                scale: `${movingDown ? 0.6 : 1}`,
                transition: `${
                    movingDown
                        ? "transform 0.5s linear"
                        : clampState.isGrab
                        ? "transform 5ms linear"
                        : ""
                }`,
            }}
            animate={clampPos}
        >
            <img
                src={clampState.isHave ? GrabberGrab : Grabber}
                style={{ height: "100%", width: "100%" }}
                alt={""}
            />
        </motion.div>
    );
};

export default Clamp;
