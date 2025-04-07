import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function TaoTaiKhoan(){
    const [data, setData] = useState({username:"",fullname:"",password:"",email:""});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleUsernameChange = (e) => {
        setData({...data, username: e.target.value});
    }
    const handleFullnameChange = (e) => {
        setData({...data, fullname: e.target.value});
    }
    const handlePasswordChange = (e) => {
        setData({...data, password: e.target.value});
    }
    const handleEmailChange = (e) => {
        setData({...data, email: e.target.value});
    }
    const checkData=()=>{
        setErrorMessage("")
        if(data.username.length===0||data.fullname.length===0||data.password.length===0||data.email.length===0){
            setErrorMessage("Chưa nhập thông tin đầy đủ");
            return false;
        }
        return true;
    }
    const [selectedFile, setSelectedFile] = useState();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);

    };
    const submit=async ()=>{
        setLoading(true);
        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(data)],{type: "application/json"}));
        formData.append("file", selectedFile);
        console.log(formData);
        if(checkData()) {
            const response = await fetch('http://localhost:8080/users/create', {
                headers: {
                },
                method: "POST",
                credentials: 'include',
                body: formData,
            });
            const content = await response.json();
            if (!response.ok) {
                setErrorMessage(content.message);
            } else {
                navigate("../DanhSach")
            }
        }
        console.log(data)
        setLoading(false);
    }
    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1>Tạo ca học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6} lg={3} xs={12}>
                    <FloatingLabel label="Tên đăng nhập" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.username}
                                      onChange={handleUsernameChange} placeholder="tendangnhap"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6} lg={3} xs={12}>
                    <FloatingLabel label="Tên người dùng" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.fullname}
                                      onChange={handleFullnameChange} placeholder="tennguoidung"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6} lg={3} xs={12}>
                    <FloatingLabel label="Mật khẩu" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.password}
                                      onChange={handlePasswordChange} placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6} lg={3} xs={12}>
                    <FloatingLabel label="Email" className="mb-3"
                    >
                        <Form.Control type="email" className="rounded-0" value={data.email}
                                      onChange={handleEmailChange} placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6} lg={3} xs={12}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control size="lg" onChange={changeHandler} className="h-100" type="file" />
                    </Form.Group>
                </Col>
            </Row>
            <h4 className="text-danger">{errorMessage}</h4>
            <Button className=" fw-bolder rounded-0 " onClick={()=>submit()}
                    style={{width:"300px"}} variant="dark" disabled={loading}>
                {loading? <Spinner animation="border" variant="light" />:"Tạo"}
            </Button>
        </Container>
    )
}