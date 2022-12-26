import React, { useState } from 'react';
import './styles/ProductImages.scss'

function ProductImages({imgs}) {
  const [mainImage, setMainImage] = useState(imgs[0]);
  return (
    <section id="product-images">
      <div className="grid grid-four-column">
        {imgs.map((curElm, index) => {
          return (
            <figure key={index}>
              <img
                src={curElm.url}
                alt={curElm.filename}
                className="box-image--style"
                key={index}
                onClick={() => setMainImage(curElm)}
              />
            </figure>
          );
        })}
      </div>
      {/* 2nd column  */}
      <div className="main-screen">
        <img src={mainImage.url} alt={mainImage.filename} />
      </div>
    </section>
  )
}

export default ProductImages