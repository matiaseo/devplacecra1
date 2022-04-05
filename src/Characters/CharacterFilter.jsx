import { Form } from 'react-bootstrap'

const preventSubmit =  event => event.preventDefault()

export const CharacterFilter = ({ filter, setFilter }) => {
    return (
        <Form onSubmit={preventSubmit}>
            <Form.Label>Filter</Form.Label>
            <Form.Control onChange={setFilter} value={filter} type="text" placeholder="character name" />
        </Form>
    )
}