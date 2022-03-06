import React from 'react';
import styled from 'styled-components';

const MovieContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 280px;
box-shadow: 0 3px 10px 0 #aaa;
cursor: pointer;
`
const CoverImage =  styled.img`
  height: 362px;
  object-fit: cover;
`
const MvoieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: no-wrap;
  text-overflow: ellipses;
  overflow: hidden;

`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`
const MovieComponent = (props) => {
  const {Title, Year, imdbID, Type, Poster}= props.movie
  return (
   
   <MovieContainer onClick={()=> props.onMovieSelect(imdbID)}>
     <CoverImage src={Poster}/>
     <MvoieName>{Title}</MvoieName>
     <InfoColumn>
       <MovieInfo>Year: {Year}</MovieInfo>
       <MovieInfo>Type: {Type}</MovieInfo>
     </InfoColumn>
   </MovieContainer> 
  )
}

export default MovieComponent