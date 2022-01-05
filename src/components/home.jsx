import React from 'react';
import FilterBar from './filterBar';
import Card from './card';
import x from "../assets/x.png"
import { loadAllPokemon, searchPokemon } from '../requests/request';

export class Home extends React.Component  {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.state = {
            allpoke: props.allPoke,
            searchTerm: "",
            types: [],
            open: false, 
            value: "Types",
            filtered: null,
            showFavorites: false,
            favorites: [],
            click: 0
        }
    }

    clickHandler() {
        let {click} = this.state;
        click ++;
        this.setState({click})
        console.log(this.state.click)
    }

    async componentDidMount() {
        let allPoke = await loadAllPokemon();
        this.setState({allPoke});
    }

    async componentDidUpdate(prevState, prevProps) {

        if(prevProps.searchTerm !== this.state.searchTerm) {
            let allPoke;
            const {searchTerm} = this.state; 
            allPoke = await searchPokemon(searchTerm);
            this.setState({allPoke});
            if(searchTerm === "") {
                this.setState({allpoke: this.props.allPoke});
            }
        }

        if(prevProps.value !== this.state.value && this.state.value !== "Types") {
            let {allPoke} = this.state;
            let filtered = [];
            for(let i = 0; i < allPoke.length; i++) {
                let poke = allPoke[i];
                if(poke.types.includes(this.state.value)){
                    filtered.push(poke);
                }
            }
            this.setState({filtered});
        }
        if(prevProps.click !== this.state.click) {
            const forFavorites = await loadAllPokemon();
            const favoritesAr = [];
            for(let i = 0; i < forFavorites.length; i++) {
                const poke = forFavorites[i];
                if (poke.isFavorite) {
                    favoritesAr.push(poke);
                }
            }

            this.setState({favorites: favoritesAr});
        }

    }
    
    render() {
        let display;
        const {types} = this.state;
        const {open} = this.state; 
        const {favorites} = this.state;
        const {filtered} = this.state;
        const {allPoke} = this.state; 
        const typeContainer = {};

        if(!allPoke) {
            return null;
        }
        if(filtered) {
            display = filtered;
        } else {
            display = allPoke;
        }
        if(this.state.showFavorites) {
            display = favorites;
        }

        for(let i = 0; i < this.props.allPoke.length; i++) {
            let poke = this.props.allPoke[i];

            if(poke.types.length > 1) {
                for(let i = 0; i < poke.types.length; i++) {
                    let type = poke.types[i];
                    typeContainer[type] = 1;
                }
            }
            typeContainer[poke.types[0]] = 1;
        }
        this.state.types = Object.keys(typeContainer);

        return(
        <>
            <div className="container">
            <div className="filters">
                <div className="Buttons">
                    <div id="all" className ="button active" onClick={ async () => {
                        let all = document.getElementById("favorites");
                        all.classList.remove("active");
                        let favo = document.getElementById("all");
                        favo.classList.add("active");
                        
                        this.setState({favorites: []});
                        this.setState({showFavorites: false});
                        this.setState({allPoke: this.props.allPoke})
                    }}> All </div>
                    <div id="favorites" className ="button" onClick= { async () => {
                        let all = document.getElementById("all");
                        all.classList.remove("active");
                        let favo = document.getElementById("favorites");
                        favo.classList.add("active");

                        const forFavorites = await loadAllPokemon();
                        const favoritesAr = [];
                        for(let i = 0; i < forFavorites.length; i++) {
                            const poke = forFavorites[i];
                            if (poke.isFavorite) {
                                favoritesAr.push(poke);
                            }
                        }

                        this.setState({favorites: favoritesAr});
                        this.setState({showFavorites: true});
                    }}> Favorites </div>
                </div>
                <div className="bottom-filters">
                    <div className ="search-bar">
                       <div className="search-input">
                           <input type="text" placeholder="Search Pokemon" onChange={event => {
                               const searchTerm = event.target.value;
                               this.setState({searchTerm});
                            }}/>
                       </div>

                    </div>
                    <div className ="dropdown">
                        <div className="control" onClick={() => {
                                if(!open) {
                                    this.setState({open: true});
                                } else {
                                    this.setState({open: false});
                                }
                            }}>
                            <div className="selected-value">{this.state.value }</div>       
                            <div className={`arrow ${open ? "open" : null}`}></div>
                        </div>
                        <div className={`${this.state.filtered ? "show" : "hidden"}`} 
                            onClick={ 
                                () => {
                                    this.setState({filtered: null});
                                    this.setState({value: "Types"});
                                }
                            }>
                            <img src={x} alt="" />
                        </div>
                        <div className={`options ${open ? "open" : null}`}>
                            {types.map((type, i) => (
                            <div key={i} className={`option`}
                            onClick= {() => {
                                this.setState({value: type});
                                this.setState({open: false});
                            }}
                            >{type}</div>
                            ))}
                        </div>
                    </div>
                    <FilterBar/>
                </div>
            </div>
                <div id="poke-feed" className="grid">
                    {   
                        display.map((poke) => <Card key={poke.id} id={poke.id} name={poke.name} type={poke.types} isFavorite={poke.isFavorite} image={poke.image} clickHandler={this.clickHandler} />)
                    }
                </div>
            </div>
        </>
        )
    }
}


  