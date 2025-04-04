import {Link, matchPath, Outlet, useLocation, useNavigate} from "react-router";
import {Button, Col, Container, Dropdown, FloatingLabel, Form, Navbar, Offcanvas, Row, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import '/src/CSS/AdminNavBar.css'
export default function Admin(){
    const navigate = useNavigate();
    const [admin,setAdmin] = useState({
        islog:true,
        name:"admin"
    }
    );
    const { pathname } = useLocation();
    const isAdminPath = matchPath("/admin", pathname);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        // setAdmin({islog:false,name:""});
    },[])
    useEffect(()=>{
        if(!admin.islog && admin.name===""){
            navigate("login");
        }
    },[admin])


    return(
        <>
            {!admin.islog ? "" :
                <Navbar className=" bg-light " id="admin-NavBar">
                    <Container className="d-flex justify-content-between w-100" id="admin-NavBar-Content" fluid>
                        <button className="Menu-Button" style={{marginLeft:"10px"}} onClick={handleShow}>
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <Dropdown style={{marginRight:"10px"}}>
                            <Dropdown.Toggle variant='outline-dark' className="rounded-0 border-0" style={{minWidth:"160px"}}  id="dropdown-basic">
                                ADMIN
                            </Dropdown.Toggle>
                            <Dropdown.Menu   className="rounded-0 ">
                                <Dropdown.Item as='button' onClick={()=>setAdmin({islog: false,name: ""})}>Đăng xuất</Dropdown.Item>
                                <Dropdown.Item as='button' onClick={()=>navigate('/')}>Chế độ giảng viên </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                </Navbar>
            }

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header className="menu-header">
                    <Offcanvas.Title className="w-100 text-center text-white" style={{textTransform:"uppercase",fontSize:"2em"}}>Quản lý lịch học</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 menu-body">
                    <button className='NavButton rounded-0' onClick={()=>navigate("taikhoan")}><i className="bi bi-person"></i> Tài khoản</button>
                    <button className='NavButton rounded-0' onClick={() => navigate("LichGiangDay")}><i className="bi bi-clock-history"></i> Lịch giảng dạy</button>
                    <button className='NavButton rounded-0' onClick={()=>navigate("ThongBao")}><i className="bi bi-send"></i> Thông báo</button>
                    <button className='NavButton rounded-0' onClick={()=>navigate("Phong")}><i className="bi bi-person-workspace"></i> Phòng học</button>
                    <button className='NavButton rounded-0' onClick={()=>navigate("MonHoc")}><i className="bi bi-backpack2"></i> Môn học</button>
                    <button className='NavButton rounded-0' onClick={()=>navigate("CaHoc")}><i className="bi bi-table"></i> Ca học</button>
                </Offcanvas.Body>
            </Offcanvas>
            {isAdminPath ?
                <Stack className="pt-3 px-5 justify-content-center align-content-center text-center">
                    <h1>Xin chào Admin</h1>
                    <Row className="pt-2">
                        <Col sm={6} md={4} xs={12}>
                            <button style={{width:"100%"}} className="Menu-Navigation-Button" onClick={()=>navigate("taikhoan")}>Tài khoản</button>
                        </Col>
                        <Col sm={6} md={4} xs={12}>
                            <button style={{width:"100%"}} className="Menu-Navigation-Button" onClick={() => navigate("LichGiangDay")}>Lịch giảng dạy</button>
                        </Col>
                        <Col sm={6} md={4} xs={12}>
                            <button style={{width:"100%"}} className="Menu-Navigation-Button" onClick={()=>navigate("ThongBao")}>Thông báo</button>
                        </Col>
                        <Col sm={6} md={4} xs={12}>
                            <button style={{width:"100%"}} className="Menu-Navigation-Button" onClick={()=>navigate("Phong")}>Phòng</button>
                        </Col>
                        <Col sm={6} md={4} xs={12}>
                            <button style={{width:"100%"}} className="Menu-Navigation-Button" onClick={()=>navigate("MonHoc")}>Môn học</button>
                        </Col>
                        <Col sm={6} md={4} xs={12}>
                            <button style={{width:"100%"}} className="Menu-Navigation-Button" onClick={()=>navigate("CaHoc")}>Ca học</button>
                        </Col>
                    </Row>
                </Stack> :
                <Container fluid className="justify-content-center flex-column d-flex pt-3" >
                    <Outlet context={{admin}}/>
                </Container>
            }

        </>

    )
}