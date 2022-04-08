import { Form, Row, Container, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useTextInput } from "../shared/customHooks"

export const CreateProduct = () => {
    const [name, setName] = useTextInput('')
    const [price, setPrice] = useTextInput('')
    const [stock, setStock] = useTextInput('')
    const [category, setCategory] = useTextInput(1)

    const navigate = useNavigate()
    
    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const product = {
                name,
                price: +price,
                stock: +stock,
                category: +category
            }
            const token = localStorage.getItem('userToken')
            const response = await fetch('http://localhost:5000/products', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(product)
            })
            if(response.ok) {
                const { id } = await response.json()
                navigate(`/products/${id}`)
            }
        } catch (error) {
            console.log('error', error)
        }
        console.log('goes on')
    }

    return (
        <Container>
            <Row>
                <Col className="ml-3 mr-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label  className="mt-3">Name</Form.Label>
                        <Form.Control value={name} onChange={setName} type="text" placeholder="character name" />
                        <Form.Label  className="mt-3">Price</Form.Label>
                        <Form.Control value={price} onChange={setPrice} type="number"/>
                        <Form.Label  className="mt-3">Stock</Form.Label>
                        <Form.Control value={stock} onChange={setStock} type="number"/>
                        <Form.Label  className="mt-3">Category</Form.Label>
                        <Form.Select aria-label="Default select example" value={category} onChange={setCategory}>
                            <option value="1">Tools</option>
                            <option value="2">Food</option>
                        </Form.Select>
                        <Form.Control className="mt-3" type="submit"/>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}