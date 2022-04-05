import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const CharacterCard = ({id, name, species, image}) =>
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={image} alt={`${name} picture`}/>
    <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
            {species}
        </Card.Text>
        <Link to={`/characters/${id}`}><Button>View Details</Button></Link>
    </Card.Body>
    </Card>
