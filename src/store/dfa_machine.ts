import { atom } from "recoil";
import { iMachine } from "../types/dfa.types";

export const nodeRow = [105, 316, 527.5, 737, 947];
export const nodeCol = [
    177.5,
    502,
    816,
    1130,
    1444,
    1758,
    2072,
    2386,
    2700,
    3014,
    3328,
    3642,
    3966,
];

const initialMachine: iMachine = {
    states: [
        {
            id: 1,
            name: "IDLE",
            x: nodeCol[0],
            y: nodeRow[2],
            isFinal: true,
            acceptedStringID: 1,
        },
        {
            id: 2,
            name: "FIRST_RETURRCOIN",
            x: nodeCol[1],
            y: nodeRow[2],
            acceptedStringID: 2,
        },
        {
            id: 3,
            name: "READY_TO_PLAY",
            x: nodeCol[2],
            y: nodeRow[2],
            acceptedStringID: 3,
        },
        {
            id: 4,
            name: "RETURN_COIN",
            x: nodeCol[1],
            y: nodeRow[3],
            acceptedStringID: 1,
        },
        {
            id: 5,
            name: "READY_TO_GRAB",
            x: nodeCol[3],
            y: nodeRow[2],
            acceptedStringID: 4,
        },
        {
            id: 6,
            name: "MOVE_FORWARD",
            x: nodeCol[4],
            y: nodeRow[1],
            acceptedStringID: 4,
        },
        {
            id: 7,
            name: "MOVE_RIGHT",
            x: nodeCol[5],
            y: nodeRow[1],
            acceptedStringID: 4,
        },
        {
            id: 8,
            name: "MOVE_LEFT",
            x: nodeCol[4],
            y: nodeRow[3],
            acceptedStringID: 4,
        },
        {
            id: 9,
            name: "MOVE_BACKWARD",
            x: nodeCol[5],
            y: nodeRow[3],
            acceptedStringID: 4,
        },
        {
            id: 10,
            name: "MOVE_DOWN",
            x: nodeCol[6],
            y: nodeRow[2],
            acceptedStringID: 1,
        },
        {
            id: 11,
            name: "GRAB",
            x: nodeCol[7],
            y: nodeRow[2],
            acceptedStringID: 1,
        },
        {
            id: 12,
            name: "MOVE_UP(GRAB)",
            x: nodeCol[8],
            y: nodeRow[2],
            acceptedStringID: 1,
        },
        {
            id: 13,
            name: "READY_T0_BACK(GRAB)",
            x: nodeCol[9],
            y: nodeRow[2],
            acceptedStringID: 5,
        },
        {
            id: 14,
            name: "MOVE_BACKKWARD(GRAB)",
            x: nodeCol[10],
            y: nodeRow[1],
            acceptedStringID: 5,
        },
        {
            id: 15,
            name: "MOVE_LEFT(GRAB)",
            x: nodeCol[10],
            y: nodeRow[3],
            acceptedStringID: 5,
        },
        {
            id: 16,
            name: "RELEASE",
            x: nodeCol[11],
            y: nodeRow[2],
            acceptedStringID: 1,
        },
        {
            id: 17,
            name: "RESULT",
            x: nodeCol[12],
            y: nodeRow[2],
            acceptedStringID: 6,
        },
        {
            id: 18,
            name: "ERROR",
            x: nodeCol[6],
            y: nodeRow[0],
            acceptedStringID: 6,
        },
        {
            id: 19,
            name: "ERROR",
            x: nodeCol[6],
            y: nodeRow[4],
            acceptedStringID: 6,
        },
    ],
    transitions: [
        {
            from: 1,
            to: 18,
            input: ["X", "W", "A", "S", "D", "Y"],
        },
        {
            from: 1,
            to: 2,
            input: ["B"],
        },
        {
            from: 2,
            to: 18,
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
            to: 18,
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
            to: 19,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 5,
            to: 19,
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
            to: 18,
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
            to: 18,
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
            to: 19,
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
            to: 19,
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
            to: 18,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 10,
            to: 11,
            input: ["B"],
        },
        {
            from: 11,
            to: 18,
            input: ["S"],
        },
        {
            from: 11,
            to: 12,
            input: ["B"],
        },
        {
            from: 12,
            to: 18,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 12,
            to: 13,
            input: ["B"],
        },
        {
            from: 13,
            to: 18,
            input: ["W", "D", "X", "Y"],
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
            to: 15,
            input: ["A"],
        },
        {
            from: 14,
            to: 16,
            input: ["B"],
        },
        {
            from: 14,
            to: 18,
            input: ["W", "S", "D", "X", "Y"],
        },
        {
            from: 15,
            to: 14,
            input: ["S"],
        },
        {
            from: 15,
            to: 15,
            input: ["A"],
        },
        {
            from: 15,
            to: 16,
            input: ["B"],
        },
        {
            from: 15,
            to: 19,
            input: ["W", "D", "X", "Y"],
        },
        {
            from: 16,
            to: 18,
            input: ["W", "A", "S", "D", "X", "Y"],
        },
        {
            from: 16,
            to: 17,
            input: ["B"],
        },
        {
            from: 17,
            to: 19,
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
