import { Route, Routes } from 'react-router-dom'

import { CreateProduct } from './CreateProduct'
import { ProductDetails } from './ProductDetails'
import { ProductsList } from './ProductsList'

export const Products = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/:id" element={<ProductDetails />} />
            <Route path="*" element={404} />
        </Routes>
    )
}