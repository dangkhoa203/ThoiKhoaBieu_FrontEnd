import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

export default function TaoLopHoc(){
    const [data, setData] = useState({subject_id:0,room_id:0,user_id:0,shift_id:0});
    const [subjectData, setSubjectData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [shiftData, setShiftData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubject=(e)=>{
        setData({...data, subject_id: e.target.value});
    }
    const handleRoom=(e)=>{
        setData({...data, room_id: e.target.value});
    }
    const handleUser=(e)=>{
        setData({...data, user_id:e.target.value});
    }
    const handleShift=(e)=>{
        setData({...data, shift_id: e.target.value});
    }
    const getSubjectData=async()=>{
        const response = await fetch('http://localhost:8080/subjects', {
            headers: {'Content-Type': 'application/json'},
            method:"GET",
            credentials:'include'
        });
        const content = await response.json();
        if (!response.ok) {
            console.log(content.message);
        }else {
            setSubjectData(content.result);
        }
    }
    const getRoomData=async()=>{
        const response = await fetch('http://localhost:8080/rooms', {
            headers: {'Content-Type': 'application/json'},
            method:"GET",
            credentials:'include'
        });
        const content = await response.json();
        if (!response.ok) {
            console.log(content.message);
        }else {
            setRoomData(content.result);
        }
    }
    const getUserData=async()=>{
        const response = await fetch('http://localhost:8080/users', {
            headers: {'Content-Type': 'application/json'},
            method:"GET",
            credentials:'include'
        });
        const content = await response.json();
        if (!response.ok) {
            console.log(content.message);
        }else {
            setUserData(content.result);
        }
    }
    const getShiftData=async()=>{
        const response = await fetch('http://localhost:8080/shifts', {
            headers: {'Content-Type': 'application/json'},
            method:"GET",
            credentials:'include'
        });
        const content = await response.json();
        if (!response.ok) {
            console.log(content.message);
        }else {
            setShiftData(content.result);
        }
    }
    const checkData=()=>{
        setErrorMessage("")
        if(data.room_id===""||data.user_id===""||data.subject_id===""||data.shift_id===""){
            setErrorMessage("Chưa nhập thông tin đầy đủ");
            return false;
        }
        return true;
    }
    const submit=async ()=>{
        setLoading(true);
        if(checkData()) {
            const response = await fetch('http://localhost:8080/classess/create', {
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
    useEffect(()=>{
        getSubjectData()
        getRoomData()
        getUserData()
        getShiftData()
    },[])
    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1>Tạo môn học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Môn học">
                        <Form.Select onClick={handleSubject} className="rounded-0" >
                            <option selected disabled value="">Open this select menu</option>
                            {subjectData.map((item, index) => (
                                <option key={index} value={item.subjectId}>{item.subjectName}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Phòng">
                        <Form.Select onChange={handleRoom} className="rounded-0" >
                            <option selected disabled value="">Open this select menu</option>
                            {roomData.map((item, index) => (
                                <option key={index} value={item.roomId}>{item.roomName}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Giảng viên">
                        <Form.Select onChange={handleUser} className="rounded-0" >
                            <option selected disabled value="">Open this select menu</option>
                            {userData.map((item, index) => (
                                <option key={index} value={item.userId}>{item.fullname}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Ca">
                        <Form.Select onChange={handleShift} className="rounded-0" >
                            <option selected disabled value="">Open this select menu</option>
                            {shiftData.map((item, index) => (
                                <option key={index} value={item.shiftId}>{item.shiftName} ({`${item.startTime} -> ${item.endTime}`})</option>
                            ))}
                        </Form.Select>
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