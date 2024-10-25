import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./View.css"

function View({ products }) {
  const { id } = useParams();
  const [viewProduct, setViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      setViewProduct(product);
    }
  }, [id, products]);

   const nextImage = () => {
    if (viewProduct && viewProduct.mainImages.length > 0) {
      setCurrentImageIndex((currentImageIndex + 1) % viewProduct.mainImages.length);
    }
  };

  const prevImage = () => {
    if (viewProduct && viewProduct.mainImages.length > 0) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + viewProduct.mainImages.length) % viewProduct.mainImages.length
      );
    }
  };

  if (!viewProduct) {
    return <div>Loading...</div>; 
  }

  return (
    <>
    <div className="view-body">
      <div className="view-content">
        <div className="view-head">
          <h2>Product View</h2>
        </div>
        <section className="view-details">
          <div className="view-leftside">
          <div className="images-slides">
          {viewProduct.mainImages.length > 0 ? (
                  <>
                    <button onClick={prevImage} className="slider-button"> <i class="fa-solid fa-arrow-left"></i> </button>
                    <img 
                      src={URL.createObjectURL(viewProduct.mainImages[currentImageIndex])} 
                      alt={`Slide ${currentImageIndex + 1}`} 
                      className="slider-image"
                    />
                    <button onClick={nextImage} className="slider-button"><i class="fa-solid fa-arrow-right"></i></button>
                  </>
                ) : (
                  <p>No Main Images</p>
                )}
          </div>
          </div>
          <div className="view-rightside">
            <div className="view-rs-detailing">
              <p className="view-para">Title : {viewProduct.title}</p>
              <p className="view-para">Description : {viewProduct.description}</p>
              <p className="view-para">Category : {viewProduct.category}</p>
              <p className="view-para">Stock : {viewProduct.stock}</p>
              <p className="view-para">Weight : {viewProduct.weight}</p>
              <p className="view-para">Price : <br/>
              {viewProduct.countryPrices.length > 0 ? (
                viewProduct.countryPrices.map((price, index) => (
                  <div key={index}>
                    {price.countryName} ({price.countryCode}): ${price.price}
                  </div>
                ))
              ) : (
                "No Country Prices"
              )}
              </p>
              <p className="view-para">Nutrition Values : <br/>
              {viewProduct.nutritionValues.length > 0 ? (
                viewProduct.nutritionValues.map((nutrition, index) => (
                  <div key={index}>
                    {nutrition.name}: {nutrition.amount} {nutrition.unit}
                  </div>
                ))
              ) : (
                "No Nutrition Values"
              )}
              </p>
              <p className="view-para">Specifications : <br/>
              {viewProduct.specifications.length > 0 ? (
                viewProduct.specifications.map((spec, index) => (
                  <div key={index}>
                    {spec.name}: {spec.value}
                  </div>
                ))
              ) : (
                "No Specifications"
              )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
   
    </>
  );
}

export default View;
