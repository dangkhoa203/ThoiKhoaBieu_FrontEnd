import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import ErrorPage from "../../ErrorPage.jsx";
import {Button, Col, Container, FloatingLabel, Form, Row, Spinner} from "react-bootstrap";

export default function SuaMonHoc(props){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id}=useParams()
    const [notFound,setNotFound]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [data,setData]=useState({subjectName:"",description:""})
    const getData=async ()=>{
        const response=await fetch(`http://localhost:8080/subjects/${id}`,{
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
                subjectName:content.result.subjectName,
                description:content.result.description,
            })
        }
    }
    const handleNameChange = (e) => {
        setData({...data, subjectName: e.target.value});
    }
    const handleDescriptionChange = (e) => {
        setData({...data, description: e.target.value});
    }

    const checkData=()=>{
        setErrorMessage("")
        if(data.subjectName.length<=0||data.description.length<=0){
            setErrorMessage("Chưa nhập thông tin đầy đủ");
            return false;
        }
        return true;
    }
    const submit=async ()=>{
        setLoading(true);
        if(checkData()) {
            const response = await fetch(`http://localhost:8080/subjects/update/${id}`, {
                headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.user.token},
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
            <h1 className="page-header">Sửa thông tin môn học </h1>
            <Row className="px-5 pt-2 justify-content-center">
                <Col sm={6}  xs={12}>
                    <FloatingLabel label="Tên môn học" className="mb-3"
                    >
                        <Form.Control className="rounded-0" value={data.subjectName}
                                      onChange={handleNameChange} placeholder="phong"/>
                    </FloatingLabel>
                </Col>
                <Col sm={6}  xs={12}>
                    <FloatingLabel  label="Mô tả" className="mb-3">
                        <Form.Control as="textarea" style={{minHeight:"150px",maxHeight:"200px"}} value={data.description} className="rounded-0"
                                      onChange={handleDescriptionChange} placeholder="diadiem" />
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