import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Button, Container, Modal, Spinner} from "react-bootstrap";
import {useTheme} from "@table-library/react-table-library/theme";
import {CompactTable} from "@table-library/react-table-library/compact";
import {SortToggleType, useSort} from "@table-library/react-table-library/sort";
import {usePagination} from "@table-library/react-table-library/pagination";

export default function DanhSachLopHoc(){
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({id:""});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [show, setShow] = useState(false);
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
                    headers: {'Content-Type': 'application/json'},
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
            headers: {'Content-Type': 'application/json'},
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
    const sort = useSort(
        data,
        {
            onChange: onSortChange,
        },
        {
            sortToggleType: SortToggleType.AlternateWithReset,
            sortFns: {
                id: (array) => array.sort((a, b) => a.classId - b.classId),
                tenmonhoc: (array) => array.sort((a, b) => a.subject.subjectName.localeCompare(b.subject.subjectName)),
                tenphong: (array) => array.sort((a, b) => a.room.roomName.localeCompare(b.room.roomName)),
                diadiem: (array) => array.sort((a, b) => a.room.location.localeCompare(b.room.location)),
                tennguoidung: (array) => array.sort((a, b) => a.user.fullname.localeCompare(b.user.fullname)),
                email: (array) => array.sort((a, b) => a.user.email.localeCompare(b.user.email)),
                gioBatDau: (array) => array.sort((a, b) => a.shift.startTime.localeCompare(b.shift.startTime)),
                gioKetThuc: (array) => array.sort((a, b) => a.shift.endTime.localeCompare(b.shift.endTime)),
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
    const COLUMNS = [
        { label: 'ID', renderCell: (item) => item.classId,sort: { sortKey: "id" } },
        { label: 'Tên môn học', renderCell: (item) => item.subject.subjectName,sort: { sortKey: "tenmonhoc" } },
        { label: 'Tên phòng', renderCell: (item) => item.room.roomName,sort: { sortKey: "tenphong" } },
        { label: 'Địa điểm ', renderCell: (item) => item.room.location,sort: { sortKey: "diadiem" } },
        { label: 'Tên giảng viên ', renderCell: (item) => item.user.fullname,sort: { sortKey: "tennguoidung" } },
        { label: 'Email', renderCell: (item) => item.user.email,sort: { sortKey: "email" } },
        { label: 'Giờ bắt đầu', renderCell: (item) => item.shift.startTime,sort: { sortKey: "gioBatDau" } },
        { label: 'Giờ kết thúc', renderCell: (item) => item.shift.endTime,sort: { sortKey: "gioKetThuc" } },
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
                --data-table-library_grid-template-columns:  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
      `,
    });
    return (
        <>
            <hr className="my-3"/>
            <div className="container-fluid d-flex flex-column gap-3 pb-3">
                <h3>
                    Danh sách lớp học
                </h3>
                <Container>
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