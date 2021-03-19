import { atom } from "recoil";

const DFACurrentState = atom({
    key: "DFAState",
    default: {
        id: 1,
        name: "IDLE",
    },
});

export { DFACurrentState };
