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
        x: clampState.isHave ? clampPos.x - 60 : clampPos.x - 20,
        y: clampState.isHave ? clampPos.y - 60 : clampPos.y - 20,
    };

    return (
        <motion.div
            className="clamp-doll-item"
            style={{
                height: `${clampState.isHave ? 200 : 120}px`,
                width: `${clampState.isHave ? 200 : 120}px`,
                backgroundImage: `url(${dollData?.img})`,
                backgroundSize: "cover",
                transition: `height 1s linear, width 1s linear`,
            }}
            animate={clampDollPos}
        ></motion.div>
    );
};

export default ClampDoll;
