import CreateStream from "../legacy/CreateStream"
import JoinStream from "../legacy/JoinStream"

export default function StreamLobby(action : string){
    if(action === "createStream"){
        return <div>
            <CreateStream/>
        </div>        
    }
    return <div>
        <JoinStream/>
    </div>
}