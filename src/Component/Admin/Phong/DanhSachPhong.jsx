import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Button, Container, Dropdown, DropdownButton, Form, InputGroup, Modal, Spinner} from "react-bootstrap";
import {useTheme} from "@table-library/react-table-library/theme";
import {CompactTable} from "@table-library/react-table-library/compact";
import {SortToggleType, useSort} from "@table-library/react-table-library/sort";
import {usePagination} from "@table-library/react-table-library/pagination";

export default function DanhSachPhong(props){
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({id:"",name:""});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState(1)
    const [search, setSearch] = useState("");
    const [searchLabel, setSearchLabel] = useState("Tên");

    useEffect(() => {
        console.log(searchLabel)
        switch (mode){
            case 1:
                setSearchLabel("Tên");
                break;
            case 2:
                setSearchLabel("Vị trí");
                break;

            default:
                setSearchLabel("Username");
                break;

        }
    },[mode])
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (id,name) =>{
        setDeleteModal({id:id,name:name});
        setShow(true);}
    const deleteData= async ()=>{
        if(show) {
            try {
                setDeleteLoading(true);
                setDeleteError("");
                const response = await fetch(`http://localhost:8080/rooms/delete/${deleteModal.id}`, {
                    headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.user.token},
                    method: "DELETE",
                });
                const content = await response.json();
                if (!response.ok) {
                    setDeleteError(content.message);
                } else {
                    getData()
                    handleClose()
                }
            } catch (error) {
                setDeleteError("Lỗi server!")
            } finally {
                setDeleteLoading(false);
            }
        }
    }
    //Dữ liệu
    const [nodes,setNodes] = useState( [

    ]);
    const getData=async ()=>{
        const response = await fetch('http://localhost:8080/rooms', {
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.user.token},
            method:"GET",
            credentials:'include'
        });
        const content = await response.json();
        if (!response.ok) {
            console.log(content.message);
        }else {
            setNodes(content.result);
        }
    }
    useEffect(()=>{
        getData();
    },[])
    let data={nodes}
    data={ nodes: data.nodes.filter((item) =>{
                switch (mode){
                    case 1:
                        return  item.roomName.toLowerCase().includes(search.toLowerCase())
                    case 2:
                        return item.location.toLowerCase().includes(search.toLowerCase())
                    default:
                        return item.roomName.toLowerCase().includes(search.toLowerCase())

                }

            }
        ),
    }
    const sort = useSort(
        data,
        {
            onChange: onSortChange,
        },
        {
            sortToggleType: SortToggleType.AlternateWithReset,
            sortFns: {
                id: (array) => array.sort((a, b) => a.roomId - b.roomId),
                ten: (array) => array.sort((a, b) => a.roomName.localeCompare(b.roomName)),
                soluong: (array) => array.sort((a, b) => a.capacity - b.capacity),
                diadiem: (array) => array.sort((a, b) => a.location.localeCompare(b.location)),
                ngaytao: (array) => array.sort((a, b) => a.createdAt - b.createdAt),
                ngaysua: (array) => array.sort((a, b) => a.updatedAt - b.updatedAt),
            },
        }
    );
    function onSortChange(action, state) {}
    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 10,
        },
        onChange: onPaginationChange,
    });
    function onPaginationChange(action, state) {}
    const handleSearch = (event) => {
        setSearch(event.target.value);
        pagination.fns.onSetPage(0)
    };
    const COLUMNS = [
        { label: 'ID', renderCell: (item) => item.roomId,sort: { sortKey: "id" } },
        { label: 'Tên phòng', renderCell: (item) => item.roomName,sort: { sortKey: "ten" } },
        { label: 'Số lượng', renderCell: (item) => item.capacity,sort: { sortKey: "soluong" } },
        { label: 'Địa điểm ', renderCell: (item) => item.location,sort: { sortKey: "diadiem" } },
        {
            label: 'Ngày tạo',
            renderCell: (item) =>
                new Date(item.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                },),
            sort: { sortKey: "ngaytao" }
        },
        {
            label: 'Ngày sửa',
            renderCell: (item) =>
                new Date(item.updatedAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }),
            sort: { sortKey: "ngaysua" }
        },
        {label: '',renderCell: (item) => <div className="gap-2 d-flex justify-content-center align-items-center">
                <Button variant="danger" style={{width:"70px"}} className="rounded-pill" onClick={()=>handleShow(item.roomId,item.roomName)}>Xóa</Button>
                <Button variant="secondary" style={{width:"70px"}} className="rounded-pill" onClick={()=>{
                    navigate(`../sua/${item.roomId}`)
                }} >Sửa</Button>
            </div>},
    ];
    const theme = useTheme({
        HeaderRow: `
        .th {
          border: 1px solid black;
          border-bottom: 3px solid black;
           background-color: #f2a099;
           text-align: center;
           div{
           margin: auto;
           }
           
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
                --data-table-library_grid-template-columns:  1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
      `,
    });
    if(props.user.role==="GIANGVIEN"){
        navigate('/');
    }
    useEffect(() => {
        if(props.user.role==="GIANGVIEN"){
            navigate('/');
        }
    },[props.user]);
    return (
        <>
            <hr className="my-3"/>
            <div className="container-fluid d-flex flex-column gap-3">
                <h1 className="page-header">
                    Danh sách phòng
                </h1>
                <Container>
                    <Container className="d-flex p-0 justify-content-end" fluid>
                        <InputGroup style={{width:"400px"}} className="mb-3 rounded-0">
                            <DropdownButton
                                variant="dark"
                                title={searchLabel}

                            >
                                <Dropdown.Item onClick={()=>setMode(1)}>Tên</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMode(2)}>Vị trí</Dropdown.Item>
                            </DropdownButton>
                            <Form.Control value={search} placeholder="Search" onChange={handleSearch}  />
                        </InputGroup>
                    </Container>
                    <CompactTable layout={{custom: true, horizontalScroll: true}}
                                  pagination={pagination} sort={sort} columns={COLUMNS}
                                  theme={theme} data={data}/>
                    {nodes.length === 0 ? <p className="text-center">Không có dữ liệu </p> :
                        <div className="d-flex justify-content-end">
                           <span>
                                Trang:{" "}
                               {pagination.state.getPages(data.nodes).map((_, index) => (
                                   <button
                                       className={`btn ${pagination.state.page === index ? "btn-primary" : "btn-outline-primary"} btn-sm`}
                                       key={index}
                                       type="button"
                                       style={{
                                           marginRight: "5px",
                                           fontWeight: pagination.state.page === index ? "bold" : "normal",
                                       }}
                                       onClick={() => pagination.fns.onSetPage(index)}
                                   >
                                       {index + 1}
                                   </button>
                               ))}
                           </span>
                        </div>}
                </Container>
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
                    Bạn có muốn xóa {deleteModal.name}
                    <p className="text-danger h4 text-center">{deleteError}</p>
                </Modal.Body >
                <Modal.Footer>
                    <Button className="w-25" variant="outline-secondary" disabled={deleteLoading} onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button className='w-25' style={{fontSize:"1em"}} onClick={()=>deleteData()} disabled={deleteLoading} variant="danger">
                        {deleteLoading ?
                            <>
                                <Spinner size="sm" animation="border" variant="light" />
                                Loading
                            </>
                            :"Xóa"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}