import Confetti from 'react-confetti'
import { useRecoilState } from "recoil";
import { clampStore, displayConfetti } from "../../store";
import { dollDatas } from "../Dolls/doll_data";


const Conf =()=> {
    const [display, setDisplay] = useRecoilState(displayConfetti);
    const [clampState] = useRecoilState(clampStore);
    return (
        (display.display && (dollDatas[clampState?.dollType]?.id !== 0) &&  dollDatas[clampState?.dollType]) ?
        <Confetti
            style={{
                width: '100%'
            }}
            recycle={display.cycle}
            // eslint-disable-next-line
            onConfettiComplete={(confetti) => (confetti?.stop, setDisplay(
                (prev: any) => ({ 
                    ...prev ,
                    display: false
                })))}
        />: <div></div>
    )
}


export default Conf;
