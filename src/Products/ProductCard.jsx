import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const ProductCard = ({ id, name, price, stock, categoryName }) =>
    <Card>
    <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
            <div>"price": {price}</div>
            <div>"stock": {stock}</div>
            <div>"categoryName": {categoryName}</div>
        </Card.Text>
        { id && <Link to={`/products/${id}`}><Button>View Details</Button></Link> }
    </Card.Body>
    </Card>
