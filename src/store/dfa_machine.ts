import { atom } from "recoil";
import { iMachine } from "../types/dfa.types";

const initialMachine: iMachine = {
    states: [
        {
            id: 1,
            name: "IDLE",
            x: 0,
            y: 0,
        },
        {
            id: 2,
            name: "FIRST_RETURRCOIN",
            x: 100,
            y: 0,
        },
        {
            id: 3,
            name: "READY_TO_PLAY",
            x: 200,
            y: 0,
        },
        {
            id: 4,
            name: "RETURN_COIN",
            x: 300,
            y: 0,
        },
        {
            id: 5,
            name: "READY_TO_GRAB",
            x: 400,
            y: 0,
        },
        {
            id: 6,
            name: "MOVE_FORWARD",
            x: 500,
            y: 0,
        },
        {
            id: 7,
            name: "MOVING_RIGHT",
            x: 600,
            y: 0,
        },
        {
            id: 8,
            name: "MOVING_LEFT",
            x: 700,
            y: 0,
        },
        {
            id: 9,
            name: "MOVING_BACKWARD",
            x: 800,
            y: 0,
        },
        {
            id: 10,
            name: "MOVING_DOWN",
            x: 900,
            y: 0,
        },
        {
            id: 11,
            name: "GRAB",
            x: 1000,
            y: 0,
        },
        {
            id: 12,
            name: "MOVING_UP(GRAB)",
            x: 1100,
            y: 0,
        },
        {
            id: 13,
            name: "READY_T0_BACK Q(GRAB)",
            x: 1200,
            y: 0,
        },
        {
            id: 14,
            name: "MOVE_BACKKWARD(GRAB)",

            x: 1300,
            y: 0,
        },
        {
            id: 15,
            name: "MOVING_LEFT(GRAB)",
            x: 1400,
            y: 0,
        },
        {
            id: 16,
            name: "RELEASE",
            x: 1500,
            y: 0,
        },
        {
            id: 17,
            name: "RESULT",
            x: 1600,
            y: 0,
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
            input: ["X"],
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
            input: ["B", "Y"],
        },
        {
            from: 6,
            to: 6,
            input: ["W"],
        },
        {
            from: 6,
            to: 7,
            input: ["D"],
        },
        {
            from: 6,
            to: 8,
            input: ["A"],
        },
        {
            from: 6,
            to: 9,
            input: ["S"],
        },
        {
            from: 6,
            to: 10,
            input: ["X"],
        },
        {
            from: 7,
            to: 5,
            input: ["B", "Y"],
        },
        {
            from: 7,
            to: 6,
            input: ["W"],
        },
        {
            from: 7,
            to: 7,
            input: ["D"],
        },
        {
            from: 7,
            to: 8,
            input: ["A"],
        },
        {
            from: 7,
            to: 9,
            input: ["S"],
        },
        {
            from: 7,
            to: 10,
            input: ["X"],
        },
        {
            from: 8,
            to: 5,
            input: ["B", "Y"],
        },
        {
            from: 8,
            to: 6,
            input: ["W"],
        },
        {
            from: 8,
            to: 7,
            input: ["D"],
        },
        {
            from: 8,
            to: 8,
            input: ["A"],
        },
        {
            from: 8,
            to: 9,
            input: ["S"],
        },
        {
            from: 8,
            to: 10,
            input: ["X"],
        },
        {
            from: 9,
            to: 5,
            input: ["B", "Y"],
        },
        {
            from: 9,
            to: 6,
            input: ["W"],
        },
        {
            from: 9,
            to: 7,
            input: ["D"],
        },
        {
            from: 9,
            to: 8,
            input: ["A"],
        },
        {
            from: 9,
            to: 9,
            input: ["S"],
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
            input: ["B", "W", "A", "D", "X", "Y"],
        },
        {
            from: 13,
            to: 14,
            input: ["S"],
        },
        {
            from: 14,
            to: 14,
            input: ["B", "W", "S", "D", "X", "Y"],
        },
        {
            from: 14,
            to: 15,
            input: ["A"],
        },
        {
            from: 15,
            to: 14,
            input: ["S"],
        },
        {
            from: 15,
            to: 15,
            input: ["W", "A", "D", "X", "Y"],
        },
        {
            from: 15,
            to: 16,
            input: ["B"],
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
