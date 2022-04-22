import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useUserContext } from '../Login'

import { CreateProduct } from './CreateProduct'
import { ProductDetails } from './ProductDetails'
import { ProductsList } from './ProductsList'

export const Products = () => {
    const { role, setRole } = useUserContext()
    console.log(role)

    useEffect(() => {
        setRole('admin')
    }, [])

    return (
        <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/:id" element={<ProductDetails />} />
            <Route path="*" element={404} />
        </Routes>
    )
}