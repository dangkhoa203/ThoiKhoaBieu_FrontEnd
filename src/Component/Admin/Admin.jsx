import {Link, Outlet, useNavigate} from "react-router";
import {Button, Col, Container, Dropdown, FloatingLabel, Form, Navbar, Offcanvas, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import '/src/CSS/AdminNavBar.css'
export default function Admin(){
    const navigate = useNavigate();
    const [admin,setAdmin] = useState({
        islog:true,
        name:"admin"
    }
    );
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        // setAdmin({islog:false,name:""});
    },[])
    if(!admin.islog && admin.name===""){
        navigate("login");
    }
    return(
        <>
            <Navbar className=" bg-light " id="admin-NavBar">
                <Container className="d-flex justify-content-between w-100" id="admin-NavBar-Content" fluid>
                    <Button variant="primary" onClick={handleShow}>
                        Launch
                    </Button>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Xin chào {admin.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>console.log("Logout")}>LogOut</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header className="menu-header">
                    <Offcanvas.Title className="w-100 text-center text-white" style={{textTransform:"uppercase",fontSize:"2em"}}>Quản lý lịch học</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 menu-body">
                    <button className='NavButton rounded-0' onClick={()=>navigate("taikhoan")}><i className="bi bi-person"></i> Tài khoản</button>
                    <button className='NavButton rounded-0' onClick={() => navigate("LichGiangDay")}><i className="bi bi-clock-history"></i> Lịch giản dạy</button>
                    <button className='NavButton rounded-0' onClick={()=>navigate("ThongBao")}><i className="bi bi-send"></i> Thông báo</button>
                </Offcanvas.Body>
            </Offcanvas>

                        <Container fluid className="justify-content-center d-flex pt-3" >
                            <Outlet context={{admin}}/>
                        </Container>

        </>

    )
}