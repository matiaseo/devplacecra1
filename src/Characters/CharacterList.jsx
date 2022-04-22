import { useEffect, useState, useRef } from 'react'

import { CharacterCard } from './CharacterCard'
import { Col, Container, Row } from 'react-bootstrap'

import { useTextInput } from '../shared/customHooks'
import { Filter } from '../shared/Filter'


export const CharacterList = () => {
    const [list, setList] = useState([])
    const [updateCount, setUpdateCount] = useState(0)
    const [filter, setFilter] = useTextInput('')
    const filterElement = useRef()

    const filterByName = filter.length > 3? `?name=${filter}` : ''

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character${filterByName}`)
            .then(response => response.ok? response.json() : {})
            .then(({ results: characters }) => characters && setList(characters))
        // console.log('running fetch')
        // return () => console.log('cleanup fetch')
    }, [filterByName])

    useEffect(() => {
        const intervalId = setInterval(() => setUpdateCount(count => count + 1), 2000)
        return () => {
            console.log('cleaning up', intervalId)
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        console.log(filterElement.current)
        if(filterElement.current)
            filterElement.current.focus()
    }, [])

    return (
    <Container fluid>
        <Row>
            <Col>
                <Filter inputRef={filterElement} filter={filter} setFilter={setFilter} placeholder="character name" />
            </Col>
            {updateCount}
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