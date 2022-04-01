import { useEffect, useState } from 'react'

import { CharacterCard } from './CharacterCard'
import { Col, Container, Form, Row } from 'react-bootstrap'

import { useTextInput } from '../shared/customHooks'

const preventSubmit =  event => event.preventDefault()

export const CharacterList = () => {
    const [list, setList] = useState([])

    const [filter, setFilter] = useTextInput('')

    const filterByName = filter.length > 3? `?name=${filter}` : ''
    const characterList = list.map(
        ({id, name, species, image}) =>
        <Col key={id} lg="2" sm="4">
            <CharacterCard id={id} name={name} species={species} image={image} />
        </Col>
    )

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character${filterByName}`)
            .then(response => response.ok? response.json() : {})
            .then(({ results: characters }) => characters && setList(characters))
    }, [filterByName])

    return (
    <Container fluid>
        <Row>
            <Col>
                <Form onSubmit={preventSubmit}>
                    <Form.Label>Filter</Form.Label>
                    <Form.Control onChange={setFilter} value={filter} type="text" placeholder="character name" />
                </Form>
            </Col>
        </Row>
        <Row>
            {characterList}
        </Row>
    </Container>
    )
}