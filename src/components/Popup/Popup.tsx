// import { motion } from 'framer-motion';
import React from 'react';
import Popup from 'reactjs-popup';
import { IDollData } from '../Dolls/doll_data';
import {Button, Container, MotionH1, MotionH2, MotionIMG, PartyCracker, PopupBody} from './style';
import party from './party.png';


interface PopupProps {
    data: IDollData
    open : boolean
    onClose : any
}

const GamePopup = (props: PopupProps):React.ReactElement => {
    const [open, setOpen] = React.useState(props.open)
    React.useEffect(()=>{
        setOpen(props.open)
    },[props.open])
    return (
        <div>
            <Popup open={open} onClose={props.onClose}  modal> 
            <Container>
                {
                    props.data.id === 0 ? <div></div> :
                    <PartyCracker src={party}  
                        initial={{scaleX:-1}}
                        animate={{rotate:10}}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.3
                        }}
                    />
                }
                
                <PopupBody 
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                    <MotionH1 variants={H1}>
                        {
                            props.data.id === 0 ? "Better Luck Next Time" : "Congratulations!"
                        }
                        
                    </MotionH1>
                    <MotionH2
                        variants={H1}
                    >{props.data.name}</MotionH2>
                    
                    <MotionIMG src={props.data.img} 
                        variants={doll}
                        animate={{rotate:10}}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.3
                        }}
                    />

                    <Button onClick={()=>setOpen(false)}
                        whileHover={{scale: 1.2}}
                        whileTap={{scale:0.8}}
                    >Continue</Button>
                </PopupBody>
                {
                    props.data.id === 0 ? <div></div> :
                    <PartyCracker src={party} 
                        animate={{rotate:10}}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.3
                        }}
                    />
                }
                
                </Container>
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
            times: [0, 0.2, 0.5],
            repeat: Infinity,
        },
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