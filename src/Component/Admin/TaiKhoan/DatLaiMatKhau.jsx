import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import {Link} from "react-router";

export default function DatLaiMatKhau(){
    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1>Đặt lại mật khẩu Admin</h1>
            <Row className="px-5">
                <Col md={6}>
                    <FloatingLabel
                        label="Mật khẩu hiện tại"
                        className="mb-3"
                    >
                        <Form.Control className="rounded-0" placeholder="password" />
                    </FloatingLabel>
                </Col>
                <Col md={6}>
                    <FloatingLabel
                        label="Mật khẩu mới"
                        className="mb-3"
                    >
                        <Form.Control className="rounded-0" placeholder="newpassword" />
                    </FloatingLabel>
                </Col>
            </Row>
            <Button className=" fw-bolder rounded-0 " style={{width:"300px"}} variant="dark">Thay đổi</Button>
        </Container>
    )
}