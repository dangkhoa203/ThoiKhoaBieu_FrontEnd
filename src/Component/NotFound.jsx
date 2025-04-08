import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router";

export default function NotFound(){
    const navigate = useNavigate();
    return(
        <Container style={{height:"100vh"}} fluid className="p-0  ">
            <Container className="pt-5  text-center">
                <h3>Không tìm thấy địa chỉ</h3>
                <Button style={{width:"400px"}} variant="dark" onClick={()=>navigate("/")}>Quay về</Button>
            </Container>

        </Container>
    )
}