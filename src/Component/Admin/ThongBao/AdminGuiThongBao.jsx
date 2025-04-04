import {Button, Container, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import {useParams} from "react-router";
import {useEffect, useState} from "react";

export default function AdminGuiThongBao(){
    const {id}=useParams()
    let data=[{id:1,name:"ten"},{id:2,name:"ten2"},{id:3,name:"ten3"}]
    let nhan=[]
    let show=data.filter((i)=>!nhan.some(item=>i.id===item.id))
    const [nhanID,setnhanID]=useState(0)
    const handleChange=(e)=>{
        setnhanID(e.target.value)
    }
    return(
        <Container fluid>
            <hr className="my-3"/>
            <h1>Gửi thông báo</h1>
            <FloatingLabel controlId="floatingSelect" label="Người nhận">
                <Form.Select onChange={(e)=>handleChange(e)} value={nhanID} aria-label="Floating label select example">
                    <option value={0} selected disabled>Chọn người nhận</option>
                    {show.map(item=>
                        <option value={item.id}>{item.name}</option>
                    )}
                </Form.Select>
            </FloatingLabel>
            <Button onClick={()=>{
                data.map(item=>{
                    if(item.id==nhanID){
                        nhan.push({id:item.id,name:item.name})
                    }
                })
                console.log(nhan)
            }}>Test</Button>
        </Container>
    )
}