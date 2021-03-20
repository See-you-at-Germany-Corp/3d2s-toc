import { atom } from "recoil";

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
        {
            id: 5,
            name: "READY TO GRAB",
        },
        {
            id: 6,
            name: "MOVING FORWARD",
        },
        {
            id: 7,
            name: "MOVING RIGHT",
        },
        {
            id: 8,
            name: "MOVING LEFT",
        },
        {
            id: 9,
            name: "MOVING BACKWARD",
        },
        {
            id: 10,
            name: "MOVING DOWN",
        },
        {
            id: 11,
            name: "GRAB",
        },
        {
            id: 12,
            name: "MOVING UP (GRAB)",
        },
        {
            id: 13,
            name: "READY T0 BACK (GRAB)",
        },
        {
            id: 14,
            name: "MOVING BACKKWARD (GRAB)",
        },
        {
            id: 15,
            name: "MOVING LEFT (GRAB)",
        },
        {
            id: 16,
            name: "RELEASE",
        },
        {
            id: 17,
            name: "RESULT",
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
        {
            from: 2,
            to: 2,
            input: ["X", "W", "A", "S", "D"],
        },
        {
            from: 2,
            to: 3,
            input: ["B"],
        },
        {
            from: 2,
            to: 4,
            input: ["Y"],
        },
        {
            from: 3,
            to: 3,
            input: ["B", "W", "A", "S", "D"],
        },
        {
            from: 3,
            to: 4,
            input: ["Y"],
        },
        {
            from: 3,
            to: 5,
            input: ["B"],
        },
        {
            from: 4,
            to: 1,
            input: ["B"],
        },
        {
            from: 4,
            to: 4,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 5,
            to: 5,
            input: ["B", "Y"],
        },
        {
            from: 5,
            to: 6,
            input: ["W"],
        },
        {
            from: 5,
            to: 7,
            input: ["D"],
        },
        {
            from: 5,
            to: 8,
            input: ["A"],
        },
        {
            from: 5,
            to: 9,
            input: ["S"],
        },
        {
            from: 5,
            to: 10,
            input: ["X"],
        },
        {
            from: 6,
            to: 5,
            input: ["B", "A", "S", "D"],
        },
        {
            from: 6,
            to: 6,
            input: ["W", "Y"],
        },
        {
            from: 6,
            to: 10,
            input: ["X"],
        },
        {
            from: 7,
            to: 5,
            input: ["B", "W", "A", "S"],
        },
        {
            from: 7,
            to: 7,
            input: ["D", "Y"],
        },
        {
            from: 7,
            to: 10,
            input: ["X"],
        },
        {
            from: 8,
            to: 5,
            input: ["B", "W", "S", "D"],
        },
        {
            from: 8,
            to: 8,
            input: ["A", "Y"],
        },
        {
            from: 8,
            to: 10,
            input: ["X"],
        },
        {
            from: 9,
            to: 5,
            input: ["B", "W", "A", "D"],
        },
        {
            from: 9,
            to: 9,
            input: ["S", "Y"],
        },
        {
            from: 9,
            to: 10,
            input: ["X"],
        },
        {
            from: 10,
            to: 10,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 10,
            to: 11,
            input: ["B"],
        },
        {
            from: 11,
            to: 11,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 11,
            to: 12,
            input: ["B"],
        },
        {
            from: 12,
            to: 12,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 12,
            to: 13,
            input: ["B"],
        },
        {
            from: 13,
            to: 13,
            input: ["X", "W", "D", "Y"],
        },
        {
            from: 13,
            to: 14,
            input: ["S"],
        },
        {
            from: 13,
            to: 15,
            input: ["A"],
        },
        {
            from: 13,
            to: 16,
            input: ["B"],
        },
        {
            from: 14,
            to: 14,
            input: ["S"],
        },
        {
            from: 14,
            to: 13,
            input: ["B", "W", "A", "D", "X", "Y"],
        },
        {
            from: 15,
            to: 15,
            input: ["A"],
        },
        {
            from: 15,
            to: 13,
            input: ["B", "W", "S", "D", "X", "Y"],
        },
        {
            from: 16,
            to: 16,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 16,
            to: 17,
            input: ["B"],
        },
        {
            from: 17,
            to: 17,
            input: ["B", "W", "A", "S", "D", "Y"],
        },
        {
            from: 17,
            to: 1,
            input: ["X"],
        },
    ],
};

const DFAMachine = atom({
    key: "DFAMachine",
    default: initialMachine,
});

export { DFAMachine };
