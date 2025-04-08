import {useNavigate} from "react-router";
import {useEffect,useState} from "react";
import {Button, Col, Container, FloatingLabel, Form, Row, Spinner} from "react-bootstrap";

export default function TaoHocBu(props){
    let curr = new Date();
    curr.setDate(curr.getDate()+1);
    const date = curr.toISOString().substring(0,10);
    const [data, setData] = useState({subject_id:0,room_id:0,user_id:props.user.userId,requestTime:date,reason:""});
    const [subjectData, setSubjectData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubject=(e)=>{
        setData({...data, subject_id: e.target.value});
    }
    const handleRoom=(e)=>{
        setData({...data, room_id: e.target.value});
    }

    const handleDateTime=(e)=>{
        setData({...data, requestTime: e.target.value});
    }
    const handleReason=(e)=>{
        setData({...data, reason: e.target.value});
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
            const request={...data,requestTime:new Date(data.requestTime).toISOString()}
            const response = await fetch('http://localhost:8080/makeups/create', {
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
    },[])

    if(props.user.role==="ADMIN"){
        navigate('/');
    }
    useEffect(()=>{
        if(props.user.role==="ADMIN"){
            navigate('/');
        }else
            setData({...data,user_id: props.user.userId})
    },[props.user])

    useEffect(() => {

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
                    <FloatingLabel label="Ngày muốn bù" className="mb-3"
                    >
                        <Form.Control  value={data.requestTime} onChange={handleDateTime} className="rounded-0"  type="date"
                                       placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel  label="Lý do" className="mb-3">
                        <Form.Control as="textarea" style={{minHeight:"150px",maxHeight:"200px"}} value={data.reason} className="rounded-0"
                                      onChange={handleReason} placeholder="diadiem" />
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