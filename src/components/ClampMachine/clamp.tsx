import React from "react";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

import { clampStore, clampPositionStore, dollStore } from "../../store";

const Clamp = (): React.ReactElement => {
    const [clampPos, setClampPos] = useRecoilState(clampPositionStore);
    const [clampState, setClamp] = useRecoilState(clampStore);
    const [dollState, setDoll] = useRecoilState(dollStore);
    
    const clampSize = 80;

    function grabDoll(isGrabDoll: boolean) { 
        if (isGrabDoll) {
            setClamp((prev) => ({
                ...prev,
                isGrab: true,
                isHave: true,
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

    const onKeyDown = React.useCallback(
        (key: KeyboardEvent) => {
            function setClampPosition(moveX: number = 0, moveY: number = 0) {
                setClampPos((prev) => ({
                    x: prev.x + moveX,
                    y: prev.y + moveY,
                }));
            }

            const clampStep: number = 20;

            switch (key.code) {
                case "KeyD":
                    setClampPosition(clampStep, 0);
                    break;
                case "KeyA":
                    setClampPosition(-clampStep, 0);
                    break;
                case "KeyW":
                    setClampPosition(0, -clampStep);
                    break;
                case "KeyS":
                    setClampPosition(0, clampStep);
                    break;
                case "Space":
                    if (!clampState.isGrab) {
                        grabDoll(isClampGetDoll());
                    }
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
  
    return (
        <motion.div
            className="move"
            style={{ height: clampSize, width: clampSize }}
            animate={clampPos}
        ></motion.div>
    );
};

export default Clamp;
