import React from "react";

const Machine = (): React.ReactElement => {
    const [machineState, setMachineState] = React.useState({
        key: "Enter",
    });

    function addBodyEvent() {
        const body = document.querySelector("body");

        body?.addEventListener("keydown", (e) => {
            setMachineState((prev) => ({
                ...prev,
                key: e.key,
            }));
        });
    }

    function removeBodyEvent() {
        const body = document.querySelector("body");

        body?.removeEventListener("keydown", (e) => {
            setMachineState((prev) => ({
                ...prev,
                key: e.key,
            }));
        });
    }

    React.useEffect(() => {
        addBodyEvent();
        return () => {
            removeBodyEvent();
        };
    }, []);
  
    return <div>{machineState.key}</div>;
};

export default Machine;
