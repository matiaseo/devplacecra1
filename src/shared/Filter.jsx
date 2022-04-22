import { Form } from 'react-bootstrap'

const preventSubmit =  event => event.preventDefault()

export const Filter = ({ inputRef, filter, setFilter, placeholder }) => {
    return (
        <Form onSubmit={preventSubmit}>
            <Form.Label>Filter</Form.Label>
            <Form.Control ref={inputRef} onChange={setFilter} value={filter} type="text" placeholder={placeholder} />
        </Form>
    )
}