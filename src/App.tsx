import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import ClampMachine from "./components/ClampMachine";
import DFAGraph from "./components/DFAGraph";

const App = (): React.ReactElement => {
    return (
        <RecoilRoot>
            <ClampMachine />
            <DFAGraph />
        </RecoilRoot>
    );
};

export default App;
