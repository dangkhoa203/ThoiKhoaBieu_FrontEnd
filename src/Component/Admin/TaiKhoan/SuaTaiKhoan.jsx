import {useNavigate, useParams} from "react-router";
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import ErrorPage from "../../ErrorPage.jsx";

export default function SuaTaiKhoan(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id}=useParams()
    const [notFound,setNotFound]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [data,setData]=useState({username:"",fullname:"",password:""})
    const getData=async ()=>{
        const response=await fetch(`http://localhost:8080/users/${id}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:'include'
        });
        const content = await response.json();
        if(!response.ok){
            setNotFound(true);
            setErrorMessage(content.message)
        }
        else {
            setData({
                username:content.result.username,
                fullname:content.result.fullname,
                password: content.result.password,
            })
        }
    }
    const handleUsernameChange = (e) => {
        setData({...data, username: e.target.value});
    }
    const handleFullnameChange = (e) => {
        setData({...data, fullname: e.target.value});
    }
    const handlePasswordChange = (e) => {
        setData({...data, password: e.target.value});
    }
    const checkData=()=>{
        setErrorMessage("")
        if(data.username.length===0||data.fullname.length===0||data.password.length===0){
            setErrorMessage("Chưa nhập thông tin đầy đủ");
            return false;
        }
        return true;
    }
    const submit=async ()=>{
        setLoading(true);
        if(checkData()) {
            const response = await fetch(`http://localhost:8080/users/update/${id}`, {
                headers: {'Content-Type': 'application/json'},
                method: "PUT",
                credentials: 'include',
                body: JSON.stringify(data),
            });
            const content = await response.json();
            if (!response.ok) {
                setErrorMessage(content.message);
            } else {
                navigate("../DanhSach")
            }
        }
        setLoading(false);
    }
    useEffect(()=>{
        getData();
    },[])
    if(notFound){
        return <ErrorPage message={errorMessage.message}/>
    }
    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1>Tạo ca học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6} lg={4} xs={12}>
                    <FloatingLabel label="Tên đăng nhập" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.username}
                                      onChange={handleUsernameChange} placeholder="tendangnhap"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6} lg={4} xs={12}>
                    <FloatingLabel label="Tên người dùng" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.fullname}
                                      onChange={handleFullnameChange} placeholder="tennguoidung"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6} lg={4} xs={12}>
                    <FloatingLabel label="Mật khẩu" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.password}
                                      onChange={handlePasswordChange} placeholder="phong"/>
                    </FloatingLabel>
                </Col>
            </Row>
            <h4 className="text-danger">{errorMessage}</h4>
            <Button className=" fw-bolder rounded-0 " onClick={()=>submit()}
                    style={{width:"300px"}} variant="dark" disabled={loading}>
                {loading? <Spinner animation="border" variant="light" />:"Sửa"}
            </Button>
        </Container>
    )
}