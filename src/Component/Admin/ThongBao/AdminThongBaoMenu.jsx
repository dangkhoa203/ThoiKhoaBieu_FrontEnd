import {Col, Container, Row} from "react-bootstrap";
import {Link, Outlet} from "react-router";

export default function AdminThongBaoMenu(){
    return(
        <>
            <Container fluid className="text-center">
                <h1>Menu thông báo</h1>
                <Container className='justify-content-center d-flex' fluid>
                    <Row className="pt-3 w-75 justify-content-center">
                        <Col>
                            <Link to="DanhSach" className='w-100 btn btn-primary' >Danh sách tài khoản</Link>
                        </Col>
                        <Col>
                            <Link to="Gui" className='w-100 btn btn-primary' >Thêm tài khỏan</Link>
                        </Col>
                    </Row>
                </Container>
                <Outlet></Outlet>
            </Container>
        </>
    )
}