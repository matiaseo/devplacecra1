import { useEffect, useState } from 'react'

import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useTextInput } from '../shared/customHooks'
import { Filter } from '../shared/Filter'
import { ProductCard } from './ProductCard'
import { useUserRole } from '../Login'

export const ProductsList = () => {
    const [list, setList] = useState([])
    const [filter, setFilter] = useTextInput('')
    const userRole = useUserRole()
    const isAdmin = userRole === 'admin'
    const filteredList = filter.length > 3? list.filter(product => product.name.includes(filter)) : list

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(response => response.ok? response.json() : [])
            .then(products => setList(products))
    }, [])

    return (
    <Container fluid>
        <Row>
            <Col>
                <Filter filter={filter} setFilter={setFilter} placeholder="product name" />
            </Col>
            { isAdmin &&
                <Col>
                    <Link to={`/products/create`}><Button>Create new product</Button></Link>
                </Col>
            }
        </Row>
        <Row>
            {filteredList.map(
                ({ id, name, price, stock, categoryName }) =>
                <Col key={id} lg="2" sm="4">
                    <ProductCard 
                        id={id}
                        name={name}
                        price={price}
                        stock={stock}
                        categoryName={categoryName}
                    />
                </Col>
            )}
        </Row>
    </Container>
    )
}