import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function TaoPhong(){
    const [data, setData] = useState({roomName:"",capacity:0,location:""});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleNameChange = (e) => {
        setData({...data, roomName: e.target.value});
    }
    const handleLocationChange = (e) => {
        setData({...data, location: e.target.value});
    }
    const handleCapacityChange = (e) => {
        if(e.target.value <=0)
            setData({...data, capacity: 1});
        else if(e.target.value > 40)
            setData({...data, capacity: 40});
        else setData({...data, capacity: e.target.value});
    }
    const checkData=()=>{
        setErrorMessage("")
        if(data.roomName.length<=0||data.location.length<=0||data.capacity<=0||data.capacity>40){
            setErrorMessage("Chưa nhập thông tin đầy đủ");
            return false;
        }
        return true;
    }
    const submit=async ()=>{
        setLoading(true);
        if(checkData()) {
            const response = await fetch('http://localhost:8080/rooms/create', {
                headers: {'Content-Type': 'application/json'},
                method: "POST",
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
    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1>Tạo phòng học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel label="Tên phòng" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.roomName}
                                      onChange={handleNameChange} placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel label="Số lượng" className="mb-3"
                    >
                        <Form.Control type={'number'} value={data.capacity}
                                      onChange={handleCapacityChange}
                                      className="rounded-0" placeholder="soluong" />
                    </FloatingLabel>
                </Col>
                <Col sm={6} md={4} xs={12}>
                    <FloatingLabel  label="Địa điểm" className="mb-3">
                        <Form.Control value={data.location} className="rounded-0"
                                      onChange={handleLocationChange} placeholder="diadiem" />
                    </FloatingLabel>
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