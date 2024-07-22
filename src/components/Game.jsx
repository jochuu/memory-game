import { useEffect, useState } from 'react';
import Card from './Card';
import Scoreboard from './Scoreboard';
import GameState from './GameState';

function Game() {
  const [chosen, setChosen] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // generate an array with the values from 'start' to 'end'
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // all valid IDs (first generation pokemon)
  const allIds = range(1, 151);

  const handleChosen = (id) => {
    // end game if selected id is already in the chosen list
    if (chosen.includes(id)) {
      setGameOver(true);
      setChosen([]);
      setCurrentCards(generateRandomCards());

      // handle selection
    } else {
      setGameOver(false);
      setChosen((prevChosen) => [...prevChosen, id]);
      setCurrentCards(generateRandomCards());
    }
  };

  // generate 5 random cards
  const generateRandomCards = () => {
    const shuffled = [...allIds].sort(() => 0.5 - Math.random()); // commonly used one-line js shuffle
    return shuffled.slice(0, 5);
  };

  // initialise with 5 random cards only after loading completed
  useEffect(() => {
    if (!loading) {
      setCurrentCards(generateRandomCards());
    }
  }, [loading]);

  return (
    <>
      <GameState
        setAllPokemonData={setAllPokemonData}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
      {!loading && <Scoreboard chosen={chosen} />}

      <div className='game'>
        {!loading &&
          currentCards.map((id) => (
            <Card
              key={id}
              id={id}
              pokemon={allPokemonData[id]}
              handleChosen={() => handleChosen(id)}
            />
          ))}
      </div>
      {!loading && (
        <>
          <div className='title'>
            <div className='title-item'>
              <h2 className='small-caps'>How to Play</h2>
              <div>Just don't select the same pokemon twice</div>
            </div>
            <div className='title-item'>
              <h2>
                Pokémon <span className='small-caps'>reverse match</span>
              </h2>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Game;
