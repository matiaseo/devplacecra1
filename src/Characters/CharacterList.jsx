import { useEffect, useState } from 'react'

import { CharacterCard } from './CharacterCard'
import { Col, Container, Row } from 'react-bootstrap'

import { useTextInput } from '../shared/customHooks'
import { CharacterFilter } from './CharacterFilter'


export const CharacterList = () => {
    const [list, setList] = useState([])

    const [filter, setFilter] = useTextInput('')

    const filterByName = filter.length > 3? `?name=${filter}` : ''

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character${filterByName}`)
            .then(response => response.ok? response.json() : {})
            .then(({ results: characters }) => characters && setList(characters))
    }, [filterByName])

    return (
    <Container fluid>
        <Row>
            <Col>
                <CharacterFilter filter={filter} setFilter={setFilter} />
            </Col>
        </Row>
        <Row>
            {list.map(
                ({id, name, species, image}) =>
                <Col key={id} lg="2" sm="4">
                    <CharacterCard id={id} name={name} species={species} image={image} />
                </Col>
            )}
        </Row>
    </Container>
    )
}