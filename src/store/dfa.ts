import { atom, RecoilState, selector } from "recoil";

interface iMachine {
    states: iState[];
    transitions: iTransition[];
}

interface iState {
    id: number;
    name: string;
}

interface iTransition {
    from: number;
    to: number;
    input: string[];
}

const initialMachine: iMachine = {
    states: [
        {
            id: 1,
            name: "IDLE",
        },
        {
            id: 2,
            name: "FIRST COIN",
        },
        {
            id: 3,
            name: "READY TO PLAY",
        },
        {
            id: 4,
            name: "RETURN COIN",
        },
    ],
    transitions: [
        {
            from: 1,
            to: 1,
            input: ["X", "W", "A", "S", "D", "Y"],
        },
        {
            from: 1,
            to: 2,
            input: ["B"],
        },
    ],
};

const DFAMachine = atom({
    key: "DFAMachine",
    default: initialMachine,
});

const DFACurrentState = atom({
    key: "DFAState",
    default: {
        id: 1,
        name: "IDLE",
    },
});

const DFASelector = selector({
    key: "DFASelector",
    get: ({ get }) => get(DFAMachine),
    set: ({ set, get }, input) => {
        const dfa = get(DFAMachine);
        const currentState = get(DFACurrentState);
        const letters = ["X", "W", "A", "S", "D", "Y", "B"];

        if (letters.includes(String(input))) {
            const transition = dfa.transitions.filter(
                (transition) =>
                    transition.input.includes(String(input)) &&
                    transition.from === currentState.id
            )[0];

            if (!transition) return;

            const nextState = dfa.states.filter(
                (state) => state.id === transition.to
            )[0];

            set(DFACurrentState, nextState);
        }
    },
});

export { DFAMachine, DFACurrentState, DFASelector };
