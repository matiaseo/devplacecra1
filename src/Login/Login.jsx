import { Form, Row, Container, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useTextInput } from "../shared/customHooks"

export const Login = ({ setToken, originalPath }) => {
    const [username, setUsername] = useTextInput('')
    const [password, setPassword] = useTextInput('')
    const navigate = useNavigate()
    
    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            if(response.ok) {
                const { token } = await response.json()
                setToken(token)
                navigate(originalPath)
            } else {
                throw await response.text()
            }
        } catch (error) {
            console.log('error', error)
        }
        console.log('goes on')
    }

    return (
        <Container data-testid="login-page">
            <Row><Col>Log in</Col></Row>
            <Row>
                <Col className="ml-3 mr-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label  className="mt-3">User Name</Form.Label>
                        <Form.Control onChange={setUsername} value={username} type="text" placeholder="character name" />
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={setPassword} value={password} type="password" placeholder="****" />
                        <Form.Control className="mt-3" type="submit"/>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}