import {Link, Outlet, useOutletContext} from "react-router";
import {Button, Col, Container, Row} from "react-bootstrap";

export default function TaiKhoanMenu(){
    return(
        <>
            <Container fluid className="text-center p-0">
                <h1>Menu tài khoản</h1>
                <Container className='justify-content-center d-flex pb-3 border-bottom mb-3' fluid>
                    <Row className="pt-3 w-75 justify-content-center">
                        <Col>
                            <Link to="DanhSach" className='w-100 btn btn-primary' >Danh sách tài khoản</Link>
                        </Col>
                        <Col>
                            <Link to="Them" className='w-100 btn btn-primary' >Thêm tài khỏan</Link>
                        </Col>
                        <Col>
                            <Link to="DatMatKhau" className='w-100 btn btn-primary' >Đặt lại mật khẩu Admin</Link>
                        </Col>
                    </Row>
                </Container>
                <Outlet></Outlet>
            </Container>
        </>
    )
}