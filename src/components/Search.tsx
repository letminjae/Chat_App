import React from "react";
import styled from "styled-components";

const Main = styled.div`
  border-bottom: 1px solid gray;
`;

const SearchForm = styled.div`
  padding: 10px;
  input {
    background-color: transparent;
    border: none;
    color: #fff; 
    outline: none;

    &::placeholder {
      color: lightgray;
    }
  }
`;

function Search() {
  return (
    <Main>
      <SearchForm>
        <input type="text" placeholder="유저 검색"/>
      </SearchForm>
    </Main>
  );
}

export default Search;
