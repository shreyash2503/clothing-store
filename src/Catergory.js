import React from 'react';
import './categories.styles.scss'

export const Catergory = () => {
  const categories = [
    {
      "id": 1,
      "category": "hats",
      "src": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "category": "jackets",
      "src": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "category": "sneakers",
      "src": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "category": "womens",
      "src": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "category": "mens",
      "src": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ]
  return (

    <div className="categories-container">
      <div className="directory-container">
        {categories.map((category) => {
          return <div className="category-container" key={category.id}>
            <div
              className='background-image'
              style={{
                backgroundImage: `url(${category.src})`,
              }}
            />
            <div className="category-body-container">
              <h2>{category.category}</h2>
              <p>Shop Now</p>
            </div>
          </div>
        })}
      </div>

    </div>
  )
}
