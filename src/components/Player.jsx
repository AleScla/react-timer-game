import {useState, useRef} from 'react'
export default function Player() {
  const [playerName, setPlayerName] = useState(null);
  const inputName = useRef()
  function handleName(){
    if(inputName.current.value){
      setPlayerName(inputName.current.value);
      inputName.current.value = '';
    }
    else{
      setPlayerName('unknown entity')
    }
  }
  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={inputName} type="text" />
        <button onClick={handleName}>Set Name</button>
      </p>
    </section>
  );
}
