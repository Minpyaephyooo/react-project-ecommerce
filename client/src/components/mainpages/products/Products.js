import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import axios from "axios";
import Filters from "./Filters";

const Products = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [isCheck, setIsCheck] = useState(false)
  // console.log(products);

    const handleCheck = async (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        //console.log({id, public_id})
        try{
            const destroyImg = await axios.post('/api/destroy', {public_id}, {
                headers: {Authorization: token}
            })

            const deleteProduct = await axios.delete(`/api/products/${id}`,{
                headers: {Authorization: token}
            })

            await destroyImg;
            await deleteProduct
            setCallback(!callback)
        }catch (err){
            alert(err.response.data.message)
        }
    }

    const checkAll = () => {
      products.forEach(product => {
          product.checked = !isCheck
      })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
      products.forEach(product => {
          if(product.checked) deleteProduct(product._id, product.images.public_id)
      })
    }

  return (

    <div className="products">
        <div>
            <Filters />
            {
                isAdmin && <div>
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll}/>
                    <button onClick={deleteAll}>Delete all</button>
                </div>
            }
        </div>
<div>
    {products.map((product) => {
        return (
            <ProductItem key={product._id}
                         product={product}
                         isAdmin={isAdmin}
                         deleteProduct={deleteProduct}
                         handleCheck={handleCheck}

            />
        );
    })}
    <div>
        {/* {
          products.length === 0 && <Loading />
        } */}
    </div>
</div>
    </div>
    
  );
};

export default Products;
