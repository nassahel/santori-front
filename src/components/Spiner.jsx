import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './spiner.css'

function Spiner() {
  return (
    <div className='cont container-fluid d-flex align-items-center justify-content-center'>
      <Spinner animation="border" variant="warning" />;

    </div>
  )
}

export default Spiner