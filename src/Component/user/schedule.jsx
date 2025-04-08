import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {SortToggleType, useSort} from "@table-library/react-table-library/sort";
import {usePagination} from "@table-library/react-table-library/pagination";
import {Button, Container, Dropdown, DropdownButton, Form, InputGroup, Modal, Spinner} from "react-bootstrap";
import {useTheme} from "@table-library/react-table-library/theme";
import {CompactTable} from "@table-library/react-table-library/compact";

function Schedule(props) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(1)
  const [search, setSearch] = useState("");
  const [searchLabel, setSearchLabel] = useState("Môn học");

  useEffect(() => {
    console.log(searchLabel)
    switch (mode){
      case 1:
        setSearchLabel("Môn học");
        break;
      case 2:
        setSearchLabel("Giảng viên");
        break;
      case 3:
        setSearchLabel("Phòng");
        break;
      case 4:
        setSearchLabel("Thứ");
        break;
      case 5:
        setSearchLabel("Ngày");
        break;
      default:
        setSearchLabel("Môn học");
        break;

    }
  },[mode])
  const [nodes,setNodes] = useState( [
  ]);
  const getData=async ()=>{
    const response = await fetch('http://localhost:8080/classSchedules', {
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
  let data={nodes:nodes.filter(s=>s.userName===props.user.username)}
  data={ nodes: data.nodes.filter((item) =>{
          switch (mode){
            case 1:
              return  item.subjectName.toLowerCase().includes(search.toLowerCase())
            case 2:
              return item.userName.toLowerCase().includes(search.toLowerCase())

            case 3:
              return item.roomName.toLowerCase().includes(search.toLowerCase())
            case 4:
              return item.dayOfWeek.toLowerCase().includes(search.toLowerCase())
            case 5:
              return item.dateStart.toLowerCase().includes(search.toLowerCase())
            default:
              return item.subjectName.toLowerCase().includes(search.toLowerCase())
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
          tenmh: (array) => array.sort((a, b) => a.subjectName.localeCompare(b.subjectName)),
          gv: (array) => array.sort((a, b) => a.userName.localeCompare(b.userName)),
          phong: (array) => array.sort((a, b) => a.roomName.localeCompare(b.roomName)),
          diadiem: (array) => array.sort((a, b) => a.location.localeCompare(b.location)),
          gbd: (array) => array.sort((a, b) => a.startTime.localeCompare(b.startTime)),
          gkt: (array) => array.sort((a, b) => a.endTime.localeCompare(b.endTime)),
          thu: (array) => array.sort((a, b) => a.dayOfWeek.localeCompare(b.dayOfWeek)),
          ngay: (array) => array.sort((a, b) => a.dateStart.localeCompare(b.dateStart)),
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
    { label: 'Tên môn học', renderCell: (item) => item.subjectName,sort: { sortKey: "tenmh" } },
    { label: 'Giảng viên', renderCell: (item) => item.userName,sort: { sortKey: "gv" } },
    { label: 'Phòng', renderCell: (item) =>item.roomName,sort: { sortKey: "phong" }},
    { label: 'Địa điểm', renderCell: (item) =>item.location,sort: { sortKey: "diadiem" }},
    { label: 'Giờ bắt đầu', renderCell: (item) =>item.startTime,sort: { sortKey: "gbd" }},
    { label: 'Giờ kết thúc', renderCell: (item) =>item.endTime,sort: { sortKey: "gkt" }},
    { label: 'Thứ', renderCell: (item) =>item.dayOfWeek,sort: { sortKey: "thu" }},
    { label: 'Ngày', renderCell: (item) =>item.dateStart,sort: { sortKey: "ngay" }},
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
                --data-table-library_grid-template-columns:  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      `,
  });

  if(props.user.role==="ADMIN"){
    navigate('/');
  }
  useEffect(() => {
    if(props.user.role==="ADMIN"){
      navigate('/');
    }
  },[props.user]);
  return (
      <>
        <div className="container-fluid d-flex flex-column gap-3 pb-3 text-center pt-3">
          <h1 className="page-header">
            Lịch học
          </h1>
          <Container>
            <Container className="d-flex p-0 justify-content-end" fluid>
              <InputGroup style={{width:"400px"}} className="mb-3 rounded-0">
                <DropdownButton
                    variant="dark"
                    title={searchLabel}

                >
                  <Dropdown.Item onClick={()=>setMode(1)}>Môn học</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setMode(2)}>Giảng viên</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setMode(3)}>Phòng</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setMode(4)}>Thứ</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setMode(5)}>Ngày</Dropdown.Item>
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

      </>
  )
}

export default Schedule;