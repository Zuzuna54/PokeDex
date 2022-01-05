import liked from "../assets/liked.png"
import notliked from "../assets/notliked.png"
import { likePokemon, unlikePokemon } from "../requests/request";
import { Link } from "react-router-dom";
import { useState } from "react";

const Card = (props) => {
    let [isFavorite, setFavorite] = useState(props.isFavorite);
    let type;
    let img;
    let onclick;
    let data = props.isFavorite;
    
    if(isFavorite) {
        img = liked;
        onclick = unlikePokemon;
    } else {
        img = notliked;
        onclick = likePokemon;
    }

    if(props.type){
        if(props.type.length > 1) {
            type = props.type.join(", ");
        } else {
            type = props.type[0];
        }
    }

    return(<>
        <div className="card">
            <div className="img"> <Link className="name" to={`/pokemons/${props.name}`}><img className="img-content" src={props.image} alt="" /> </Link></div>
            <div className="info">
                <div className="description">
                    <Link className="name" to={`/pokemons/${props.name}`}>{props.name}</Link>
                    <div>{type}</div>
                </div>
                <div className="like"><img src={img} alt="Favorites" 
                    onClick={
                        async () => {
                            data = await onclick(props.id);
                            if(data.favoritePokemon) {
                                setFavorite(data.favoritePokemon.isFavorite);
                            }
                            if(data.unFavoritePokemon) {
                                setFavorite(data.unFavoritePokemon.isFavorite);
                            }
                            props.clickHandler();
                        }
                    } 
                /></div>
            </div>
        </div>
    </>)
}

export default Card;