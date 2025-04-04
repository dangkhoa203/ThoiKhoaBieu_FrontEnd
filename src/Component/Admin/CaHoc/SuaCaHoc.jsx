import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import ErrorPage from "../../ErrorPage.jsx";
import {Button, Col, Container, FloatingLabel, Form, Row, Spinner} from "react-bootstrap";

export default function SuaCaHoc(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id}=useParams()
    const [notFound,setNotFound]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [data,setData]=useState({shiftName:"",startTime:"",endTime:""})
    const getData=async ()=>{
        const response=await fetch(`http://localhost:8080/shifts/${id}`,{
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
                shiftName:content.result.shiftName,
                startTime:content.result.startTime,
                endTime:content.result.endTime,
            })
        }
    }
    const handleNameChange = (e) => {
        setData({...data, shiftName: e.target.value});
    }
    const handleStartTimeChange = (e) => {
        setData({...data, startTime: e.target.value});
    }
    const handleEndTimeChange = (e) => {
        if(!(e.target.value<data.startTime))
            setData({...data, endTime: e.target.value});
    }
    const checkData=()=>{
        setErrorMessage("")
        if(data.shiftName.length===0||data.startTime===""||data.endTime===""){
            setErrorMessage("Chưa nhập thông tin đầy đủ");
            return false;
        }
        return true;
    }
    const submit=async ()=>{
        setLoading(true);
        if(checkData()) {
            const response = await fetch(`http://localhost:8080/shifts/update/${id}`, {
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
            <h1>Sửa thông tin ca học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel label="Tên ca" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.shiftName}
                                      onChange={handleNameChange} placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel label="Giờ bắt đầu" className="mb-3"
                    >
                        <Form.Control type={'time'} value={data.startTime}
                                      onChange={handleStartTimeChange}
                                      className="rounded-0" placeholder="giobatdau" />
                    </FloatingLabel>
                </Col>
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel  label="Giờ kết thúc" className="mb-3">
                        <Form.Control type={'time'} value={data.endTime}
                                      onChange={handleEndTimeChange}
                                      className="rounded-0" placeholder="gioketthuc" />
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