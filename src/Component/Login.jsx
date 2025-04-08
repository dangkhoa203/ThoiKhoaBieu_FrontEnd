import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";

export default function Login(props){
    const navigate = useNavigate();
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:"",
    })
    const [errorMessage,setErrorMessage] = useState("")

    const [showPassword,setShowPassword] = useState(false);
    const handleUsernameChange = (e) => {
        setLoginInfo({...loginInfo, email: e.target.value});
    }
    const handlePasswordChange = (e) => {
        setLoginInfo({...loginInfo, password: e.target.value});
    }

    const handleShowPassword = (e) => {
        setShowPassword(e.target.checked);
    }
    const adminLogin =async () => {
        const response = await fetch('http://localhost:5125/api/Auth/login', {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(loginInfo),
        });

        if (!response.ok) {
            const message = await response.text();
            setErrorMessage(message);
        } else {
            const content = await response.json();
            sessionStorage.setItem('account', content.jwt);
            props.getInfo()
            navigate("..")
        }
    }

    useEffect(() => {
        if(props.user.islog)
            navigate('..')
    },[props.user])

    return(
        <Container style={{height:"100%"}} fluid className="d-flex p-0 mt-3 flex-column  justify-content-center align-items-center">
            <Container className='Login-Panel pb-5  '>
                <Row className="LoginHero">
                    <Col>
                        <h3 className='text-center'>Đăng nhập</h3>
                    </Col>
                </Row>
                <Container className='Login-Form'>
                    <Row >
                        <Col className="align-content-center">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    onChange={(e)=>handleUsernameChange(e)}
                                    value={loginInfo.email}
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
                        <Col xs={12} className="d-flex mb-2 gap-2 ">
                            <Form.Check value={showPassword} onChange={(e)=>handleShowPassword(e)} type="checkbox"/>
                            <h6>Hiện mật khẩu </h6>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="d-flex justify-content-center align-items-center">
                            <Button onClick={()=> adminLogin()} style={{minWidth:"50%",maxWidth:"60%"}} className="rounded-pill" variant="success">Đăng nhập</Button>
                        </Col>
                    </Row>
                    <Row className='mt-2 '>
                        <Col>
                            <h4 className="text-danger text-center">{errorMessage}</h4>
                        </Col>
                    </Row>
                </Container>


            </Container>
        </Container>
    )
}
