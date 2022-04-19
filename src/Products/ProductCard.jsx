import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { useUserRole } from '../Login'

export const ProductCard = ({ id, name, price, stock, categoryName }) => {
    const userRole = useUserRole()
    const isAdmin = userRole === 'admin'
    return (
        <Card>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>"price": {price}</Card.Text>
            <Card.Text>"stock": {stock}</Card.Text>
            <Card.Text>"categoryName": {categoryName}</Card.Text>
            { id && <Link to={`/products/${id}`}><Button>View Details</Button></Link> }
            { isAdmin && <Button>Delete</Button> }
        </Card.Body>
        </Card>
    )
}
