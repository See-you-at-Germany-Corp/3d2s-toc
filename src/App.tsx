import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";

import Machine from "./pages/machine";

const App = (): React.ReactElement => {
    return (
        <RecoilRoot>
            <Machine />
        </RecoilRoot>
    );
};

export default App;
