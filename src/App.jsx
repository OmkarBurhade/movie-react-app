import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import TvShows from './components/TvShows'
import People from './components/People'
import Moviedetails from './components/Moviedetails'
import Tvdetails from './components/Tvdetails'
import Persondetails from './components/Persondetails'
import Trailer from './components/partials/Trailer'
import Playmovie from './components/partials/Playmovie'
import PageNotfound from './components/partials/PageNotfound'
import About from './components/About'
const App = () => {
  return (
    <div className=' flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<Moviedetails />} >
          <Route path='/movie/details/:id/trailer' element={<Trailer />} />
          <Route path='/movie/details/:id/movie' element={<Playmovie />} />
        </Route>
        <Route path='/tv' element={<TvShows />} />
        <Route path='/tv/details/:id' element={<Tvdetails />} >
          <Route path='/tv/details/:id/trailer' element={<Trailer />} />
          <Route path='/tv/details/:id/tv' element={<Playmovie />} />

        </Route>

        <Route path='/person' element={<People />} />
        <Route path='/person/details/:id' element={<Persondetails />} />
        <Route path='*' element={<PageNotfound />} />

      </Routes>
    </div>
  )
}

export default App