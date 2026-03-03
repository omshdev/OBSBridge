import { useLocation } from "react-router-dom"
import CreateStream from "../components/CreateStream"

export default function HostDashboard(){
    const location = useLocation();
    console.log(location.state);
    return <div>
        <h1>Host Dashboard</h1>
        <br />
        <CreateStream roomId = {location.state.roomNumber} />
    </div>
}