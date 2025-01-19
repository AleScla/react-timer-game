import {useRef, useState} from 'react';
import ModalComponent from './ModalComponent.jsx'
export default function GameComponent({difficulty, time }){
    const timer = useRef();
    const [timerActive, setTimerActive] = useState(false);
    const displayModal = useRef();
    function manageStart(){
        setTimerActive(true);
        timer.current = setTimeout(() => {
            displayModal.current.open();
            setTimerActive(false)
        }, time * 1000);
        
    }
    function manageStop(){
        clearTimeout(timer.current);
        setTimerActive(false)
        displayModal.current.open();
    }
    return(
        <>
            <ModalComponent ref={displayModal} time={time}/>
            <div className="challenge">
                <h2>{difficulty}</h2>
                <p className="challenge-time">
                    {time} second{time > 1 && 's'}
                </p>
                <button onClick={timerActive ? manageStop : manageStart}>{timerActive ? 'Stop' : 'Start'} Challenge</button>
                <p className={timerActive && 'active'}>
                    {timerActive ? 'Timer running' : 'Timer not running'}
                </p>
            </div>
        </>
    );
}