import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import ClampMachine from "./ClampMachine";

const App = (): React.ReactElement => {
    return (
        <RecoilRoot>
            <ClampMachine />
        </RecoilRoot>
    );
};

export default App;
