import React, {useState, useContext} from 'react'
import { GlobalState } from '../../../GlobalState.js'
import axios from "axios";

const Categories = () => {
    const state = useContext(GlobalState)
    const [categories, setCategories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callBack, setCallBack] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setId] = useState('')

    const createCategory = async (e) => {
        e.preventDefault()
        try{
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.message)
            }else {
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.message)
            }
            setOnEdit(false)
            setCategory('')
            setCallBack(!callBack)

        }catch (err){
            alert(err.response.data.message)
        }
    }

    const editCategory = async (id, name) => {
        setId(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async (id) => {
        try{
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.message)
            setCallBack(!callBack)
        }catch (err){
            alert(err.response.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={createCategory}>
                <input type="text" name="category" value={category}
                       onChange={e => setCategory(e.target.value)}
                       required/>
                <button type="submit">{onEdit ? "Update" : "Save"}</button>
            </form>

            <div>
                {
                    categories.map(category => (
                        <div key={category._id}>
                            <p>{category.name}</p>
                            <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                            <button onClick={() => deleteCategory(category._id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories