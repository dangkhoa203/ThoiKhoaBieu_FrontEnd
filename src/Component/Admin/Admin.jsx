import {Link, Outlet, useNavigate} from "react-router";
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Admin(){
    const navigate = useNavigate();
    const [admin,setAdmin] = useState({
        islog:true,
        name:"admin"
    }
    );
    const [loginInfo,setLoginInfo] = useState({
        UserName:"",
        Password:"",
    })
    const handleUsernameChange = (e) => {
        setLoginInfo({...loginInfo, UserName: e.target.value});
    }
    const handlePasswordChange = (e) => {
        setLoginInfo({...loginInfo, Password: e.target.value});
    }
    const adminLogin = () => {
        if(loginInfo.UserName === "admin"){
            if(loginInfo.Password === "admin"){
                setAdmin({username: loginInfo.UserName,islog: true});
            }
        }
    }
    useEffect(()=>{

    },[])
    if(!admin.islog && admin.name===""){
        navigate("/admin");
    }
    return(
        <>
                {admin.islog?
                    <Container className="" fluid>
                        <Container fluid className="pt-3 d-flex gap-3">
                            <Button variant="dark"
                                    onClick={()=>setAdmin({... admin,islog: false,name: ""})}
                            >
                                Logout
                            </Button>
                            <h3>Xin chào {admin.name}</h3>
                        </Container>
                        <Container className='justify-content-center d-flex' fluid>
                            <Row className="pt-3 w-75 justify-content-center">
                                <Col>
                                    <Link to="taikhoan" className='w-100 btn btn-primary' >Tài khoản</Link>
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

                        <Container className="justify-content-center d-flex pt-4 pb-4 border mt-4 border-3" >
                            <Outlet context={{admin}}/>
                        </Container>
                    </Container>
                    :
                    <>
                        <Container fluid className="pt-5 d-flex flex-column justify-content-center align-items-center">
                            <Container style={{maxWidth:'50%'}} className='pt-5 pb-5 rounded-5 border border-black border-3'>
                                <Row>
                                    <Col>
                                        <h3 className='text-center'>Đăng nhập Admin</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="UserName"
                                            className="mb-3"
                                        >
                                            <Form.Control onChange={(e)=>handleUsernameChange(e)} value={loginInfo.UserName} type="text" placeholder="username" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FloatingLabel controlId="floatingPassword" label="Password">
                                            <Form.Control onChange={(e)=>handlePasswordChange(e)} type="password" placeholder="Password" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className='mt-2'>
                                    <Col>
                                        <Button href="/" className="w-100" variant="danger">Quay về </Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={()=> adminLogin()} className="w-100" variant="primary">Đăng nhập</Button>
                                    </Col>
                                </Row>

                            </Container>
                        </Container>
                    </>
                }

        </>

    )
}