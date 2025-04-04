import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router";

export  default function ErrorPage(props) {
    const navigate = useNavigate();
    return(
        <Container className="mx-auto text-center d-flex flex-column">
            <hr className="my-3"/>
            <h3>Lỗi đã xảy ra: {props.message}</h3>
            <Container fluid>
                <Button variant='dark' style={{width:"200px"}} onClick={()=>navigate(-1)}>Quay về</Button>
            </Container>
        </Container>
    )
}