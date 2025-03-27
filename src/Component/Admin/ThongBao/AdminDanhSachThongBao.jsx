import {useState} from "react";
import {useTheme} from "@table-library/react-table-library/theme";
import {CompactTable} from "@table-library/react-table-library/compact";

export default function AdminDanhSachThongBao(){
    const [nodes,setNodes] = useState( [
        {
            id: '0',
            name: 'Shopping List',
            deadline: new Date(2020, 1, 15),
            type: 'TASK',
            isComplete: true,
            nodes: 3,
        },
    ]);
    const [mode, setMode] = useState(1)
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);

    };
    const handleMode = (event) => {
        setMode(event.target.value);
        console.log(event.target.value);
    };
    let data={nodes}
    data={ nodes: data.nodes.filter((item) =>{
                switch (mode){
                    case "1":
                        return  item.name.toLowerCase().includes(search.toLowerCase())
                    case "2":
                        console.log(search)
                        return item.type.toLowerCase().includes(search.toLowerCase())

                    case "3":
                        console.log(search)
                        return item.nodes.toString()===search

                    default:
                        return item.name.toLowerCase().includes(search.toLowerCase())

                }

            }
        ),
    }

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
    ];
    const theme = useTheme({
        HeaderRow: `
        .th {
          border: 1px solid black;
          border-bottom: 3px solid black;
           background-color: #eaf5fd;
        }
      `,
        BaseCell: `
        
      `,
        Row: `
        cursor: pointer;
        .td {
          border: 1px solid black;
          
          background-color: #9eb0f7;
        }

        &:hover .td {
          border-top: 1px solid orange;
          border-bottom: 1px solid orange;
        }
      `,
        Table: `
        
      `,
    });
    return (
        <>
            <div className="container-fluid d-flex flex-column gap-3">
                <h3>
                    Danh sách tài khoản
                </h3>
                <label htmlFor="search">
                    Search by Task:&nbsp;
                    <input id="search" type="text" value={search} onChange={handleSearch} />
                </label>
                <select onChange={(e=>handleMode(e))} >
                    <option value={1}>Task</option>
                    <option value={2}>Type</option>
                    <option value={3}>Tasks</option>
                </select>
                <br />
                <CompactTable columns={COLUMNS} theme={theme} data={data}/>
            </div>
        </>
    )
}