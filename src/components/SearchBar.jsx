import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import './searchBar.css'

function SearchBar({ setSearchTerm }) {

  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setSearchTerm(query);
  }



  return (
    <div className='container-fluid flex-column d-flex justify-content-center align-items-center'>
      <Form className="containter-fluid d-flex col-lg-5 col-12 my-4">
        <Form.Control onChange={(e) => setQuery(e.target.value)} value={query}
          type="search"
          name='searcher'
          placeholder="Buscar..."
          className="me-2 form-control-lg"
          aria-label="Search"
          data-bs-theme="light"
        />
        <Button className='bg-dark btn btn-md' onClick={handleSearch} variant="outline-light"><BsSearch size='2rem' /></Button>
      </Form>
    </div>
  )
}

export default SearchBar;
