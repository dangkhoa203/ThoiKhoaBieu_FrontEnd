import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Button, Container, Dropdown, DropdownButton, Form, InputGroup, Modal, Spinner} from "react-bootstrap";
import {useTheme} from "@table-library/react-table-library/theme";
import {CompactTable} from "@table-library/react-table-library/compact";
import {SortToggleType, useSort} from "@table-library/react-table-library/sort";
import {usePagination} from "@table-library/react-table-library/pagination";

export default function DanhSachLopHoc(props){
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({id:""});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState(1)
    const [search, setSearch] = useState("");
    const [searchLabel, setSearchLabel] = useState("Tên môn học");

    useEffect(() => {
        console.log(searchLabel)
        switch (mode){
            case 1:
                setSearchLabel("Tên môn học");
                break;
            case 2:
                setSearchLabel("Tên giảng viên");
                break;
            case 3:
                setSearchLabel("Tên email");
                break;
            case 4:
                setSearchLabel("Ngày bắt đầu");
                break;
            case 5:
                setSearchLabel("Ngày kết thúc");
                break;
            default:
                setSearchLabel("Tên môn học");
                break;

        }
    },[mode])
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (id) =>{
        setDeleteModal({id:id});
        setShow(true);}
    const deleteData= async ()=>{
        if(show) {
            try {
                setDeleteLoading(true);
                setDeleteError("");
                const response = await fetch(`http://localhost:8080/classess/delete/${deleteModal.id}`, {
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
        const response = await fetch('http://localhost:8080/classess', {
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
                        return  item.subject.subjectName.toLowerCase().includes(search.toLowerCase())
                    case 2:
                        return item.user.fullname.toLowerCase().includes(search.toLowerCase())

                    case 3:
                        return item.user.email.toLowerCase().includes(search.toLowerCase())
                    case 4:
                        return item.startTime.toLowerCase().includes(search.toLowerCase())
                    case 5:
                        return item.endTime.toLowerCase().includes(search.toLowerCase())

                    default:
                        return item.subject.subjectName.toLowerCase().includes(search.toLowerCase())

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
                id: (array) => array.sort((a, b) => a.classId - b.classId),
                tenmonhoc: (array) => array.sort((a, b) => a.subjectName.localeCompare(b.subject.subjectName)),
                tennguoidung: (array) => array.sort((a, b) => a.fullname.localeCompare(b.user.fullname)),
                email: (array) => array.sort((a, b) => a.email.localeCompare(b.user.email)),
                gioBatDau: (array) => array.sort((a, b) => a.startTime.localeCompare(b.startTime)),
                gioKetThuc: (array) => array.sort((a, b) => a.endTime.localeCompare(b.endTime)),
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
        { label: 'ID', renderCell: (item) => item.classId,sort: { sortKey: "id" } },
        { label: 'Tên môn học', renderCell: (item) => item.subject.subjectName,sort: { sortKey: "tenmonhoc" } },
        { label: 'Tên giảng viên ', renderCell: (item) => item.user.fullname,sort: { sortKey: "tennguoidung" } },
        { label: 'Email', renderCell: (item) => item.user.email,sort: { sortKey: "email" } },
        { label: 'Ngày bắt đầu', renderCell: (item) => item.startTime,sort: { sortKey: "gioBatDau" } },
        { label: 'Ngày kết thúc', renderCell: (item) => item.endTime,sort: { sortKey: "gioKetThuc" } },
        {label: '',renderCell: (item) => <div className="gap-2 d-flex justify-content-center align-items-center">
                <Button variant="danger" style={{width:"70px"}} className="rounded-pill" onClick={()=>handleShow(item.classId)}>Xóa</Button>
                <Button variant="secondary" style={{width:"70px"}} className="rounded-pill" onClick={()=>{
                    navigate(`../sua/${item.classId}`)
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
            <div className="container-fluid d-flex flex-column gap-3 pb-3">
                <h1 className="page-header">
                    Danh sách lớp học
                </h1>
                <Container>
                    <Container className="d-flex p-0 justify-content-end" fluid>
                        <InputGroup style={{width:"400px"}} className="mb-3 rounded-0">
                            <DropdownButton
                                variant="dark"
                                title={searchLabel}

                            >
                                <Dropdown.Item onClick={()=>setMode(1)}>Tên môn học</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMode(2)}>Tên giảng viên</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMode(3)}>Email</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMode(4)}>Ngày bắt đầu</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMode(5)}>Ngày kết thúc</Dropdown.Item>
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
                    <Modal.Title>Xóa lớp học </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Bạn có muốn xóa lớp học với Id: {deleteModal.id}
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