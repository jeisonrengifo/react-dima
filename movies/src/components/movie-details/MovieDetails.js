import React,{Component} from 'react'

class MovieDetails extends Component{
    render(){
        return(
            <div className="w-25 border p-4 d-flex flex-column">
                <h5>{this.props.movie.title}</h5>
                <hr className="w-100"/>
                <img className="d-block mx-auto" src={this.props.movie.img}/>
                <hr className="w-100"/>
                <span className="text-secondary">{this.props.movie.details}</span>
                <hr className="w-100"/>
                <span className="">{this.props.movie.description}</span>
            </div>
        )
    }
}
export default MovieDetails