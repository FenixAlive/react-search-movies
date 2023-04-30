
import { Movies } from './components/movies'
import './App.css'

import {useMovies} from './hooks/useMovie'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)
  const [search, setSearch] = useState('')
  const {movies, getMovies, loading, error} = useMovies({search, sort})
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    //if you want without state:
    //const {query} = Object.fromEntries(new window.FormData(event.target))
    //if(!query?.length || query?.length === 0) return
    getMovies({search})
  }

  const debounceGetMovies = useCallback(debounce(search => {
    console.log(search)
    getMovies(search)
  }, 500), [])

  const handleOnChange = (event) => {
    setSearch(event.target.value)
    debounceGetMovies({search: event.target.value})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
      <h1>Movies Search</h1>
      <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleOnChange} value={search} className='input-search-movie' type="text" placeholder='Iron Man, Avengers, ...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button className='button-search-movie' type='submit'>Search</button>
        </form>
      </header>
      <main>
        {loading ? <p>loading ... </p> : <Movies movies={movies}/>}
        {error ? <p>Error: {error}</p> : ''}
      </main>
    </div>
  )
}

export default App
//  http://www.omdbapi.com/?apikey=4287ad07&s=avengers

//useRef - value that persist over renders of component