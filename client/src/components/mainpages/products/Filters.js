import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState.js'

const Filters = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories;
    const [category, setCategory] = state.productsAPI.category;
    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    return (
        <div>
            <span>Filters</span>
            <select name="category" value={category} onChange={handleCategory}>
                <option value="">All products</option>
                {
                    categories.map(category => (
                        <option value={"category=" + category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
            <input type="text" value={search} placeholder="Enter your search"
                   onChange={e => setSearch(e.target.value.toLowerCase())} />

            <span>Sort By</span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="">Newest</option>
                <option value="sort=oldest">Oldest</option>
                <option value="sort=-price">Price: Hight-low</option>
                <option value="sort=price">Price: Low-Hight</option>
            </select>
        </div>
    )
}

export default Filters