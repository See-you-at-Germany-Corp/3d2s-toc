import { atom } from "recoil";
import { iState } from "../types/dfa.types";

const DFACurrentState = atom({
    key: "DFAState",
    default: {
        id: 5,
        name: "READY_TO_GRAB",
        x: 1167,
        y: 410,
    } as iState,
});

export { DFACurrentState };
