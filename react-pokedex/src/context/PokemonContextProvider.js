import React, { useEffect, useState } from 'react';
import PokemonThumb from '/component/PokemonThumb';
import PokemonDetails from '/component/PokemonDetails';

const App = () => {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json()

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    getAllPokemons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='app-container'>
      <h1>Pokemon Evolution</h1>
      <div className='all-container'>
        {allPokemons.map((pokemonStats, index) => (
        <PokemonThumb
          key={index}
          id={pokemonStats.id}
          image={pokemonStats.sprites.other.dream_world.front_default}
          name={pokemonStats.name}
          type={pokemonStats.types[0].type.name}
      />))}

      </div>
      <button 
        className='load-more' 
        onClick={() => getAllPokemons()}>
          Load More
      </button>
    </div>
  )
  }

  export default App;







