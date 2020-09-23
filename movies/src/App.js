import React, {Component} from 'react';
import logo from './logo.svg';
import {Header} from './components/index'
import * as axios from 'axios'
import apiMovie, {apiMovieMap} from './conf/api.movie'
import Films from './features/films';
import Favoris from './features/favoris';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { FavoriList } from './features/favoris/components';



class App extends Component {

  constructor(props){
    super(props);

    this.state={
      movies:null,
      selectedMovie:0,
      loaded:false,
      favoris:[]
    }

  }

  updateSelectedMovie=(index)=>{
    
    this.setState({
      selectedMovie:index
    })

  }

  componentDidMount(){
    apiMovie.get('/discover/movie')
            .then( response => response.data.results)
            .then(moviesApi =>{
                const movies = moviesApi.map(apiMovieMap)
                this.updateMovies(movies);
            })
            .catch(err => console.log(err));
  }

  updateMovies=(movies)=>{
    this.setState({
      movies,
      loaded:true
    })
  }

  addFavori =(title) => {
    //getting favorit array values
    const favoris = this.state.favoris.slice();
    const film = this.state.movies.find(m=>m.title===title);
    favoris.push(film);

    this.setState({
      favoris
    })
  }

  removeFavori=(title)=>{
    const favoris =this.state.favoris.slice();
    //finding favorite index to later delete it
    const index = this.state.favoris.findIndex(f=>f.title===title);
    //deleting favorite 
    favoris.splice(index,1);
     this.setState({
       favoris
     })

  }

  render(){

  return (
          <Router>
            <div className="App d-flex flex-column">
              <Header/>
              <Switch>
                <Route path="/films" render={(props)=>{
                    return(
                      <Films
                            {...props}
                            loaded={this.state.loaded}
                            updateMovies={this.updateMovies}
                            updateSelectedMovie={this.updateSelectedMovie}
                            movies={this.state.movies}
                            selectedMovie={this.state.selectedMovie}
                            addFavori={this.addFavori}
                            removeFavori={this.removeFavori}
                            favoris={this.state.favoris.map(f=>f.title)}
                    /> )  
                }}/>
                <Route path="/favoris" render={(props) =>{
                    return(
                            <Favoris
                                favoris={this.state.favoris}
                                removeFavori={this.removeFavori}                            
                            />
                    )
                  }
                }/>
                <Redirect to="/films"/>
              </Switch>
                  
            </div>
          </Router>
    );
  }
}

export default App;