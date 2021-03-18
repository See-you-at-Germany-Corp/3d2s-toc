import React from "react";
import _ from "lodash";

import { IDollData, dollDatas } from "./doll_data";

import { DollContainer, DollBox } from "./styles";

interface IDollGroupProps {
    isClampGetDoll: Function;
    getDollIndex: Function;
    grabDoll: Function;
    isGrab: boolean;
    isHave: boolean;
}

interface IDollProps {
    dollData: IDollData;
    dollID: number;
}

const Doll = (props: IDollProps): React.ReactElement => {
    const dollData = props.dollData;

    return (
        <DollBox className="doll-item" backgroundImg={`${dollData.img}`}>
            {/* <p>{dollData.name}</p> */}
        </DollBox>
    );
};

const DollGroup = (props: IDollGroupProps): React.ReactElement => {
    function randomDollItems(maxDoll: number = 20): number[] {
        let dollItems: number[] = [];
        const maxEmpty = _.random(3, 6);

        for (let i: number = 0, emptyCounter: number = 0; i < maxDoll; i++) {
            if (emptyCounter !== maxEmpty && _.random(0, 1) === 0) {
                dollItems.push(0);
                emptyCounter++;
                continue;
            }
            dollItems.push(_.random(1, 4));
        }

        return dollItems;
    }

    function isGetDoll(
        dollIndex: number,
        currentIndex: number,
        isGrab: boolean,
        isClampGetDoll: Function
    ): boolean {
        if (
            dollIndex === currentIndex &&
            isGrab &&
            isClampGetDoll(dollState.dollTypes)
        )
            return true;
        else return false;
    }

    const [dollState] = React.useState({
        dollTypes: randomDollItems(_.random(15, 20)),
    });

    // console.log(props.isClampGetDoll(dollState.dollTypes));
    // console.log(props.getDollIndex(dollState.dollTypes));

    return (
        <DollContainer>
            {_.map(dollState.dollTypes, (dollType: number, index: number) => {
                const dollData: IDollData = dollDatas[dollType];
                // console.log('props.getDollIndex :>> ', props.getDollIndex());
                // console.log("index :>> ", index);
                const isHaveDoll =
                    !props.isHave &&
                    isGetDoll(
                        props.getDollIndex(),
                        index,
                        props.isGrab,
                        props.isClampGetDoll
                    );

                // props.grabDoll(isGrab);/

                if (isHaveDoll) {
                    dollState.dollTypes[index] = 0;
                    props?.grabDoll(true);
                }

                return <Doll key={index} dollID={index} dollData={dollData} />;
            })}
        </DollContainer>
    );
};

export default DollGroup;
