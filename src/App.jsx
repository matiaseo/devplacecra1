import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import './App.css'
import { Characters } from './Characters'

const withRequiredToken = Component => {
  return class extends React.Component {
    constructor () {
      this.state = { token: null }
    }
    componentDidMount() {
      const token = localStorage.getItem('userToken')
      this.setState({token})
      if(!token) {
        setTimeout(() => window.history.push('/login'), 5000)
      }
    }
    render() {
      return this.state.token? <Component {...this.props} /> : 401
    }
  }
}
const PrivateRouteWithHOC = withRequiredToken(Route)

// const PrivateRoutePropagatingProps = props => {
//   const [token, setToken] = useState(null)

//   useEffect(() => {
//     const token = localStorage.getItem('userToken')
//     setToken(token)
//     if(!token) {
//       setTimeout(() => window.history.push('/login'), 5000)
//     }
//   }, [])

//   return token? <Route path="/characters/*" element={<Characters token={token} />} /> : 401
// }

const PrivateSection = ({ children }) => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setToken(token)
    if(!token) {
      setTimeout(() => window.history.push('/login'), 5000)
    }
  }, [])

  return token? <Routes>{children}</Routes> : 401
}

const useAuthentication = () => {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if(!token) navigate('/login')
    else setToken(token)
  }, [])

  return token
}

export function App() {
  const token = useAuthentication()
  return (
    <>
      {/* <PrivateSection>
        <Route path="/characters/*" element={<Characters />} />
      </PrivateSection> */}
      <Routes>
        <Route path="/characters/*" element={token && <Characters />} />
        <Route path="/login" element={<div>login</div>} />
      </Routes>
    </>
  )
}