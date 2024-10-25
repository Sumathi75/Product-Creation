import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductCreationForm.css";

function Edit({ products, editProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    mainImages: [],
    category: "",
    stock: 0,
    weight: 0,
    countryPrices: [{ countryName: "", countryCode: "", price: "" }],
    nutritionValues: [{ name: "", amount: "", unit: "" }],
    specifications: [{ name: "", value: "" }],
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [previewMainImages, setPreviewMainImages] = useState([]);

  useEffect(() => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      setFormData({
        title: product.title,
        description: product.description || "",
        thumbnail: product.thumbnail || null,
        mainImages: product.mainImages || [],
        category: product.category || "",
        stock: product.stock || 0,
        weight: product.weight || 0,
        countryPrices: product.countryPrices || [
          { countryName: "", countryCode: "", price: "" },
        ],
        nutritionValues: product.nutritionValues || [
          { name: "", amount: "", unit: "" },
        ],
        specifications: product.specifications || [{ name: "", value: "" }],
      });
      setPreviewThumbnail(
        product.thumbnail ? URL.createObjectURL(product.thumbnail) : null
      );
      setPreviewMainImages(
        product.mainImages.map((file) => URL.createObjectURL(file))
      );
    }
  }, [id, products]);

  const categories = ["Electronics", "Clothing", "Home"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") {
      setFormData({ ...formData, thumbnail: files[0] });
      setPreviewThumbnail(URL.createObjectURL(files[0]));
    } else {
      const mainImagesArray = Array.from(files);
      setFormData({ ...formData, mainImages: mainImagesArray });
      setPreviewMainImages(
        mainImagesArray.map((file) => URL.createObjectURL(file))
      );
    }
  };

  const handleAddField = (section) => {
    const newField =
      section === "countryPrices"
        ? { countryName: "", countryCode: "", price: "" }
        : section === "nutritionValues"
        ? { name: "", amount: "", unit: "" }
        : { name: "", value: "" };

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

    if (formData.title.length < 3) {
      alert("Title must be at least 3 characters long.");
      return;
    }
    if (formData.description.length < 10) {
      alert("Description must be at least 10 characters long.");
      return;
    }
    if (!formData.thumbnail) {
      alert("Please upload a thumbnail image.");
      return;
    }
    if (formData.mainImages.length !== 3) {
      alert("Please upload exactly 3 main images.");
      return;
    }

    editProduct(parseInt(id), formData);
    navigate("/");
  };

  return (
    <>
      <div className="form">
        <div className="inner-body">
          <h2>Product Creation Form</h2>

          <form onSubmit={handleSubmit} className="form_body">
            <div className="form-group">
              <label>Title:</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Thumbnail Image:</label>
              <input
                className="form-control"
                type="file"
                name="thumbnail"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                // required
              />
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="Thumbnail preview"
                  width="100"
                />
              )}
            </div>

            <div className="form-group">
              <label>Main Images (Upload exactly 3):</label>
              <input
                className="form-control"
                type="file"
                name="mainImages"
                accept="image/jpeg, image/png"
                multiple
                onChange={handleFileChange}
                // required
              />
              <div>
                {previewMainImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Main ${index}`}
                    width="100"
                  />
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select
                className="form-control"
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

            <div className="form-group">
              <label>Stock:</label>
              <input
                className="form-control"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Weight in Grams:</label>
              <input
                className="form-control"
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
              <div key={index} className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="countryName"
                  placeholder="Country Name"
                  value={price.countryName}
                  onChange={(e) => handleFieldChange(e, "countryPrices", index)}
                  required
                />
                <input
                  className="form-control"
                  type="text"
                  name="countryCode"
                  placeholder="Country Code"
                  value={price.countryCode}
                  onChange={(e) => handleFieldChange(e, "countryPrices", index)}
                  required
                />
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={price.price}
                  onChange={(e) => handleFieldChange(e, "countryPrices", index)}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("countryPrices")}
              className="btns"
            >
              Add More Country Price
            </button>
            <h3>Nutrition Values:</h3>
            {formData.nutritionValues.map((nutrition, index) => (
              <div key={index} className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={nutrition.name}
                  onChange={(e) =>
                    handleFieldChange(e, "nutritionValues", index)
                  }
                />
                <input
                  className="form-control"
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={nutrition.amount}
                  onChange={(e) =>
                    handleFieldChange(e, "nutritionValues", index)
                  }
                />
                <input
                  className="form-control"
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  value={nutrition.unit}
                  onChange={(e) =>
                    handleFieldChange(e, "nutritionValues", index)
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("nutritionValues")}
              className="btns"
            >
              Add More Nutrition Value
            </button>
            <h3>Specifications:</h3>
            {formData.specifications.map((spec, index) => (
              <div key={index} className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={spec.name}
                  onChange={(e) =>
                    handleFieldChange(e, "specifications", index)
                  }
                />
                <input
                  className="form-control"
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) =>
                    handleFieldChange(e, "specifications", index)
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("specifications")}
              className="btns"
            >
              Add More Specification
            </button>
            <div className="create-btn form-group">
              <button type="submit" className="btns-c">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
