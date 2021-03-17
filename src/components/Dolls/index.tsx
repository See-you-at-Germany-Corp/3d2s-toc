import React from "react";
import _ from "lodash";

import { IDollData, dollDatas } from './doll_data'

import { DollContainer, DollBox } from "./styles";

interface IDollProps {
    dollData: IDollData;
}

const Doll = (props: IDollProps): React.ReactElement => {
    const dollData = props.dollData;

    return (
        <DollBox className="doll-item">
            <p>{dollData.name}</p>
            <img src={dollData.img} alt={dollData.name} />
        </DollBox>
    );
};

function randomDollItems(maxDoll: number = 20): number[] {
    let dollItems: number[] = [];

    for (let i: number = 0; i < maxDoll; i++) {
        dollItems.push(_.random(0, 2));
    }

    return dollItems;
}

const DollGroup = (): React.ReactElement => {
    const [dollState, setDollState] = React.useState({
        items: randomDollItems(_.random(15, 20)),
    });

    // console.log(dollState.items);

    return (
        <DollContainer>
            {/* {_.map(dollState.items, (dollType: number, index: number) => {
                const dollData: IDollData = dollDatas[dollType];
                return <Doll key={index} dollData={dollData} />;
            })} */}
            <h1>Hello from Dolls.</h1>
        </DollContainer>
    );
};

export default DollGroup;
