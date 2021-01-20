import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from '../utils/productItem/ProductItem'

const DetailProduct = () => {
  const params = useParams();
  //console.log(params);
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setdetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setdetailProduct(product);
      });
    }
  }, [params.id, products]);

  //   console.log(detailProduct);

  if (detailProduct.length === 0) return null;
  return (
    <div>
      <img src={detailProduct.images.url} />
      <h2>{detailProduct.title}</h2>
      <h5>{detailProduct.product_id}</h5>
      <p>${detailProduct.price}</p>
      <p>${detailProduct.description}</p>
      <p>${detailProduct.content}</p>
      <p>${detailProduct.sold}</p>
      <Link to="/cart">Buy Now</Link>

      <div>
        <h2>Related products</h2>
        <div>
            {
                products.map(product => {
                    return product.category === detailProduct.category ? 
                    <ProductItem key={product._id} product={product} /> : null
                })
            }
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
