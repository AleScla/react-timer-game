import Player from './components/Player.jsx';
import GameComponent from './components/GameComponent.jsx'
import gameDifficulties from './gameDifficulties.js'
function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        {gameDifficulties.map((singleGame)=> <GameComponent difficulty={singleGame.difficulty} time={singleGame.time}/>)}
      </div>
    </>
  );
}

export default App;
