import {useRef, useState} from 'react';
import ModalComponent from './ModalComponent.jsx'
export default function GameComponent({difficulty, time }){
    const timer = useRef();
    const displayModal = useRef();

    const [timeRemaining, setTimeRemaining] = useState(time * 1000)
    // timerActive verrà impostata a true se il tempo rimanente è maggiore di zero
    // e se il tempo rimanente è minore della prop time*1000 (valore iniziale dello state)
    const timerActive = timeRemaining > 0 && timeRemaining < time * 1000;
    if(timeRemaining <= 0){
        clearInterval(timer.current);
        displayModal.current.open()
    }
    function manageReset(){
        setTimeRemaining(time * 1000);
    }
    function manageStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }
    function manageStop(){
        clearInterval(timer.current);
        displayModal.current.open();
    }
    return(
        <>
            <ModalComponent onReset={manageReset} ref={displayModal} time={time} timeRemaining={timeRemaining}/>
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