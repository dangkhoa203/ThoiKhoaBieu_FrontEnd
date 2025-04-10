import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

export default function TaoLopHoc(props){
    let curr = new Date();
    curr.setDate(curr.getDate()+1);
    const date = curr.toISOString().substring(0,10);
    const [data, setData] = useState({subject_id:0,room_id:0,user_id:0,shift_id:0,startTime:date,endTime:date});
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
    const handleStartTime=(e)=>{
        setData({...data, startTime: e.target.value});
    }
    const handleEndTime=(e)=>{
        setData({...data, endTime: e.target.value});
    }
    const getSubjectData=async()=>{
        const response = await fetch('http://localhost:8080/subjects', {
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.user.token},
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
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.user.token},
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
            const request={...data,startTime:new Date(data.startTime).toISOString(),endTime:new Date(data.endTime).toISOString()}
            const response = await fetch('http://localhost:8080/classess/create', {
                headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.user.token},
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(request),
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
    if(props.user.role==="GIANGVIEN"){
        navigate('/');
    }
    useEffect(() => {
        if(props.user.role==="GIANGVIEN"){
            navigate('/');
        }
    },[props.user]);
    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1 className="page-header">Tạo môn học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Môn học">
                        <Form.Select onClick={handleSubject} className="rounded-0" >
                            <option selected disabled value="">Chọn thông tin</option>
                            {subjectData.map((item, index) => (
                                <option key={index} value={item.subjectId}>{item.subjectName}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Phòng">
                        <Form.Select onChange={handleRoom} className="rounded-0" >
                            <option selected disabled value="">Chọn thông tin</option>
                            {roomData.map((item, index) => (
                                <option key={index} value={item.roomId}>{item.roomName}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Giảng viên">
                        <Form.Select onChange={handleUser} className="rounded-0" >
                            <option selected disabled value="">Chọn thông tin</option>
                            {userData.map((item, index) => (
                                <option key={index} value={item.userId}>{item.fullname}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Ca">
                        <Form.Select onChange={handleShift} className="rounded-0" >
                            <option selected disabled value="">Chọn thông tin</option>
                            {shiftData.map((item, index) => (
                                <option key={index} value={item.shiftId}>{item.shiftName} ({`${item.startTime} -> ${item.endTime}`})</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel label="Ngày bắt đầu" className="mb-3"
                    >
                        <Form.Control  value={data.startTime} onChange={handleStartTime} className="rounded-0"  type="date"
                                       placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel label="Ngày kết thúc" className="mb-3"
                    >
                        <Form.Control  value={data.endTime} onChange={handleEndTime} className="rounded-0"  type="date"
                                       placeholder="phong"/>
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