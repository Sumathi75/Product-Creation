import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

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
        return viewProduct; 
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
                        <td><img src={viewProduct.thumbnail} alt="" width="100" /></td>
                        <td>
                            {viewProduct.mainImages.map((img, index) => (
                                <img key={index} src={img} alt={`Main ${index}`} width="100" />
                            ))}
                        </td>
                        <td>{viewProduct.category}</td>
                        <td>{viewProduct.stock}</td>
                        <td>{viewProduct.weight} </td>
                        <td>
                            {viewProduct.countryPrices.map((price, index) => (
                                <div key={index}>
                                    {price.countryName} ({price.countryCode}): ${price.price}
                                </div>
                            ))}
                        </td>
                        <td>
                            {viewProduct.nutritionValues.map((nutrition, index) => (
                                <div key={index}>
                                    {nutrition.name}: {nutrition.amount} {nutrition.unit}
                                </div>
                            ))}
                        </td>
                        <td>
                            {viewProduct.specifications.map((spec, index) => (
                                <div key={index}>
                                    {spec.name}: {spec.value}
                                </div>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default View;
