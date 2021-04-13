export interface iMachine {
    states: iState[];
    transitions: iTransition[];
}

export interface iState {
    x: number;
    y: number;
    id: number;
    name: string;
    isFinal?: boolean;
    acceptedStringID: number;
}

export interface iTransition {
    from: number;
    to: number;
    input: string[];
}
