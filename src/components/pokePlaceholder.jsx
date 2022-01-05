import React from "react";
import { loadPokemonByName } from "../requests/request";
import Sound from "../assets/sound.png"
import liked from "../assets/liked.png"
import notliked from "../assets/notliked.png"
import { likePokemon, unlikePokemon } from "../requests/request";
import EvoCard from "./evoCard";



class PokeDisplayPlaceHolder extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            poke: null,
            isFavorite: null
        }
    }

    async componentDidMount() {
        const string = window.location.href;
        const array = string.split("/");
        const name = array[array.length - 1];
        const poke = await loadPokemonByName(name);
        const isFavorite = poke.pokemonByName.isFavorite;
        this.setState({poke: poke, isFavorite: isFavorite});
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps, prevState)
    // }
    
   render() {
       const {poke} = this.state;
       if(!poke) {
           return null;
       }
        let data;
        let img;
        let onclick;
        let type;
        let {isFavorite} = this.state;
        const pokemon = poke.pokemonByName;
        const evolutions = pokemon.evolutions;

        if(isFavorite) {
            img = liked;
            onclick = unlikePokemon;
        } else {
            img = notliked;
            onclick = likePokemon;
        }

        if(pokemon.types.length > 1) {
            type = pokemon.types.join(", ");
        } else {
            type = pokemon.types[0];
        }

        return (<>  
                    <div>
                        <div className="main-card">
                            <div className="image-container">
                                <div className="sound-container"><img className="sound-icon" src={Sound} alt="" /></div>
                                <div className="main-image"><img src={pokemon.image} alt="" /></div>  
                            </div>
                            <div className="desc-container">
                                <div className="top-desc">
                                    <div className="info-main">
                                        <div className="poke-name">{pokemon.name}</div>
                                        <div className="poke-type">{type}</div>
                                    </div>
                                    <div className="like-button">
                                        <img src={img}  onClick={
                                            async () => {
                                                data = await onclick(pokemon.id);
                                                if(data.favoritePokemon) {
                                                    isFavorite = data.favoritePokemon.isFavorite;
                                                    this.setState({isFavorite});
                                                }
                                                if(data.unFavoritePokemon) {
                                                    isFavorite = data.unFavoritePokemon.isFavorite;
                                                    this.setState({isFavorite});
                                                }
                                            }
                                        } alt="" />
                                    </div>
                                </div>
                                <div className="mid-desc">
                                    <div>
                                        <div className="color-purp"></div>
                                        <div className="hp">CP: {pokemon.maxCP}</div>
                                    </div>
                                    <div>
                                        <div className="color-green"></div>
                                        <div className="hp">HP: {pokemon.maxHP}</div>
                                    </div>
                                </div>
                                <div className="bottom-desc">
                                    <div className="weight" >
                                        <div className="title">Weight</div>
                                        <div>{pokemon.weight.minimum} - {pokemon.weight.maximum}</div>
                                    </div>
                                    <div className="height">
                                        <div className="title">Height</div>
                                        <div>{pokemon.height.minimum} - {pokemon.height.maximum}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="evolutions-card">
                            <div className="evo-title">Evolutions</div>
                            <div className="evo-feed">
                                { evolutions.map((poke) => <EvoCard key={poke.id} id={poke.id} name={poke.name}  isFavorite={poke.isFavorite} image={poke.image}/>)}
                            </div>
                        </div>
                    </div> 
                </>)
   }
}

export default PokeDisplayPlaceHolder;