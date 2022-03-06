import React, { useState } from 'react';
import styled from 'styled-components'
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
import Axios from "axios"
export const API_KEY = process.env.REACT_APP_MY_API_KEY;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  `;
  const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: #fff;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;

`;

const SeacrhIcon = styled.img`
  width: 32px;
  height: 32px;
`

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;

`
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px
  justify-content: space-evenly;

`;

const Placeholder = styled.img`
  
  opacity: 50%;
  height: 120px;
  width: 120px;
  margin: auto;
  
`

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async(searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  }

  const onTextChange = (event) => {
    //debouncing api call
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeOut = setTimeout(()=> fetchData(event.target.value), 500);
    updateTimeoutId(timeOut);
  }
  return (
    <Container>
      <Header>
        <AppName>
        <MovieImage src="/movie-icon.svg"/>
          Search Movie</AppName>
        <SearchBox >
          <SeacrhIcon src='/search-icon.svg' />
          <SearchInput placeholder='Type Movie Name' value={searchQuery} onChange={onTextChange}/>
          </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {
          movieList?.length? movieList.map((movie, index)=>(<MovieComponent key = {index} movie={movie} onMovieSelect={onMovieSelect}/>)):(
            <Placeholder src="/movie-icon.svg" />
          )
        }
      </MovieListContainer>
    </Container>
     
    
  );
}

export default App;
//a7faf26d