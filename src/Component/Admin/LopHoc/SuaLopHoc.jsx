import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import ErrorPage from "../../ErrorPage.jsx";
import {Button, Col, Container, FloatingLabel, Form, Row, Spinner} from "react-bootstrap";

export default function SuaLopHoc(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id}=useParams()
    const [notFound,setNotFound]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [subjectData, setSubjectData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [shiftData, setShiftData] = useState([]);
    const [data,setData]=useState({subject_id:0,room_id:0,user_id:0,shift_id:0})
    const getData=async ()=>{
        const response=await fetch(`http://localhost:8080/classess/${id}`,{
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
            console.log(content)
            setData({
                subject_id:content.result.subject.subjectId,
                room_id:content.result.room.roomId,
                user_id:content.result.user.userId,
                shift_id:content.result.shift.shiftId,
            })
        }
    }
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
            const response = await fetch(`http://localhost:8080/classess/update/${id}`, {
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
        getSubjectData();
        getRoomData();
        getUserData();
        getShiftData();
    },[])
    if(notFound){
        return <ErrorPage message={errorMessage.message}/>
    }
    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1>Sửa môn học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Môn học">
                        <Form.Select value={data.subject_id} onClick={handleSubject} className="rounded-0" >
                            <option  disabled value="">Open this select menu</option>
                            {subjectData.map((item, index) => (
                                <option  key={index} value={item.subjectId}>{item.subjectName}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Phòng">
                        <Form.Select  value={data.room_id} onChange={handleRoom} className="rounded-0" >
                            <option  disabled value="">Open this select menu</option>
                            {roomData.map((item, index) => (
                                <option  key={index} value={item.roomId}>{item.roomName}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Giảng viên">
                        <Form.Select value={data.user_id} onChange={handleUser} className="rounded-0" >
                            <option disabled value="">Open this select menu</option>
                            {userData.map((item, index) => (
                                <option  key={index} value={item.userId}>{item.fullname}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Ca">
                        <Form.Select value={data.shift_id} onChange={handleShift} className="rounded-0" >
                            <option disabled value="">Open this select menu</option>
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
                {loading? <Spinner animation="border" variant="light" />:"Sửa"}
            </Button>
        </Container>
    )
}