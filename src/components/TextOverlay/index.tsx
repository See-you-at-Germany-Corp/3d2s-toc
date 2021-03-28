import React from "react";

import { TextOverlayContainer } from "./style";

interface ITextOverlayProps {
    text: string;
    marginTop?: number | string;
    marginLeft?: number | string;
    isOpen: boolean | false;
    isBlink: boolean | false;
}

const TextOverlay = (props: ITextOverlayProps): React.ReactElement => {
    const { marginTop, marginLeft, isOpen, isBlink } = { ...props };

    return (
        <TextOverlayContainer
            style={{
                marginTop,
                marginLeft,
                display: `${isOpen ? "block" : "none"}`,
            }}
            isBlink={isBlink}
        >
            <p className="text">{props.text}</p>
        </TextOverlayContainer>
    );
};

export default TextOverlay;
