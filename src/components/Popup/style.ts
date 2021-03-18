import styled from 'styled-components';
// import Popup from 'reactjs-popup';
import {motion} from 'framer-motion';

export const PopupBody = styled(motion.div)`
    // background-color: rgba(255, 255, 255, 0.6);  
    background-image: 
        radial-gradient(at top left, #F0ACE0, transparent),
        radial-gradient(at top right, #FFA4B2, transparent),
        radial-gradient(at bottom left, #A7D3F2, transparent);
    display: flex;
    flex-direction : column;
    text-align: center;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 5px 7px 15px 1px rgba(0,0,0,0.14);
    backdrop-filter: blur(5px);
`

export const MotionH1 = styled(motion.h1)`
    font-family: 'Lobster Two', cursive;
    font-size : 40px;
    text-shadow: 2px 2px #FF0000;
    color: white;

`

export const MotionH2 = styled(motion.h2)`
    font-family: 'Lobster Two', cursive;
    font-size : 30px;
    text-shadow: 2px 2px #FF0000;
    color: white;

`
