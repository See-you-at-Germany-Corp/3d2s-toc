import React from "react";
import _ from "lodash";
import { useRecoilValue } from 'recoil'

import Doll from './doll';

import { IDollData, dollDatas } from "./doll_data";

import { dollStore } from '../../store'

import { DollContainer } from "./styles";
 
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
