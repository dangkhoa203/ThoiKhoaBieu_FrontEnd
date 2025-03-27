import {Col, Container, Row} from "react-bootstrap";
import {Link, Outlet} from "react-router";

export default function AdminLichGiangDayMenu(){
    return(
        <>
            <Container fluid className="text-center">
                <h1>Menu lịch giảng dạy</h1>
                <Container className='justify-content-center d-flex' fluid>
                    <Row className="pt-3 w-75 justify-content-center">
                        <Col>
                            <Link to="DanhSach" className='w-100 btn btn-primary' >Danh sách lịch giảng</Link>
                        </Col>
                        <Col>
                            <Link to="Them" className='w-100 btn btn-primary' >Thêm lịch giảng</Link>
                        </Col>
                    </Row>
                </Container>
                <Outlet></Outlet>
            </Container>
        </>
    )
}