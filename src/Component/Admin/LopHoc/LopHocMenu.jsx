import {Col, Container, Row} from "react-bootstrap";
import {Link, Outlet, useNavigate} from "react-router";
import {useEffect} from "react";

export default function LopHocMenu(props){
    const navigate = useNavigate();
    if(props.user.role==="GIANGVIEN"){
        navigate('/');
    }
    useEffect(() => {
        if(props.user.role==="GIANGVIEN"){
            navigate('/');
        }
    },[props.user]);
    return(
        <>
            <Container fluid className="text-center">
                <Container className='justify-content-center d-flex' fluid>
                    <Row className="pt-3 w-75 justify-content-center">
                        <Col>
                            <Link to="DanhSach" className='w-100 Menu-Navigation-Button' >Danh sách lớp học</Link>
                        </Col>
                        <Col>
                            <Link to="Them" className='w-100 Menu-Navigation-Button' >Thêm lớp học</Link>
                        </Col>
                    </Row>
                </Container>
                <Outlet></Outlet>
            </Container>
        </>
    )
}