import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function TaoMonHoc(){
    const [data, setData] = useState({subjectName:"",description:""});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleNameChange = (e) => {
        setData({...data, subjectName: e.target.value});
    }
    const handleDescriptionChange = (e) => {
        setData({...data, description: e.target.value});
    }

    const checkData=()=>{
        setErrorMessage("")
        if(data.subjectName.length<=0){
            setErrorMessage("Chưa nhập thông tin đầy đủ");
            return false;
        }
        return true;
    }
    const submit=async ()=>{
        setLoading(true);
        if(checkData()) {
            const response = await fetch('http://localhost:8080/subjects/create', {
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
            <h1>Tạo môn học </h1>
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
                {loading? <Spinner animation="border" variant="light" />:"Tạo"}
            </Button>
        </Container>
    )
}