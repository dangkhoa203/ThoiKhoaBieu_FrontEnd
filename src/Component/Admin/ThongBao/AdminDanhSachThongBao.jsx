import {useState} from "react";
import {useTheme} from "@table-library/react-table-library/theme";
import {CompactTable} from "@table-library/react-table-library/compact";
import {useNavigate} from "react-router";
import {Button, Container, Modal, Spinner} from "react-bootstrap";

export default function AdminDanhSachThongBao(){
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({id:"",name:""});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id,name) =>{
        setDeleteModal({id:id,name:name});
        setShow(true);}
    const handleDelete = (id) =>{
        console.log(id)
        handleClose()
    }
    const [loading, setLoading] = useState(false);
    const [nodes,setNodes] = useState( [
        {
            id:'1',
            message:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAA",
        },
        {
            id:'2',
            message:"B",
        },
    ]);

    const data={nodes}
    const COLUMNS = [
        { label: 'ID', renderCell: (item) => item.id },
        { label: 'Thông báo', renderCell: (item) => item.message },
        {label: '',renderCell: (item) => <div className="gap-2 d-flex justify-content-center align-items-center">
                <Button variant="primary" style={{width:"100px"}}  onClick={()=>handleShow(item.id,item.name)}>Xem</Button>
                <Button variant="danger" style={{width:"100px"}}  onClick={()=>handleShow(item.id,item.name)}>Xóa</Button>
                <Button variant="success" style={{width:"100px"}} onClick={()=>{
                    navigate(`../Gui/${item.id}`)
                }} >Gửi</Button>
            </div>},
    ];
    const theme = useTheme({
        HeaderRow: `
        .th {
          border: 1px solid black;
          border-bottom: 3px solid black;
           background-color: #f2a099;
           text-align: center;
        }
      `,
        BaseCell: `
        
      `,
        Row: `
        cursor: pointer;
        .td {
          border: 1px solid black;
          font-size:1.1em;
          font-weight: lighter;
          background-color: #1D243A;
          color: white;
           transition: 0.3s all ease-in-out;
           text-overflow: ellipsis;
           max-width: 550px;
        }

        &:hover .td {
          background-color: #434656;
           transition: 0.3s all ease-in-out;
        }
      `,
        Table: `
                --data-table-library_grid-template-columns:  1fr 1fr 1fr ;
      `,
    });
    return (
        <Container fluid>
            <hr className="my-3"/>
            <div className="container-fluid d-flex flex-column gap-3">
                <h3>
                    Danh sách tài khoản
                </h3>
                {loading ? <div className="mx-auto"> <Spinner variant="info"  animation="grow" /> <Spinner variant="danger"  animation="grow" />  <Spinner  animation="grow" />  </div> :
                    <Container><CompactTable layout={{custom: true, horizontalScroll: true}} columns={COLUMNS} theme={theme} data={data}/></Container>
                }

            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Xóa {deleteModal.id} </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p>Bạn có muốn xóa {deleteModal.name}</p>
                </Modal.Body >
                <Modal.Footer>
                    <Button className="w-25" variant="outline-secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button className='w-25' variant="danger" onClick={()=>handleDelete(deleteModal.id)}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}