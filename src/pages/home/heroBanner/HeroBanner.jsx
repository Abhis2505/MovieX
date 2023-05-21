import React, {useState, useEffect} from 'react'
import './heroBanner.scss'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Image'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

function HeroBanner() {

  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const {url} = useSelector(state => state.home)

  const {data, loading, error} = useFetch("/movie/popular")

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 
      data.results.length)].backdrop_path
    setBackground(bg)
  }, [data])

  const searchQueryHandler = (e) => {
    if(e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="hero--banner">

      {!loading && <div className="hero--banner--bg">
        <Img src={background} />
      </div>}

      <div className="opacity--layer"></div>

      <ContentWrapper>
        <div className="hero--banner--content">

          <span className="title">Welcome</span>

          <span className="sub--title">
            Millions of movies, TV shows and people to discover. 
            Explore now
          </span>

          <div className="search--box">
            <input 
              type="text" 
              placeholder="Search for a movie, tv show, person..."
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => {
              if(query.length > 0) {
                navigate(`/search/${query}`)
              }
            }}>Search</button>
          </div>

        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner