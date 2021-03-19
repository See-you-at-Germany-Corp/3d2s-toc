import React from "react";
import _ from "lodash";

import { IDollData } from "./doll_data";

import { DollBox } from "./styles";

interface IDollProps {
    dollData: IDollData;
    dollID: number;
}

const Doll = (props: IDollProps): React.ReactElement => {
    const dollData = props.dollData;
    const rotateString = React.useRef(`rotate(${_.random(0, 36) * 10}deg)`);

    return (
        <DollBox
            className="doll-item" 
            rotateString={rotateString.current}
            backgroundImg={`${dollData.img}`}
        ></DollBox>
    );
};

export default Doll;
