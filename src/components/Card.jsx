function Card({ id, pokemon, handleChosen }) {
  return (
    <div className={`card`} onClick={() => handleChosen(id)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}

export default Card;
