export interface iMachine {
    states: iState[];
    transitions: iTransition[];
}

export interface iState {
    id: number;
    name: string;
    x: number;
    y: number;
}

export interface iTransition {
    from: number;
    to: number;
    input: string[];
}