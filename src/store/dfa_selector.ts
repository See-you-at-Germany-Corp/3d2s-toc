import { selector } from "recoil";
import { DFAMachine } from "./dfa_machine";
import { DFACurrentState } from "./dfa_current_state";

const DFASelector = selector({
    key: "DFASelector",
    get: ({ get }) => get(DFACurrentState),
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

export { DFASelector };
