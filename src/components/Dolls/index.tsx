import React from "react";
import _ from "lodash";

import { DollContainer, DollBox } from "./styles";

interface IDollData {
    id: number;
    name: string;
    img: string;
}

interface IDollProps {
    dollData: IDollData;
}

const dollDatas: IDollData[] = [
    {
        id: 1,
        name: "doll_1",
        img:
            "https://cdn.discordapp.com/attachments/817783466379968572/821678430792974346/pngtree-cartoon-bear-doll-image_1325813-removebg-preview.png",
    },
    {
        id: 2,
        name: "doll_2",
        img:
            "https://cdn.discordapp.com/attachments/817783466379968572/821678430792974346/pngtree-cartoon-bear-doll-image_1325813-removebg-preview.png",
    },
    {
        id: 3,
        name: "doll_3",
        img:
            "https://cdn.discordapp.com/attachments/817783466379968572/821678430792974346/pngtree-cartoon-bear-doll-image_1325813-removebg-preview.png",
    },
];

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

    console.log(dollState.items);

    return (
        <DollContainer>
            {_.map(dollState.items, (dollType: number, index: number) => {
                const dollData: IDollData = dollDatas[dollType];
                return <Doll key={index} dollData={dollData} />;
            })}
            <h1>Hello from Dolls.</h1>
        </DollContainer>
    );
};

export default DollGroup;
