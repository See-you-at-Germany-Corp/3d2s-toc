import React from "react";
import _ from "lodash";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import Grabber from './Graber.png';
import GrabberGrab from './GraberGrab.png';

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
    const [movingDown, setMovingDown] = React.useState(false);

    const DFACurrent = useRecoilValue(DFACurrentState);
    const setDFA = useSetRecoilState(DFASelector);

    const [isMStateChange, setIsMStateChange] = React.useState<boolean>(false);
    const [backwardInput, setBackwardInput] = React.useState<IBackwardInput>({
        x: [],
        y: [],
    });

    const machineSize = 1000;
    const clampSize: number = 200;
    const clampStep: number = 20;

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

    function getClampArrayPos(
        clampPos: { x: number; y: number },
        clampSize: number = 80,
        dollSize: number = 200
    ): { row: number; col: number } {
        const col: number = Math.floor(
            (clampPos.x + clampSize - clampSize / 2) / dollSize
        );
        const row: number = Math.floor(
            (clampPos.y + clampSize - clampSize / 2) / dollSize
        );

        return {
            row,
            col,
        };
    }

    function getDollIndex(): number {
        const { row, col } = getClampArrayPos(clampPos);
        const dollIndex: number = 5 * row + col;
        // console.log("dollIndex :>> ", dollIndex);
        return dollIndex;
    }

    function isHaveDoll(): boolean {
        if (dollState.dollTypes[getDollIndex()] === 0) return false;
        else return true;
    }

    function isClampGetDoll(): boolean {
        if (isHaveDoll() && !clampState.isGrab) return true;
        else return false;
    }

    function isClampCanMove(input: machineInput): boolean {
        const position = clampPos;
        let isCanmove = true;

        switch (input) {
            case "W": {
                if (position.y + clampSize < 150) isCanmove = false;
                break;
            }
            case "A": {
                if (position.x + clampSize < 150) isCanmove = false;
                break;
            }
            case "S": {
                if (position.y - clampSize > machineSize - clampSize - 100)
                    isCanmove = false;
                break;
            }
            case "D": {
                if (position.x - clampSize > machineSize - clampSize - 100)
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
        function getNewBackwardInput(): IBackwardInput {
            let newBackwardInputX = [...backwardInput.x];
            let newBackwardInputY = [...backwardInput.y];
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

        setDFA(input);
        if (isClampCanMove(input)) setBackwardInput(getNewBackwardInput());
        setIsMStateChange(true);
    }

    const onKeyDown = React.useCallback(
        (key: KeyboardEvent) => {
            switch (key.code) {
                case "KeyW":
                    inputToDFA("W");
                    break;
                case "KeyA":
                    inputToDFA("A");
                    break;
                case "KeyS":
                    inputToDFA("S");
                    break;
                case "KeyD":
                    inputToDFA("D");
                    break;
                case "Space":
                    inputToDFA("X");
                    break;
                case "KeyX":
                    setClamp((prev) => ({
                        ...prev,
                        isGrab: false,
                    }));
                    break;
                case "KeyZ":
                    setClamp((prev) => ({
                        ...prev,
                        isGrab: false,
                        isHave: false,
                    }));
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
                    setMovingDown(true)
                    setTimeout(() => {
                        inputToDFA("B");
                    }, 500);
                    break;
                }
                case machineStateData.GRAB: {
                    setMovingDown(false)
                    if (!clampState.isGrab) {
                        grabDoll(isClampGetDoll());
                    }
                    break;
                }
                case machineStateData.RELEASE: {
                    setClamp((prev) => ({
                        ...prev,
                        isGrab: false,
                        isHave: false,
                    }));
                    break;
                }
                default:
                    break;
            }

        // eslint-disable-next-line
    }, [isMStateChange]);

    // console.log("DFACurrent.name :>> ", DFACurrent.name);
    // console.log("backwardInput :>> ", backwardInput);

    return (
        <motion.div 
            className="move"
            style={{
                height: clampSize,
                width: clampSize ,
                scale : `${movingDown ? 0.4 : 1}`,
                transition: `${movingDown ? 'transform 0.5s linear' : clampState.isGrab ? 'transform 0.5s linear' : ''}`,
            }}
            animate={clampPos}
        >
            <img src={clampState.isHave ? GrabberGrab : Grabber} style={{height:'100%', width: '100%'}} alt={""} />
        </motion.div>
    );
};

export default Clamp;
