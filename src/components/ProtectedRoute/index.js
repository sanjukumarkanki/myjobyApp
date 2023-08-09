import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

// If user have jwt Token than it will redirect to login otherwise return to the home page
const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
