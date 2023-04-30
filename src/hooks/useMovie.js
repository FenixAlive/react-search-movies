import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({search, sort}){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    //prevent repeat search using useRef
    const previousSearch = useRef()
  
    //useCallback same as useMemo but do not require to create a function
  const getMovies = useCallback(async ({search}) => {
        if(previousSearch.current === search) return
        try{
            setLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovies = await searchMovies({search})
            setMovies(newMovies)
        }catch(e){
            setError(e?.message)
        }finally{
            setLoading(false)
        }
      },[]) 

  //call useMemo only when dependencies change (second parameter) [sort, movies] in this case
  const sortedMovies = useMemo(() => {
    if(!movies?.sort) return movies
    return sort ? [...movies].sort((a,b)=> a.title?.localeCompare(b.title)) : movies
  }, [sort, movies])


  return {movies: sortedMovies, getMovies, loading, error}
}