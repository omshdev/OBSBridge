import JoinStream from "../legacy/JoinStream"
import { useLocation } from "react-router-dom"
export default function UserDashboard(){
    const location = useLocation();

    return <div>
        <JoinStream wsId = {location.state.wsId} userId = {location.state.userId}/>
    </div>
}