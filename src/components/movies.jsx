

export function ListOfMovies({movies}){

return (

            <ul className='movies'>
              {
                movies.map(movie => (
                  <li key={movie?.id} className="movie">
                    <h3>{movie?.title}</h3>
                    <div className='movie-data'>
                    <p className='type'>{movie?.type}</p>
                    <p>{movie?.year}</p>
                    </div>
                    
                    
                    <img src={movie?.poster} alt={movie?.title} />
                    
                  </li>
                )
                  
                )
              }
            </ul>
  )
    }

export function NoMoviesResult () {
    return (
        <p>No movies found</p>
    )
}

export function Movies ({movies}){
    const hasMovies = movies?.length > 0
    return (
        hasMovies ? <ListOfMovies movies={movies} /> :
        <NoMoviesResult/>
    )
}