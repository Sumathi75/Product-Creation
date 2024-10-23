import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit({ products, editproduct }) {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    mainImages: [],
    category: '',
    stock: 0,
    weight: 0,
    countryPrices: [{ countryName: '', countryCode: '', price: '' }],
    nutritionValues: [{ name: '', amount: '', unit: '' }],
    specifications: [{ name: '', value: '' }],
  });

  useEffect(() => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      setFormData({
        title: product.name,
        description: product.description || '',
        thumbnail: product.thumbnail || null,
        mainImages: product.mainImages || [],
        category: product.category || '',
        stock: product.stock || 0,
        weight: product.weight || 0,
        countryPrices: product.countryPrices || [{ countryName: '', countryCode: '', price: '' }],
        nutritionValues: product.nutritionValues || [{ name: '', amount: '', unit: '' }],
        specifications: product.specifications || [{ name: '', value: '' }],
      });
    }
  }, [id, products]);

  const categories = ['Electronics', 'Clothing', 'Home'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'thumbnail') {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, mainImages: Array.from(files) });
    }
  };

  const handleAddField = (section) => {
    const newField = section === 'countryPrices'
      ? { countryName: '', countryCode: '', price: '' }
      : section === 'nutritionValues'
      ? { name: '', amount: '', unit: '' }
      : { name: '', value: '' };

    setFormData({ ...formData, [section]: [...formData[section], newField] });
  };

  const handleFieldChange = (e, section, index) => {
    const { name, value } = e.target;
    const updatedSection = [...formData[section]];
    updatedSection[index][name] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    
    if (formData.title.length < 3) {
      alert('Title must be at least 3 characters long.');
      return;
    }
    if (formData.description.length < 10) {
      alert('Description must be at least 10 characters long.');
      return;
    }
    if (!formData.thumbnail) {
      alert('Please upload a thumbnail image.');
      return;
    }
    if (formData.mainImages.length !== 3) {
      alert('Please upload exactly 3 main images.');
      return;
    }
    
    editproduct(formData); 
    navigate('/'); 
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Edit Product</h1>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Thumbnail Image:</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label>Main Images (Upload exactly 3):</label>
          <input
            type="file"
            name="mainImages"
            accept="image/jpeg, image/png"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Weight in Grams:</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <h3>Country Prices:</h3>
        {formData.countryPrices.map((price, index) => (
          <div key={index}>
            <input
              type="text"
              name="countryName"
              placeholder="Country Name"
              value={price.countryName}
              onChange={(e) => handleFieldChange(e, 'countryPrices', index)}
              required
            />
            <input
              type="text"
              name="countryCode"
              placeholder="Country Code"
              value={price.countryCode}
              onChange={(e) => handleFieldChange(e, 'countryPrices', index)}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price.price}
              onChange={(e) => handleFieldChange(e, 'countryPrices', index)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('countryPrices')}>
          Add More Country Price
        </button>

        <h3>Nutrition Values:</h3>
        {formData.nutritionValues.map((nutrition, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={nutrition.name}
              onChange={(e) => handleFieldChange(e, 'nutritionValues', index)}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={nutrition.amount}
              onChange={(e) => handleFieldChange(e, 'nutritionValues', index)}
            />
            <input
              type="text"
              name="unit"
              placeholder="Unit"
              value={nutrition.unit}
              onChange={(e) => handleFieldChange(e, 'nutritionValues', index)}
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('nutritionValues')}>
          Add More Nutrition Value
        </button>

        <h3>Specifications:</h3>
        {formData.specifications.map((spec, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={spec.name}
              onChange={(e) => handleFieldChange(e, 'specifications', index)}
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={spec.value}
              onChange={(e) => handleFieldChange(e, 'specifications', index)}
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('specifications')}>
          Add More Specification
        </button>

        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default Edit;
