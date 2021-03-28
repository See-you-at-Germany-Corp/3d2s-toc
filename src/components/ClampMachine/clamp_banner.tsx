import React from "react";

import { ClampBannerContainer } from "./style";

const ClampBanner = (): React.ReactElement => {
    return (
        <ClampBannerContainer className="clamp-banner">
            <div className="star star-left"></div>
            <div className="clamp-name">
                <p>Claw</p>
                <p>Machine</p>
            </div>
            <div className="star star-right"></div>
        </ClampBannerContainer>
    );
};

export default ClampBanner;
