import React, { useContext, useState, useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from "react-router-dom";
import axios from 'axios'

const Cart = () => {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() => {

        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }
        getTotal()
    },[cart])

    const addToCart = async () => {
        await  axios.patch('/user/addcart', { cart }, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart()
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart()
    }

    const removeProduct = (id) => {
        if(window.confirm("Do you want to delete this prodict?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart()
        }
    }

    if(cart.length === 0)
    return <div style={{textAlign: 'center'}}>
            <h2>Cart Empty</h2>
        </div>

    return (
        <div>
            {
                cart.map(product => (
                    <div key={product._id}>
                        <img src={product.images.url} />
                        <h2>{product.title}</h2>
                        <h5>{product.product_id}</h5>
                        <p>${product.price * product.quantity}</p>
                        <p>${product.description}</p>
                        <p>${product.content}</p>
                        <button onClick={() => decrement(product._id)}> - </button>
                        <span>{product.quantity}</span>
                        <button onClick={() => increment(product._id)}> + </button>

                        <button onClick={() => removeProduct(product._id)}>X</button>
                    </div>
                ))
            }

            <h3>Total $ {total}</h3>
            <Link to="!#" >Payment</Link>
        </div>
    )
}

export default Cart
