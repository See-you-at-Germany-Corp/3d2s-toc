import { atom } from "recoil";
import { iState } from "../types/dfa.types";

const DFACurrentState = atom({
    key: "DFAState",
    default: {
        id: 1,
        name: "IDLE",
        x: 216,
        y: 410,
    } as iState,
});

export { DFACurrentState };
