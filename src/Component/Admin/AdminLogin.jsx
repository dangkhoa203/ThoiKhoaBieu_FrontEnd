import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate, useOutletContext} from "react-router";

export default function AdminLogin(){
    const {admin}=useOutletContext()
    const navigate = useNavigate();
    const [loginInfo,setLoginInfo] = useState({
        UserName:"",
        Password:"",
        Remember:false,
    })

    const [showPassword,setShowPassword] = useState(false);
    const handleUsernameChange = (e) => {
        setLoginInfo({...loginInfo, UserName: e.target.value});
    }
    const handlePasswordChange = (e) => {
        setLoginInfo({...loginInfo, Password: e.target.value});
    }
    const handleRemember = (e) => {
        setLoginInfo({...loginInfo, Remember: e.target.checked});
    }
    const handleShowPassword = (e) => {
        setShowPassword(e.target.checked);
    }
    const adminLogin = () => {
        if(loginInfo.UserName === "admin"){
            if(loginInfo.Password === "admin"){
                console.log("OK")
            }
        }
    }
    useEffect(() => {
        console.log(admin);
        if(admin.islog){
            navigate("/admin");
        }
    },[])

    return(
        <Container style={{height:"100%"}} fluid className="d-flex p-0 flex-column  justify-content-center align-items-center">
            <Container className='Login-Panel pb-5  '>
                <Row className="LoginHero">
                    <Col>
                        <h3 className='text-center'>Đăng nhập Admin</h3>
                    </Col>
                </Row>
                <Container className='Login-Form'>
                    <Row >
                        <Col className="align-content-center">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="UserName"
                                className="mb-3"
                            >
                                <Form.Control
                                    onChange={(e)=>handleUsernameChange(e)}
                                    value={loginInfo.UserName}
                                    type="text" placeholder="username" className="rounded-pill " />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control
                                    onChange={(e)=>handlePasswordChange(e)}
                                    type={showPassword? "text":"password"} placeholder="Password" className="rounded-pill " />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="pt-3 pb-3 ps-3 text-center">
                        <Col xs={12} md={6} className="d-flex mb-2 gap-2">
                            <Form.Check value={loginInfo.Remember} onChange={(e)=>handleRemember(e)} type="checkbox"/>
                            <h6>Nhớ lượt đăng nhập </h6>
                        </Col>
                        <Col xs={12} md={6} className="d-flex mb-2 gap-2 justify-content-md-end">
                            <Form.Check value={showPassword} onChange={(e)=>handleShowPassword(e)} type="checkbox"/>
                            <h6>Hiện mật khẩu </h6>
                        </Col>
                    </Row>
                    <Row className='mt-2 '>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Button onClick={()=> adminLogin()} style={{minWidth:"50%",maxWidth:"60%"}} className="rounded-pill" variant="success">Đăng nhập</Button>
                        </Col>
                    </Row>
                </Container>


            </Container>
        </Container>
    )
}