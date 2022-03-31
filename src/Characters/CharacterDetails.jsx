import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Col, Container, Row } from "react-bootstrap"

export const CharacterDetails = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState()

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => response.json())
            .then(character => setCharacter(character))
    }, [id])

    const { name, gender, species, type, status, origin, location, image } = character || {}

    return !character? <div>not found</div> : (
        <Container fluid>
            <Row className="mb-3">
                <Col xs="12" md="6">
                    <div>Name: {name}</div>
                    <div>Gender: {gender}</div>
                    <div>Species: {species}</div>
                </Col>
                <Col xs="12" md="6">
                    <div>Type: {type}</div>
                    <div>Status: {status}</div>
                    <div>Origin: {origin.name}</div>
                    <div>Location: {location.name}</div>
                </Col>
                <Col xs="12">
                    <img src={image} alt={`${name} picture`}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/characters/${id - 1}`}><Button> Previous </Button></Link>
                    <Link to={`/characters`}><Button> Go Back </Button></Link>
                    <Link to={`/characters/${+id + 1}`}><Button> Next </Button></Link>
                </Col>
            </Row>
        </Container>
    )
}