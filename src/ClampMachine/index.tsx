import React ,{ useState} from 'react'
import './style.css'
import { motion } from "framer-motion"

const ClampMachine:React.FC = () => {
    const [position, setPosition] = useState({x:0,y:0});

    const onKeyDown = React.useCallback(
        ( key : KeyboardEvent) => {
            switch (key.code) {
                case "KeyD":
                    setPosition({x : position.x + 100, y: position.y})
                    break;
                case "KeyA":
                    setPosition({x : position.x - 100, y: position.y})
                    break;
                case "KeyW":
                    setPosition({x : position.x , y: position.y - 100})
                    break;
                case "KeyS":
                    setPosition({x : position.x , y: position.y + 100})
                    break;
            }
        },
        [position]
    );
 
    React.useEffect(() => {
        document.body.addEventListener("keydown", onKeyDown, false);
        return () => document.body.removeEventListener("keydown", onKeyDown, false);
      }, [onKeyDown]);
    
    return (
        <motion.div className="move"  animate={{x:position.x,y:position.y}}>

        </motion.div>
    );
        
}



export default ClampMachine