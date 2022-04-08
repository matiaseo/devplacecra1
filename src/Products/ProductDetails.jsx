import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Col, Container, Row } from "react-bootstrap"
import { ProductCard } from "./ProductCard"

export const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const { name, price, stock, categoryName } = product || {}

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())
            .then(product => setProduct(product))
    }, [id])

        
    return !product? <div>not found</div> : (
        <Container fluid>
            <Row>
                <Col>
                    <Link to={`/products`}><Button> Go Back </Button></Link>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs="12" md="6">
                <ProductCard 
                    name={name}
                    price={price}
                    stock={stock}
                    categoryName={categoryName}
                />
                </Col>
            </Row>
        </Container>
    )
}