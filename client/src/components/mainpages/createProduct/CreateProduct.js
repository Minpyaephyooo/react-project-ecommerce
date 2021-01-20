import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import { GlobalState } from '../../../GlobalState.js'
import { useHistory, useParams } from "react-router-dom";

const CreateProduct = () => {

    const initialState = {
        product_id: '',
        title: '',
        price: '',
        description: 'Descriptions',
        content: 'Content',
        category: '',
// edit
        _id: ''
    }


    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const[products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback,setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id){
                    setProduct(product)
                    setImages(product.images)
                }
            })

        }else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async (e) => {
        e.preventDefault()
        try{
            if(!isAdmin) return alert("Your not an admin")
            const file = e.target.files[0]
            // console.log(file)
            if(!file) return alert("File not exit")

            if(file.size > 1024 * 1024) //
                return alert('Size too large')

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') //
                return alert('File format is incorrect')

            let formData = new FormData()
            formData.append('file', file)
            //setLoading(true)
            const res = await axios.post('/api/upload ', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            // console.log(res)
            setImages(res.data)
        }catch (err){
            alert(err.response.data.message)
        }
    }

    const handleDestroy = async (e) => {
        try{
            if(!isAdmin) return alert("Your not an admin")
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setImages(false)
        }catch (err){
            alert(err.response.data.message)
        }
    }

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(!isAdmin) return alert("Your not an admin")
            if(!images) return alert("No image upload")

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else {
                await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push('/')
            return alert("Success created");
        }catch (err){
            alert(err.response.data.message)
        }
    }
    return (
        <div>
           <div>
               <input type="file" name="file" id="file_up" onChange={handleUpload}/>
               <img src={images ? images.url : ''}  alt=""/>
               <button onClick={handleDestroy}>X</button>
           </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="product_id" >Product ID</label>
                        <input type="text" disabled={onEdit} name="product_id" onChange={handleChangeInput} id="product_id" value={product.product_id} required />
                    </div>
                    <div>
                        <label htmlFor="title" >Title</label>
                        <input type="text" name="title" id="title" onChange={handleChangeInput} value={product.title} required />
                    </div>
                    <div>
                        <label htmlFor="price" >Price</label>
                        <input type="number" name="price" id="price" onChange={handleChangeInput} value={product.price} required />
                    </div>
                    <div>
                        <label htmlFor="description" >Description</label>
                        <textarea name="description" id="description" onChange={handleChangeInput} value={product.description} required />
                    </div>
                    <div>
                        <label htmlFor="content" >Content</label>
                        <input type="text" name="content" id="content" onChange={handleChangeInput} value={product.content} required />
                    </div>
                    <div>
                        <label htmlFor="categories" >Categories</label>
                        <select name="category" value={product.category} onChange={handleChangeInput}>
                            <option value="">Please select a category</option>
                            {
                                categories.map(category => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <button type="submit">{onEdit ? "Update" : "Submit"}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct