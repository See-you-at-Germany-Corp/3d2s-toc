import React from "react";
import _ from "lodash";
import { useRecoilValue } from 'recoil'

import { IDollData, dollDatas } from "./doll_data";

import { dollStore } from '../../store'

import { DollContainer, DollBox } from "./styles";

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
        >
            {/* <p>{dollData.name}</p> */}
        </DollBox>
    );
};
  
const DollGroup = (): React.ReactElement => { 
    const dollState = useRecoilValue(dollStore);
 
    return (
        <DollContainer>
            {_.map(dollState.dollTypes, (dollType: number, index: number) => {
                const dollData: IDollData = dollDatas[dollType];
                return <Doll key={index} dollID={index} dollData={dollData} />;
            })}
        </DollContainer>
    );
};

export default DollGroup;
