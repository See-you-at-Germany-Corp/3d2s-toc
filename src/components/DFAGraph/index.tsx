import React, { useEffect } from "react";
import styled from "styled-components";

// import Xarrow from "react-xarrows";
import { MapInteractionCSS } from "react-map-interaction";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { DFACurrentState, DFASelector } from "../../store/index";

const DFAGraph: React.FC = () => {
    const currentState = useRecoilValue(DFACurrentState);
    const setDFASelector = useSetRecoilState(DFASelector);

    useEffect(() => {}, []);

    return (
        <Container>
            <MapInteractionCSS>
                <button onClick={() => setDFASelector("B")}>
                    {currentState.id}
                </button>
            </MapInteractionCSS>
        </Container>
    );
};

const Container = styled.div`
    width: 500px;
    height: 500px;

    display: flex;
    background-color: blanchedalmond;
    justify-content: space-between;
`;

export default DFAGraph;
