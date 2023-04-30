const APY_KEY = '4287ad07&s'
export const searchMovies = async ({search}) => {
    if(search === '') return null
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=${APY_KEY}=${search}`)
        const json = await response.json()
        const mappedMovies = json?.Search?.map(movie =>(
            {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            type: movie.Type
          }
                    ))
        return mappedMovies
    }catch(e){
        console.log(e)
        throw new Error('Error searching movies')
    }
}