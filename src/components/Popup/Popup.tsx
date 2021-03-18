import { motion } from 'framer-motion';
import React, { MutableRefObject, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { IDollData } from '../Dolls/doll_data';
import {MotionH1, MotionH2, PopupBody} from './style';

interface PopupProps {
    data: IDollData
    open : boolean
    onClose : any
}

const GamePopup = (props: PopupProps):React.ReactElement => {
    return (
        <div>
            <Popup open={props.open} onClose={props.onClose}  modal> 
                <PopupBody 
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                        <MotionH1
                            variants={H1}
                        >Congratulations!</MotionH1>
                        <MotionH2
                            variants={H1}
                        >{props.data.name}</MotionH2>
                    <motion.img src={props.data.img} 
                        variants={doll}
                        animate={{rotate:10}}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.3
                        }}
                    />
                    
                </PopupBody>
                    
            </Popup>
        </div>
    );
}

const container = {
    hidden: {
        scale:0
    },
    show: {
        scale:[0,1.1,1],
        transition : {
            duration: 0.5,
            when:"beforeChildren",
            staggerChildren: 0.1
        }
    }
}

const H1 = {
    hidden: {
        scale:0
    },
    show:{
        scale:[0,1.7,1.4],
        transition :{ 
            duration: 1, 
            times: [0, 0.2, 0.5] 
        }
    }
}

const doll = {
    hidden: {
        scale:0
    },
    show: { 
        scale:[0,1.2,1],
        transition :{ 
            duration: 1, 
            times: [0, 0.2, 0.5] 
        }
    }
}

export default GamePopup;