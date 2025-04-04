import {useTheme} from "@table-library/react-table-library/theme";
import {useState} from "react";
import {CompactTable} from "@table-library/react-table-library/compact";
import {Button, Container, Modal} from "react-bootstrap";
import {useNavigate} from "react-router";

export  default  function AdminDanhSachLichGiang(){
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({name:""});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (name) =>{
        setDeleteModal({name:name});
        setShow(true);}
    const [nodes,setNodes] = useState( [
        {
            id: '0',
            name: 'Shopping List',
            deadline: new Date(2020, 1, 15),
            type: 'TASK',
            isComplete: true,
            nodes: 3,
        },
        {
            id: '1',
            name: 'Shopping',
            deadline: new Date(2020, 1, 15),
            type: 'TASK',
            isComplete: true,
            nodes: 3,
        },
    ]);
    const newdata=[
        {
            ID:"1",
            Nhom:"1",
            TO_TH:"1",
            MSCB:"1",
            MALOP:"1",
            SISO:1,
            THU:2,
            TIETHOC:"1",
            THOIGIANHOC_BD:"1",
            THOIGIANHOC_KT:"1",
            MAPM:"1",
            HOCKY:'1',
            NAMHOC:"1",
            TUAN:"1"
        }
    ]

    let data={nodes}


    const COLUMNS = [
        { label: 'Task', renderCell: (item) => item.name },
        {
            label: 'Deadline',
            renderCell: (item) =>
                item.deadline.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }),
        },
        { label: 'Type', renderCell: (item) => item.type },
        {
            label: 'Complete',
            renderCell: (item) => item.isComplete.toString(),
        },
        { label: 'Tasks', renderCell: (item) => item.nodes },
        {label: '',renderCell: (item) => <div className="gap-2 d-flex justify-content-center align-items-center">
                <Button variant="danger" className="rounded-pill" onClick={()=>handleShow(item.name)}>Delete</Button>
                <Button variant="secondary" className="rounded-pill" onClick={()=>{
                    navigate(`../sua/${item.name}`)
                }} >Update</Button>
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
        }

        &:hover .td {
          background-color: #434656;
           transition: 0.3s all ease-in-out;
        }
      `,
        Table: `
                --data-table-library_grid-template-columns:  1fr 1fr 1fr 1fr 1fr 1fr ;
      `,
    });
    return (
        <>
            <hr className="my-3"/>
            <div className="container-fluid d-flex flex-column gap-3">
                <h3>
                    Danh sách tài khoản
                </h3>
                <Container>
                    <CompactTable layout={{custom: true, horizontalScroll: true}} columns={COLUMNS} theme={theme} data={data}/>
                </Container>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Xóa {deleteModal.name} </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    I will not close if you click outside me. Do not even try to press
                    escape key.
                </Modal.Body >
                <Modal.Footer>
                    <Button className="w-25" variant="outline-secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button className='w-25' variant="danger">Xóa</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}