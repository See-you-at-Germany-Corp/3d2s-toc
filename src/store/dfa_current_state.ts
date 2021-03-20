import { atom } from "recoil";

const DFACurrentState = atom({
    key: "DFAState",
    // default: {
    //     id: 1,
    //     name: "IDLE",
    // },
    default: {
        id: 5,
        name: "READY TO GRAB",
    },
});

export { DFACurrentState };
