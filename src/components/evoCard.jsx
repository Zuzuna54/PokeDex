import liked from "../assets/liked.png"
import notliked from "../assets/notliked.png"
import { likePokemon, unlikePokemon } from "../requests/request";
import { useState } from "react";

const EvoCard = (props) => {

    let data = props.isFavorite;
    let [isFavorite, setFavorite] = useState(props.isFavorite);
    let img;
    let onclick;
    if(isFavorite) {
        img = liked;
        onclick = unlikePokemon;
    } else {
        img = notliked;
        onclick = likePokemon;
    }

    return(<>
        <div className="evo-card">
            <div className="evo-img">
                <div className="evo-img-holder" exact="true" to={`/pokemons/${props.name}`}>
                    <img className="evo-img-content" src={props.image} alt=""/>
                </div>
            </div>
            <div className="evo-info">
                <div className="description">
                    <div className="name" exact="true" to={`/pokemons/${props.name}`}>{props.name}</div>
                </div>
                <div className="evo-like"><img src={img} alt="Favorites"  onClick={
                        async () => {
                            data = await onclick(props.id);
                            if(data.favoritePokemon) {
                                setFavorite(data.favoritePokemon.isFavorite);
                            }
                            if(data.unFavoritePokemon) {
                                setFavorite(data.unFavoritePokemon.isFavorite);
                            }
                        }
                    }  /></div>
            </div>
        </div>
    </>)
}

export default EvoCard;