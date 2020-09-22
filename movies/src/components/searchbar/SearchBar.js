import { Component } from "react";
import React from 'react';
import {Formik} from 'formik'
import apiMovie, {apiMovieMap} from '../../conf/api.movie'

export default class SearchBar extends Component{
    
    submit = (values,actions)=>{
        const query = '?' + Object.keys(values).map(k => `${k}=${values[k]}&`).join('');        
        apiMovie.get('/search/movie'+ query).then( response => response.data.results)
                .then(moviesApi =>{
                    const movies = moviesApi.map( apiMovieMap)
                    this.props.updateMovies(movies);
                    actions.setSubmitting(false);
                })
                .catch(err => console.log(err));
    }
    render(){
        return (
            <Formik 
            onSubmit={this.submit}
            initialValues={ {query:'', language:'en-Us'}}>

                {
                   ({handleSubmit, handleChange, handleBlur, isSubmitting}) => (
                        <form className="d-flex flex-row p-2 m-2" onSubmit={handleSubmit}>
                            <input name="query" className="flex-fill form-control mr-2" placeholder="Search..." onChange={handleChange} onBlur={handleBlur}/>
                            <select className="mr-2 form-control w-25" name="language" onChange={handleChange} onBlur={handleBlur}>
                                <option value="en-US">English</option>
                                <option value="fr-FR">French</option>
                            </select>
                            <button className="btn btn-small btn-success" type="submit" disabled={isSubmitting}>Search</button>
                        </form>

                   )}


            </Formik>
        )
    }
}