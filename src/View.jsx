import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function View({ products }) {
  const { id } = useParams();
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      setViewProduct(product);
    }
  }, [id, products]);

  if (!viewProduct) {
    return <div>Loading...</div>; // A fallback in case the product isn't found yet
  }

  return (
    <div className="view_body">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Thumbnail Image</th>
            <th>Main Images</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Weight in Grams</th>
            <th>Country Prices</th>
            <th>Nutrition Values</th>
            <th>Specifications</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{viewProduct.title}</td>
            <td>{viewProduct.description}</td>
            <td>
              {viewProduct.thumbnail ? (
                <img src={URL.createObjectURL(viewProduct.thumbnail)} alt="Thumbnail" width="100" />
              ) : (
                "No Thumbnail"
              )}
            </td>
            <td>
              {viewProduct.mainImages.length > 0 ? (
                viewProduct.mainImages.map((img, index) => (
                  <img key={index} src={URL.createObjectURL(img)} alt={`Main ${index}`} width="100" />
                ))
              ) : (
                "No Main Images"
              )}
            </td>
            <td>{viewProduct.category}</td>
            <td>{viewProduct.stock}</td>
            <td>{viewProduct.weight} grams</td>
            <td>
              {viewProduct.countryPrices.length > 0 ? (
                viewProduct.countryPrices.map((price, index) => (
                  <div key={index}>
                    {price.countryName} ({price.countryCode}): ${price.price}
                  </div>
                ))
              ) : (
                "No Country Prices"
              )}
            </td>
            <td>
              {viewProduct.nutritionValues.length > 0 ? (
                viewProduct.nutritionValues.map((nutrition, index) => (
                  <div key={index}>
                    {nutrition.name}: {nutrition.amount} {nutrition.unit}
                  </div>
                ))
              ) : (
                "No Nutrition Values"
              )}
            </td>
            <td>
              {viewProduct.specifications.length > 0 ? (
                viewProduct.specifications.map((spec, index) => (
                  <div key={index}>
                    {spec.name}: {spec.value}
                  </div>
                ))
              ) : (
                "No Specifications"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default View;
