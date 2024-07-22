import { useEffect } from 'react';

function GameState({
  setAllPokemonData,
  loading,
  setLoading,
  error,
  setError,
  gameOver,
  setGameOver,
}) {
  // generate an array with the values from 'start' to 'end'
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // all valid IDs (first generation pokemon)
  const allIds = range(1, 151);

  // preload image for smoother gameplay
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  // get pokemon data
  useEffect(() => {
    const fetchAllPokemonData = async () => {
      setLoading(true);
      setError(null);
      const fetchedData = {};
      const imagePromises = [];

      try {
        for (let id of allIds) {
          const cachedData = localStorage.getItem(`pokemon-${id}`);
          if (cachedData) {
            fetchedData[id] = JSON.parse(cachedData);
          } else {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon-form/${id}`
            );
            if (!response.ok) {
              throw new Error('Network response from pokeapi.co failed');
            }
            const data = await response.json();
            fetchedData[id] = data;
            localStorage.setItem(`pokemon-${id}`, JSON.stringify(data));
          }
          imagePromises.push(
            preloadImage(fetchedData[id].sprites.front_default)
          );
        }

        await Promise.all(imagePromises);
        setAllPokemonData(fetchedData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchAllPokemonData();
  }, [setLoading, setError, setAllPokemonData]);

  return (
    <div className='game-state'>
      {loading && (
        <div className='game-state-loading'>
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div className='game-state-error'>
          <h2>Error: {error.message}</h2>
        </div>
      )}
      {gameOver && (
        <div className='game-state-game-over'>
          <p>lol rip u picked the same pokemon twice</p>
        </div>
      )}
    </div>
  );
}

export default GameState;
