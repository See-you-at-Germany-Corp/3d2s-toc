export enum machineStateData {
    IDLE = 1,
    FIRST_COIN,
    READY_TO_PLAY,
    RETURN_COIN,
    READY_TO_GRAB,
    MOVE_FORWARD,
    MOVE_RIGHT,
    MOVE_LEFT,
    MOVE_BACKWARD,
    MOVE_DOWN,
    GRAB,
    MOVE_UP_GRAB,
    READY_T0_BACK_GRAB,
    MOVE_BACKKWARD_GRAB,
    MOVE_LEFT_GRAB,
    RELEASE,
    RESULT,
    INPUT_ERROR_1,
    INPUT_ERROR_2,
}

export const acceptString = [
    {
        id: 1,
        strings: ["B"],
    },
    {
        id: 2,
        strings: ["B", "Y"],
    },
    {
        id: 3,
        strings: ["X", "Y"],
    },
    {
        id: 4,
        strings: ["W", "A", "S", "D", "X"],
    },
    {
        id: 5,
        strings: ["A", "S", "B"],
    },
    {
        id: 6,
        strings: ["X"],
    },
];
