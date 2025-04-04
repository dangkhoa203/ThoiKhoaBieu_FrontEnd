import {useParams} from "react-router";
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";

export default function SuaTaiKhoan(){
    const {id}=useParams()
    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1>Sửa tài khoản</h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel
                        label="Tên đăng nhập"
                        className="mb-3"
                    >
                        <Form.Control className="rounded-0" placeholder="username" />
                    </FloatingLabel>
                </Col>
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel
                        label="Tên người dùng"
                        className="mb-3"
                    >
                        <Form.Control className="rounded-0" placeholder="name" />
                    </FloatingLabel>
                </Col>
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel  label="Password" className="mb-3">
                        <Form.Control className="rounded-0" type="password" placeholder="Password" />
                    </FloatingLabel>
                </Col>
            </Row>
            <Button className=" fw-bolder rounded-0 " style={{width:"300px"}} variant="dark">Thay đổi</Button>
        </Container>
    )
}