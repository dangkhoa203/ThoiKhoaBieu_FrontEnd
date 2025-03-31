import {Button, Container, Form, InputGroup} from "react-bootstrap";

export default function TaoTaiKhoan(){
    return(
        <Container fluid>
            <hr className="my-3"/>
            <h1>Tạo tài khoản</h1>
            <InputGroup className="mb-3">
                <InputGroup.Text style={{minWidth:"130px"}} className="fw-bold text-center" >
                    Password cũ
                </InputGroup.Text>
                <Form.Control
                    placeholder="Mật khẩu"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text className="fw-bold text-center" style={{minWidth:"130px"}} >
                    Password mới
                </InputGroup.Text>
                <Form.Control
                    placeholder="Mật khẩu"
                />
            </InputGroup>
            <Button className="w-50 fw-bolder rounded-pill " variant="dark">Thay đổi</Button>
        </Container>
    )
}