import { useEffect, useState } from 'react'

import { CharacterCard } from './CharacterCard'
import { Col, Container, Form, Row } from 'react-bootstrap'

// const listStyle = {
//     display: 'flex',
//     width: '100vw',
//     overflow: 'hidden',
//     flexFlow: 'row wrap'
// }
// const itemStyle = {
//     listStyle: 'none'
// }

export const CharacterList = () => {
    const [list, setList] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(response => response.json())
            .then(({ results: characters }) => setList(characters))
    }, [])

    return (
    <Container fluid>
        <Row>
            <Col>
                <Form>
                    <Form.Label>Filter</Form.Label>
                    <Form.Control onChange={event => setFilter(event.target.value)} value={filter} type="text" placeholder="character name" />
                </Form>
            </Col>
        </Row>
        <Row>
            {
                list.map(
                ({id, name, species, image}) =>
                <Col key={id} lg="2" sm="4">
                    <CharacterCard id={id} name={name} species={species} image={image} />
                </Col>
                )
            }
        </Row>
    </Container>
        // <ul style={listStyle}>
        //     {
        //         list.map(
        //             ({id, name, species, image}) =>
        //             <li key={id} style={itemStyle}>
        //                 <CharacterCard name={name} species={species} image={image} />
        //             </li>
        //         )
        //     }
        // </ul>
    )
}