import React from "react";

import { TextOverlayContainer } from "./style";

interface ITextOverlayProps {
    text: string;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    isOpen: boolean | false;
    isBlink: boolean | false;
}

const TextOverlay = (props: ITextOverlayProps): React.ReactElement => {
    const { top, right, bottom, left, isOpen, isBlink } = { ...props };

    return (
        <TextOverlayContainer
            style={{
                top,
                right,
                bottom,
                left,
                display: `${isOpen ? "block" : "none"}`,
            }}
            isBlink={isBlink}
        >
            <p className="text">{props.text}</p>
        </TextOverlayContainer>
    );
};

export default TextOverlay;
