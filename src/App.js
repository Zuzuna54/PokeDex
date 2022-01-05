import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/dropdown.css';
import {Home} from './components/home';
import PokeDisplayPlaceHolder from './components/pokePlaceholder';
import { loadAllPokemon } from './requests/request';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ allPoke: [] };
  }

  async componentDidMount() {
    let allPoke = await loadAllPokemon();
    this.setState({allPoke});
}

  render() { 
    const {allPoke} = this.state;
    if(!allPoke) {
      return null;
    }
    
    return (
      <Router>
        <div>
          <section className="section">
            <div className="container">
              <Routes>
                <Route exact path="/pokemons/:name" element={ <PokeDisplayPlaceHolder/> } />
                <Route exact path="/" element={ <Home allPoke={this.state.allPoke}/> } />
              </Routes>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}
