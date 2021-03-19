import React from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";

import { clampStore, clampPositionStore } from "../../store";

import { dollDatas } from "./doll_data";

const ClampDoll = (): React.ReactElement => {
    const clampState = useRecoilValue(clampStore);
    const clampPos = useRecoilValue(clampPositionStore);
    const dollData = dollDatas[clampState.dollType];

    const clampDollPos = {
        x: clampState.isHave ? clampPos.x - 110 : clampPos.x - 60,
        y: clampState.isHave ? clampPos.y - 110 : clampPos.y - 60,
    };

    return (
        <motion.div
            className="clamp-doll-item"
            style={{
                height: `${clampState.isHave ? 300 : 200}px`,
                width: `${clampState.isHave ? 300 : 200}px`,
                backgroundImage: `url(${dollData?.img})`,
                backgroundSize: "cover",
                transition: `height 1s linear, width 1s linear`,
            }}
            animate={clampDollPos}
        ></motion.div>
    );
};

export default ClampDoll;
