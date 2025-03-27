import {Link, Outlet, useOutletContext} from "react-router";
import {Button, Col, Container, Row} from "react-bootstrap";

export default function TaiKhoanMenu(){
    return(
        <>
            <Container fluid className="text-center">
                <h1>Menu giảng viên</h1>
                <Container className='justify-content-center d-flex' fluid>
                    <Row className="pt-3 w-75 justify-content-center">
                        <Col>
                            <Link to="tao" className='w-100 btn btn-primary' >Tạo</Link>
                        </Col>
                        <Col>
                            <Button className='w-100' variant="primary" >1</Button>
                        </Col>
                        <Col>
                            <Button className='w-100' variant="primary" >1</Button>
                        </Col>
                        <Col>
                            <Button className='w-100' variant="primary" >1</Button>
                        </Col>
                    </Row>
                </Container>
                <Outlet></Outlet>
            </Container>
        </>
    )
}