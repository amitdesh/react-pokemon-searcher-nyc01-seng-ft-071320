import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchTerm: "",
  };

  componentDidMount() {
    return fetch("http://localhost:3000/pokemon/")
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(() => ({
          pokemon: data,
        }));
      });
  }

  searchHandler = (search) => {
    // console.log(search.value);
    this.setState(() => ({
      searchTerm: search.value,
    }));
  };

  submitHandler = (e, pokeObj) => {
    console.log("submit clicked");
    e.preventDefault();
    this.postRequest(pokeObj);
  };

  postRequest = (obj) => {
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        hp: obj.hp,
        sprites: {
          front: obj.frontUrl,
          back: obj.backUrl,
        },
      }),
    };
    fetch("http://localhost:3000/pokemon/", options)
      .then((resp) => resp.json())
      .then((obj) => {
        let newPokes = [...this.state.pokemon, obj];
        this.setState(() => ({
          pokemon: newPokes,
        }));
      });
  };

  filterPokemon = () => {
    console.log("poke state search:", this.state.searchTerm);
    console.log("New Array is this:", this.state.pokemon);
    return this.state.pokemon.filter((poke) => {
      return poke.name
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase());
    });
    // }
  };

  render() {
    const filteredPoke = this.filterPokemon();
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm submitHandler={this.submitHandler} />
        <br />
        <Search
          searchTerm={this.state.searchTerm}
          searchHandler={this.searchHandler}
        />
        <br />
        <PokemonCollection pokemon={filteredPoke} />
      </Container>
    );
  }
}

export default PokemonPage;
