import {Col, Container, Row} from "react-bootstrap";
import {Link, Outlet} from "react-router";

export default function CaHocMenu(){
    return(
        <>
            <Container fluid className="text-center">
                <Container className='justify-content-center d-flex' fluid>
                    <Row className="pt-3 w-75 justify-content-center">
                        <Col>
                            <Link to="DanhSach" className='w-100 Menu-Navigation-Button' >Danh sách ca học</Link>
                        </Col>
                        <Col>
                            <Link to="Them" className='w-100 Menu-Navigation-Button' >Thêm ca học</Link>
                        </Col>
                    </Row>
                </Container>
                <Outlet></Outlet>
            </Container>
        </>
    )
}