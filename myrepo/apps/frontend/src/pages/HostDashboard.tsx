import { useLocation } from "react-router-dom"

export default function HostDashboard(){
    const location = useLocation();
    console.log(location.state);
    return <div>
        <h1>Host Dashboard</h1>
        <br />
    </div>
}