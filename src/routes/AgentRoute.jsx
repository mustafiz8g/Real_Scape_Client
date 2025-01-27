import PropTypes from "prop-types"
import useRole from "../hooks/useRole"
import LoadingSpinner from "../Components/Shared/LoadingSpinner"
import { Navigate } from "react-router-dom"


const AgentRoute = ({children}) => {
const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner />
    if(role === 'seller') return children
    return <Navigate to='/dashboard' state={{ from: location }} replace='true' />
  }
  
  AgentRoute.propTypes = {
    children: PropTypes.element,
  }
export default AgentRoute;