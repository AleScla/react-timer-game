import {useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom'
export default function ModalComponent({time, ref, timeRemaining, onReset}){
    // in questo caso, l'utilizzo di useRef in combinazione all'hook
    // imperativeHandle, serve a fare in modo che si crei un collegamento
    // fra i due useRef presenti qui e nel GameComponent. In questo modo,
    // per aprire la dialog, basterà richiamare nel GameComponent il 
    // displayModal.current.open() - .open() è la funzione che vado a creare qui
    // Se in futuro mi servirà modificare o aggiungere qualcosa alla funzione open, 
    // mi basterà modificarla da qui e verrà modificata anche in tutti i punti in cui
    // viene richiamata nel GameComponent.jsx
    const displayModal = useRef();
    const score = Math.round((1 - ((timeRemaining / 1000) / time)) * 100)
    const clickedIn = (time - (timeRemaining / 1000)).toFixed(2)
    
    useImperativeHandle(ref, ()=>{
        return {
            open(){
                displayModal.current.showModal();
            }
        }
    })
    // createPortal crea un 'portale' che permette di selezionare un elemento nel DOM
    // e decidere che l'output di questo component avverrà proprio nell'elemento selezionato
    // come secondo argomento di createPortal.
    return createPortal(
        <dialog ref={displayModal} className="result-modal">
            {timeRemaining <= 0 ? <h2>You lost</h2>: <h2>Your Score: {score}</h2>}
            {timeRemaining > 0 && <p>You clicked it in {clickedIn}</p>}
            <p>You had to click it in {time} second{time > 1 && 's'}</p>
            <form method="dialog">
                <button onClick={onReset}>Close</button>
            </form>
        </dialog>
    ), document.getElementById('modal');
}

// usare il ref direttamente nelle prop è possibile solo da React v19
// nelle versioni precedenti bisognava importare {forwardRef} dal pacchetto react
// nelle vecchie versioni sarebbe così: 

// import {forwardRef} from 'react'
// const ModalComponent = forwardRef(function ModalComponent({result, time,},  ref){
//     return(
//         <dialog ref={ref} className="result-modal">
//             <h2>You lost</h2>
//             <p>You had to click it in {time} second{time > 1 && 's'}</p>
//             <form method="dialog">
//                 <button>Close</button>
//             </form>
//         </dialog>
//     )
// })
// export default ModalComponent