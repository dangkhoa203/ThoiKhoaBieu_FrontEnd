import {useParams} from "react-router";

export default function SuaTaiKhoan(){
    const {id}=useParams()
    return(
        <>
            {id}
        </>
    )
}