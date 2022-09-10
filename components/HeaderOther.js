import React from 'react';
import Navbar from './Navbar';

function HeaderOther() {
  return (
    <>
      <Navbar />
      <div className="p-5 text-center bg-image bg_image_other_header" style={{ height: '600px' }}>
        <div className="mask" style={{ backgroundColor: '#00000078' }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1>Base Biblique</h1>
              <p>Retour aux fondements bibliques</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderOther;