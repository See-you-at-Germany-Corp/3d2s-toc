import { atom } from "recoil";
import { iState } from "../types/dfa.types";

const DFACurrentState = atom({
    key: "DFAState",
    default: {
        id: 1,
        name: "IDLE",
        x: 177.5,
        y: 527.5,
        isFinal: true,
    } as iState,
});

export { DFACurrentState };
