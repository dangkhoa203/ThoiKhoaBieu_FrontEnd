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
import TaoPhong from "./Admin/Phong/TaoPhong.jsx";
import SuaPhong from "./Admin/Phong/SuaPhong.jsx";
import SuaTaiKhoan from "./Admin/TaiKhoan/SuaTaiKhoan.jsx";
import AdminDanhSachThongBao from "./Admin/ThongBao/AdminDanhSachThongBao.jsx";
import AdminGuiThongBao from "./Admin/ThongBao/AdminGuiThongBao.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import AdminTaoThongBao from "./Admin/ThongBao/AdminTaoThongBao.jsx";
import PhongMenu from "./Admin/Phong/PhongMenu.jsx";
import DanhSachPhong from "./Admin/Phong/DanhSachPhong.jsx";
import CaHocMenu from "./Admin/CaHoc/CaHocMenu.jsx";
import DanhSachCaHoc from "./Admin/CaHoc/DanhSachCaHoc.jsx";
import TaoCaHoc from "./Admin/CaHoc/TaoCaHoc.jsx";
import SuaCaHoc from "./Admin/CaHoc/SuaCaHoc.jsx";
import MonHocMenu from "./Admin/MonHoc/MonHocMenu.jsx";
import DanhSachMonHoc from "./Admin/MonHoc/DanhSachMonHoc.jsx";
import TaoMonHoc from "./Admin/MonHoc/TaoMonHoc.jsx";
import SuaMonHoc from "./Admin/MonHoc/SuaMonHoc.jsx";

export default function RouteComponent(){
    return (
        <Routes>
            <Route element={<><p>Test</p>  </>} path="/"/>
            <Route element={<Test/>} path="/test"/>

            <Route path="/Admin" element={<Admin> </Admin>}>
                <Route path="Login" element={<AdminLogin/>}/>
                <Route path="TaiKhoan" element={ <TaiKhoanMenu/> } >
                    <Route path="DatMatKhau" element={ <DatLaiMatKhau/> }/>
                    <Route path="DanhSach" element={ <DanhSachTaiKhoan/> }/>
                    <Route path="Them" element={ <TaoTaiKhoan/> }/>
                    <Route path="Sua/:id" element={ <SuaTaiKhoan/> }/>
                </Route>
                <Route path="LichGiangDay" element={ <AdminLichGiangDayMenu/> } >
                    <Route path="DanhSach" element={ <AdminDanhSachLichGiang/> }/>
                    <Route path="Them" element={ <TaoPhong/> }/>
                    <Route path="Sua/:id" element={ <SuaPhong/> }/>
                </Route>
                <Route path="ThongBao" element={ <AdminThongBaoMenu/> } >
                    <Route path="DanhSach" element={ <AdminDanhSachThongBao/> }/>
                    <Route path="Tao" element={ <AdminTaoThongBao/> }/>
                    <Route path="Gui/:id" element={ <AdminGuiThongBao/> } />
                </Route>
                <Route path="Lop" element={ <AdminThongBaoMenu/> } >
                    <Route path="DanhSach" element={ <AdminDanhSachThongBao/> }/>
                    <Route path="Tao" element={ <AdminTaoThongBao/> }/>
                    <Route path="Gui/:id" element={ <AdminGuiThongBao/> } />
                </Route>
                <Route path="Phong" element={ <PhongMenu/> } >
                    <Route path="DanhSach" element={ <DanhSachPhong/> }/>
                    <Route path="Them" element={ <TaoPhong/> }/>
                    <Route path="Sua/:id" element={ <SuaPhong/> } />
                </Route>
                <Route path="CaHoc" element={ <CaHocMenu/> } >
                    <Route path="DanhSach" element={ <DanhSachCaHoc/> }/>
                    <Route path="Them" element={ <TaoCaHoc/> }/>
                    <Route path="Sua/:id" element={ <SuaCaHoc/> } />
                </Route>
                <Route path="MonHoc" element={ <MonHocMenu/> } >
                    <Route path="DanhSach" element={ <DanhSachMonHoc/> }/>
                    <Route path="Them" element={ <TaoMonHoc/> }/>
                    <Route path="Sua/:id" element={ <SuaMonHoc/> } />
                </Route>
            </Route>
        </Routes>
    )
}