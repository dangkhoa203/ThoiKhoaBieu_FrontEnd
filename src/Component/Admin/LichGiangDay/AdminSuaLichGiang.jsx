import {useParams} from "react-router";

export default function AdminSuaLichGiang(){
    const {id}=useParams()
    return(
        <>
            <hr className="my-3"/>
            {id}
        </>
    )
}