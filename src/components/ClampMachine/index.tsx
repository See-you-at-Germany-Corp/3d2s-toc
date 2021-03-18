import React, { useState } from "react";
import { motion } from "framer-motion";

import DollGroup from "../Dolls";

import "./style.css";

const ClampMachine: React.FC = () => {
    const [clampState, setClamp] = useState({
        position: { x: 0, y: 0 },
        isGrab: false,
        isHave: false,
    });
    const clampSize = 80;

    const onKeyDown = React.useCallback((key: KeyboardEvent) => {
        const clampStep: number = 20;
        switch (key.code) {
            case "KeyD":
                setClamp((prev) => ({
                    ...prev,
                    position: {
                        x: prev.position.x + clampStep,
                        y: prev.position.y,
                    },
                }));
                break;
            case "KeyA":
                setClamp((prev) => ({
                    ...prev,
                    position: {
                        x: prev.position.x - clampStep,
                        y: prev.position.y,
                    },
                }));
                break;
            case "KeyW":
                setClamp((prev) => ({
                    ...prev,
                    position: {
                        x: prev.position.x,
                        y: prev.position.y - clampStep,
                    },
                }));
                break;
            case "KeyS":
                setClamp((prev) => ({
                    ...prev,
                    position: {
                        x: prev.position.x,
                        y: prev.position.y + clampStep,
                    },
                }));
                break;
            case "Space":
                setClamp((prev) => ({
                    ...prev,
                    isGrab: true,
                }));
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
        }
    }, []);

    React.useEffect(() => {
        document.body.addEventListener("keydown", onKeyDown, false);
        return () =>
            document.body.removeEventListener("keydown", onKeyDown, false);
    }, [onKeyDown]);

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
        const { row, col } = getClampArrayPos(clampState.position);
        const dollIndex: number = 5 * row + col;
        // console.log("dollIndex :>> ", dollIndex);
        return dollIndex;
    }

    return (
        <div className="machine">
            <motion.div
                className="move"
                style={{ height: clampSize, width: clampSize }}
                animate={clampState.position}
            ></motion.div>
            <DollGroupMemo
                isGrab={clampState.isGrab}
                isHave={clampState.isHave}
                getDollIndex={getDollIndex}
                setClamp={setClamp}
            />
        </div>
    );
};

interface IDollGroupMemoProps {
    isGrab: boolean;
    isHave: boolean;
    setClamp: Function;
    getDollIndex: Function;
}

const DollGroupMemo = React.memo((props: IDollGroupMemoProps) => {
    console.log("re");
    const { isGrab, isHave, setClamp, getDollIndex } = props;

    function isClampGetDoll(dollTypes: number[]): boolean {
        if (dollTypes[getDollIndex()] === 0) return false;
        else return true;
    } 

    function grabDoll(isGrabDoll: boolean) {
        if (isGrabDoll) {
            setClamp((prev: any) => ({
                ...prev,
                isHave: true,
            }));
        } else {
            setClamp((prev: any) => ({
                ...prev,
                isGrab: false,
                isHave: false,
            }));
        }
    }

    return (
        <DollGroup
            isClampGetDoll={isClampGetDoll}
            getDollIndex={getDollIndex}
            grabDoll={grabDoll}
            isHave={isHave}
            isGrab={isGrab}
        />
    );
});

export default ClampMachine;
