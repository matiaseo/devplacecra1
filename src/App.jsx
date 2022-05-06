import React, { StrictMode, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import './App.css'
import { Characters } from './Characters'
import { Login, UserContextProvider } from './Login'
import { Products } from './Products'

// const withRequiredToken = Component => {
//   return class extends React.Component {
//     constructor () {
//       this.state = { token: null }
//     }
//     componentDidMount() {
//       const token = localStorage.getItem('userToken')
//       this.setState({token})
//       if(!token) {
//         setTimeout(() => window.history.push('/login'), 5000)
//       }
//     }
//     render() {
//       return this.state.token? <Component {...this.props} /> : 401
//     }
//   }
// }
// const PrivateRouteWithHOC = withRequiredToken(Route)

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

// const PrivateSection = ({ children }) => {
//   const [token, setToken] = useState(null)

//   useEffect(() => {
//     const token = localStorage.getItem('userToken')
//     setToken(token)
//     if(!token) {
//       setTimeout(() => window.history.push('/login'), 5000)
//     }
//   }, [])

//   return token? <Routes>{children}</Routes> : 401
// }

const getStorageItem = key => localStorage.getItem(key)
const setStorageItem = (key, value) => localStorage.setItem(key, value)

const useAuthentication = () => {
  const [originalPath, setOriginalPath] = useState('/characters')
  const [token, setToken] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = getStorageItem('userToken')
    if(!token) {
      setOriginalPath(location.pathname)
      navigate('/login')
    } else setToken(token)
  }, [])

  return [
    token,
    token => {
      setToken(token)
      setStorageItem('userToken', token)
    },
    originalPath
  ]
}

export function App() {
  const [token, setToken, originalPath] = useAuthentication()
  return (
    <Routes>
        {/* <PrivateSection>
          <Route path="/characters/*" element={<Characters />} />
        </PrivateSection> */}
        <Route path="/products/*" element={token && <UserContextProvider><Products /></UserContextProvider>} />
        <Route path="/characters/*" element={token && <Characters />} />
        <Route path="/login" element={<Login setToken={setToken} originalPath={originalPath} />} />
        <Route path="*" element={404} />
      </Routes>
  )
}