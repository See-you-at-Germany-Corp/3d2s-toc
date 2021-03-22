import _ from "lodash";
import { atom } from "recoil";
import { IClampState, IClampPositionState } from "../types/clamp.types";
import { IDollState } from "../types/doll.types";

const defaultClampPosition: IClampPositionState = {
    x: 0,
    y: 580,
};

const defaultClampState: IClampState = {
    isGrab: false,
    isHave: false,
    dollType: 0,
};

export const clampStore = atom({
    key: "clampStore",
    default: defaultClampState,
});

export const clampPositionStore = atom({
    key: "clampPositionStore",
    default: defaultClampPosition,
});

/* ----------------------------------------------------- */

function randomDollItems(maxDoll: number = 20): number[] {
    let dollItems: number[] = [];
    const maxEmpty = _.random(3, 6);

    for (let i: number = 0, emptyCounter: number = 0; i < maxDoll; i++) {
        if (emptyCounter !== maxEmpty && _.random(0, 4) === 0) {
            dollItems.push(0);
            emptyCounter++;
            continue;
        }
        dollItems.push(_.random(1, 4));
    }

    return dollItems;
}

const defaultDollState: IDollState = {
    dollTypes: randomDollItems(_.random(15, 20)),
};

export const dollStore = atom({
    key: "dollStore",
    default: defaultDollState,
});
