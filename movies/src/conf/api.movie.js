import * as axios from 'axios'

const apiMovie= axios.create({
    baseURL :'https://api.themoviedb.org/4'
})

apiMovie.interceptors.request.use(req => {
    req.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDU5MDVmMWEyZDhiOTc4OWQyMGQ0ODNmZTJhYjAwYiIsInN1YiI6IjVmNmEyMmUzYzFmZmJkMDAzNGNlZjM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6nKnpFhwbL_wNuK_5OXeW7h4HDr_mmLc-5SEQKNRHT0'
    return req;
})

export default apiMovie;

export const apiMovieMap =  m => ({
    img:'https://image.tmdb.org/t/p/w500' + m.poster_path,
    title:m.title,
    details: `${m.release_date} | ${m.vote_average}/10 (${m.vote_count})`,
    description:m.overview

  })