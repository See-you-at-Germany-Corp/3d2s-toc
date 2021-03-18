import React, { useState } from "react";
import { motion } from "framer-motion";
import DollGroup from "../Dolls";
import "./style.css";
import GamePopup from "../Popup/Popup";
import {dollDatas} from '../Dolls/doll_data';
import Confetti from 'react-confetti'



const ClampMachine: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [display, setDisplay] = useState(false)
    const [cycle, setCycle] = useState(false)

    const onKeyDown = React.useCallback(
        (key: KeyboardEvent) => {
            switch (key.code) {
                case "KeyD":
                    setPosition({ x: position.x + 100, y: position.y });
                    break;
                case "KeyA":
                    setPosition({ x: position.x - 100, y: position.y });
                    break;
                case "KeyW":
                    setPosition({ x: position.x, y: position.y - 100 });
                    break;
                case "KeyS":
                    setPosition({ x: position.x, y: position.y + 100 });
                    break;
            }
        },
        [position]
    );

    React.useEffect(() => {
        document.body.addEventListener("keydown", onKeyDown, false);
        return () =>
            document.body.removeEventListener("keydown", onKeyDown, false);
    }, [onKeyDown]);

    return (
        <div className="machine">
            {
                display ? 
                    <Confetti 
                        style={{
                            width:'100%'
                        }}
                        recycle={cycle}
                        onConfettiComplete={(confetti)=> (confetti?.stop,setDisplay(false))}
                    /> 
                :
                    <></>

            }
            <motion.div
                className="move"
                animate={{ x: position.x, y: position.y }}
            ></motion.div>
            <DollGroup />
            <button onClick={()=>{setDisplay(true);setCycle(true)}}> Test Confetti</button>
            <GamePopup data={dollDatas[0]} open={cycle} onClose={()=>setCycle(false)}/>
        </div>
    );
};

export default ClampMachine;
