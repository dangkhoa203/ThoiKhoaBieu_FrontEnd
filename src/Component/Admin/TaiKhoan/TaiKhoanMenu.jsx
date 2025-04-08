import {Link, Outlet, useNavigate, useOutletContext} from "react-router";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";

export default function TaiKhoanMenu(props){
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
            <Container fluid className="text-center p-0">
                <Container className='justify-content-center d-flex pb-3 border-bottom' fluid>
                    <Row className="pt-3 w-75 justify-content-center">
                        <Col>
                            <Link to="DanhSach" className='w-100 Menu-Navigation-Button' >Danh sách tài khoản</Link>
                        </Col>
                        <Col>
                            <Link to="Them" className='w-100 Menu-Navigation-Button' >Thêm tài khoản</Link>
                        </Col>
                    </Row>
                </Container>
                <Outlet></Outlet>
            </Container>
        </>
    )
}