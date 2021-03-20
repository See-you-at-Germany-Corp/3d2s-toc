import styled from 'styled-components';
import Popup from 'reactjs-popup';
import {motion} from 'framer-motion';

export const Container = styled.div`
    display: flex !important;
    flex-direction: row !important;
    align-items: flex-end;
`

export const PopupBody = styled(motion.div)`
    // background-color: rgba(255, 255, 255, 0.6);  
    // background-image: 
    //     radial-gradient(at top left, #F0ACE0, transparent),
    //     radial-gradient(at top right, #FFA4B2, transparent),
    //     radial-gradient(at bottom left, #A7D3F2, transparent);
    background: linear-gradient(48deg, rgba(34,193,195,0.8) 0%, rgba(253,187,45,0.8) 100%);

    align-items: center;
    display: flex;
    flex-direction : column;
    text-align: center;
    // padding: 20px;
    border-radius: 100px;
    box-shadow: 5px 7px 15px 1px rgba(0,0,0,0.14);
    backdrop-filter: blur(5px);
`

export const MotionH1 = styled(motion.h1)`
    font-family: 'Lobster Two', cursive;
    font-size : 60px;
    text-shadow: 5px 5px #22c1c3;
    color: white;
`

export const MotionIMG = styled(motion.img)`
    width: 80%;
`


export const MotionH2 = styled(motion.h2)`
    font-family: 'Lobster Two', cursive;
    font-size : 30px;
    text-shadow: 5px 5px #fdbb2d;
    color: white;

`


export const PartyCracker = styled(motion.img)`
    height: 50%;
`

export const Button = styled(motion.button)`
    background-color: rgba(253,187,45,1);
    color: white;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    border: none;
    width: 100px;
    height: 40px;
    font-size: 18px;
    margin-bottom : 30px;
    box-shadow: 5px 7px 15px 1px rgba(0,0,0,0.14);
`
