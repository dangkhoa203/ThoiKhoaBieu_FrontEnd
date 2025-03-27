import {Route, Routes} from "react-router";
import Test from "./Test.jsx";
import Admin from "./Admin/Admin.jsx";
import TaiKhoanMenu from "./Admin/TaiKhoan/TaiKhoanMenu.jsx";

export default function RouteComponent(){
    return (
        <Routes>
            <Route element={<><p>Test</p>  </>} path="/"/>
            <Route element={<Test/>} path="/test"/>

            <Route path="/Admin" element={<Admin> </Admin>}>
                <Route path="TaiKhoan" element={ <TaiKhoanMenu/> } >
                    <Route path="DatMatKhau" element={ <> <p>test</p> </> }/>
                </Route>
            </Route>
        </Routes>
    )
}