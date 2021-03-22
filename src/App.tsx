import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import ClampMachine from "./components/ClampMachine";
import DFAGraph from "./components/DFAGraph";

const App = (): React.ReactElement => {
    return (
        <RecoilRoot>
            <div className="dfa-clamp-machine" style={{ display: "flex" }}>
                <ClampMachine />
                <DFAGraph />
            </div>
        </RecoilRoot>
    );
};

export default App;
