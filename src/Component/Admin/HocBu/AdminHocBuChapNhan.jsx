import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import ErrorPage from "../../ErrorPage.jsx";
import {Button, Col, Container, FloatingLabel, Form, Row, Spinner} from "react-bootstrap";

export default function AdminHocBuChapNhan(props){
    let curr = new Date();
    curr.setDate(curr.getDate()+1);
    const date = curr.toISOString().substring(0,10);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id}=useParams()
    const [notFound,setNotFound]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [subjectData, setSubjectData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [shiftData, setShiftData] = useState([]);
    const [data,setData]=useState({makeupDate:date,shift_id:0})
    const [showData, setShowData]=useState({uName:"",sName:"",rName:""});
    const getData=async ()=>{
        const response=await fetch(`http://localhost:8080/makeups/${id}`,{
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
            setShowData({
                sName:content.result.subject.subjectName,
                rName:content.result.room.roomName,
                uName:content.result.user.fullname,
            })
        }
    }
    const handleDate=(e)=>{
        setData({...data,makeupDate:e.target.value})
    }
    const handleShift=(e)=>{
        setData({...data,shift_id:e.target.value})
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
        if(data.room_id===""||data.user_id===""||data.subject_id===""||data.shift_id===""||data.makeupDate===""){
            setErrorMessage("Chưa nhập thông tin đầy đủ");
            return false;
        }
        return true;
    }
    const submit=async ()=>{
        setLoading(true);
        if(checkData()) {
            const request={...data,makeupDate:new Date(data.makeupDate).toISOString()}
            const response = await fetch(`http://localhost:8080/makeups/update/approve/${id}`, {
                headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.user.token},
                method: "PUT",
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
        getData();
        getSubjectData();
        getShiftData();
    },[])
    if(props.user.role==="GIANGVIEN"){
        navigate('/');
    }
    useEffect(() => {
        if(props.user.role==="GIANGVIEN"){
            navigate('/');
        }
    },[props.user]);
    if(notFound){
        return <ErrorPage message={errorMessage.message}/>
    }

    return(
        <Container fluid className="px-lg-5">
            <hr className="my-3"/>
            <h1 className="page-header">Sửa môn học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6}  xs={12}>
                    <FloatingLabel label="Tên giảng viên" className="mb-3"
                    >
                        <Form.Control  value={showData.uName} disabled className="rounded-0"
                                       placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel label="Tên môn" className="mb-3"
                    >
                        <Form.Control  value={showData.sName} disabled className="rounded-0"
                                       placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel label="Tên phòng" className="mb-3"
                    >
                        <Form.Control  value={showData.rName} disabled className="rounded-0"
                                       placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel label="Ca" className="mb-3"
                    >
                        <Form.Control  value={data.makeupDate} onChange={handleDate} className="rounded-0"  type="date"
                                       placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel className="mb-3" label="Ca">
                        <Form.Select value={data.shift_id} onChange={handleShift} className="rounded-0" >
                            <option selected disabled value={0}>Chọn thông tin</option>
                            {shiftData.map((item, index) => (
                                <option key={index} value={item.shiftId}>{item.shiftName} ({`${item.startTime} -> ${item.endTime}`})</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <h4 className="text-danger">{errorMessage}</h4>
            <Button className=" fw-bolder rounded-0 " onClick={()=>submit()}
                    style={{width:"300px"}} variant="success" disabled={loading}>
                {loading? <Spinner animation="border" variant="light" />:"Chấp nhận"}
            </Button>
        </Container>
    )
}