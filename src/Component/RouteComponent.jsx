import {Route, Routes} from "react-router";
import Test from "./Test.jsx";
import Admin from "./Admin/Admin.jsx";
import TaiKhoanMenu from "./Admin/TaiKhoan/TaiKhoanMenu.jsx";
import AdminLichGiangDayMenu from "./Admin/LichGiangDay/AdminLichGiangDayMenu.jsx";
import AdminThongBaoMenu from "./Admin/ThongBao/AdminThongBaoMenu.jsx";
import DatLaiMatKhau from "./Admin/TaiKhoan/DatLaiMatKhau.jsx";
import DanhSachTaiKhoan from "./Admin/TaiKhoan/DanhSachTaiKhoan.jsx";
import TaoTaiKhoan from "./Admin/TaiKhoan/TaoTaiKhoan.jsx";
import AdminDanhSachLichGiang from "./Admin/LichGiangDay/AdminDanhSachLichGiang.jsx";
import AdminThemLichGiang from "./Admin/LichGiangDay/AdminThemLichGiang.jsx";
import AdminSuaLichGiang from "./Admin/LichGiangDay/AdminSuaLichGiang.jsx";
import SuaTaiKhoan from "./Admin/TaiKhoan/SuaTaiKhoan.jsx";
import AdminDanhSachThongBao from "./Admin/ThongBao/AdminDanhSachThongBao.jsx";
import AdminGuiThongBao from "./Admin/ThongBao/AdminGuiThongBao.jsx";

export default function RouteComponent(){
    return (
        <Routes>
            <Route element={<><p>Test</p>  </>} path="/"/>
            <Route element={<Test/>} path="/test"/>

            <Route path="/Admin" element={<Admin> </Admin>}>
                <Route path="TaiKhoan" element={ <TaiKhoanMenu/> } >
                    <Route path="DatMatKhau" element={ <DatLaiMatKhau/> }/>
                    <Route path="DanhSach" element={ <DanhSachTaiKhoan/> }/>
                    <Route path="Them" element={ <TaoTaiKhoan/> }/>
                    <Route path="Sua/:id" element={ <SuaTaiKhoan/> }/>
                </Route>
                <Route path="LichGiangDay" element={ <AdminLichGiangDayMenu/> } >
                    <Route path="DanhSach" element={ <AdminDanhSachLichGiang/> }/>
                    <Route path="Them" element={ <AdminThemLichGiang/> }/>
                    <Route path="Sua/:id" element={ <AdminSuaLichGiang/> }/>
                </Route>
                <Route path="ThongBao" element={ <AdminThongBaoMenu/> } >
                    <Route path="DanhSach" element={ <AdminDanhSachThongBao/> }/>
                    <Route path="Gui" element={ <AdminGuiThongBao/> } />
                </Route>
            </Route>
        </Routes>
    )
}