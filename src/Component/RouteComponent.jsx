import {Route, Routes} from "react-router";
import Test from "./Test.jsx";
import TaiKhoanMenu from "./Admin/TaiKhoan/TaiKhoanMenu.jsx";
import AdminLichGiangDayMenu from "./Admin/LichGiangDay/AdminLichGiangDayMenu.jsx";

import DanhSachTaiKhoan from "./Admin/TaiKhoan/DanhSachTaiKhoan.jsx";
import TaoTaiKhoan from "./Admin/TaiKhoan/TaoTaiKhoan.jsx";
import AdminDanhSachLichGiang from "./Admin/LichGiangDay/AdminDanhSachLichGiang.jsx";
import TaoPhong from "./Admin/Phong/TaoPhong.jsx";
import SuaPhong from "./Admin/Phong/SuaPhong.jsx";
import SuaTaiKhoan from "./Admin/TaiKhoan/SuaTaiKhoan.jsx";

import PhongMenu from "./Admin/Phong/PhongMenu.jsx";
import DanhSachPhong from "./Admin/Phong/DanhSachPhong.jsx";
import CaHocMenu from "./Admin/CaHoc/CaHocMenu.jsx";
import DanhSachCaHoc from "./Admin/CaHoc/DanhSachCaHoc.jsx";
import TaoCaHoc from "./Admin/CaHoc/TaoCaHoc.jsx";
import SuaCaHoc from "./Admin/CaHoc/SuaCaHoc.jsx";
import MonHocMenu from "./Admin/MonHoc/MonHocMenu.jsx";
import AdminDanhSachHocBu from "./Admin/HocBu/AdminDanhSachHocBu.jsx";
import TaoMonHoc from "./Admin/MonHoc/TaoMonHoc.jsx";
import SuaMonHoc from "./Admin/MonHoc/SuaMonHoc.jsx";
import LopHocMenu from "./Admin/LopHoc/LopHocMenu.jsx";
import DanhSachLopHoc from "./Admin/LopHoc/DanhSachLopHoc.jsx";
import TaoLopHoc from "./Admin/LopHoc/TaoLopHoc.jsx";
import SuaLopHoc from "./Admin/LopHoc/SuaLopHoc.jsx";
import AdminThemLichGiang from "./Admin/LichGiangDay/AdminThemLichGiang.jsx";
import HomePage from "./home/HomePage.jsx";
import Schedule from "./user/schedule.jsx";
import React from "react";
import Login from "./Login.jsx";
import AdminHocBuMenu from "./Admin/HocBu/AdminHocBuMenu.jsx";
import DanhSachMonHoc from "./Admin/MonHoc/DanhSachMonHoc.jsx";
import AdminHocBuChapNhan from "./Admin/HocBu/AdminHocBuChapNhan.jsx";
import MenuHocBu from "./user/MenuHocBu.jsx";
import DanhSachHocBu from "./user/DanhSachHocBu.jsx";
import TaoHocBu from "./user/TaoHocBu.jsx";
import NotFound from "./NotFound.jsx";

export default function RouteComponent(props){
    return (
        <Routes>
            <Route element={<HomePage user={props.user} getInfo={props.getInfo} logOut={props.logOut}/>} path="/">
                <Route path="Lich" element={<Schedule user={props.user} getInfo={props.getInfo} logOut={props.logOut}/>} />
                <Route path="HocBu" element={<MenuHocBu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/>} >
                    <Route path="DanhSach" element={ <DanhSachHocBu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Them" element={ <TaoHocBu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                </Route>
                <Route path="/Login" element={<Login user={props.user} getInfo={props.getInfo} logOut={props.logOut}/>}/>
                <Route path="TaiKhoan" element={ <TaiKhoanMenu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } >
                    <Route path="DanhSach" element={ <DanhSachTaiKhoan user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Them" element={ <TaoTaiKhoan user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Sua/:id" element={ <SuaTaiKhoan user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                </Route>
                <Route path="LichGiangDay" element={ <AdminLichGiangDayMenu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } >
                    <Route path="DanhSach" element={ <AdminDanhSachLichGiang user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Them" element={ <AdminThemLichGiang user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Sua/:id" element={ <SuaPhong user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                </Route>
                <Route path="Phong" element={ <PhongMenu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } >
                    <Route path="DanhSach" element={ <DanhSachPhong user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Them" element={ <TaoPhong user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Sua/:id" element={ <SuaPhong user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } />
                </Route>
                <Route path="CaHoc" element={ <CaHocMenu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } >
                    <Route path="DanhSach" element={ <DanhSachCaHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Them" element={ <TaoCaHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Sua/:id" element={ <SuaCaHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } />
                </Route>
                <Route path="MonHoc" element={ <MonHocMenu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } >
                    <Route path="DanhSach" element={ <DanhSachMonHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Them" element={ <TaoMonHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Sua/:id" element={ <SuaMonHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } />
                </Route>
                <Route path="LopHoc" element={ <LopHocMenu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } >
                    <Route path="DanhSach" element={ <DanhSachLopHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Them" element={ <TaoLopHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Sua/:id" element={ <SuaLopHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } />
                </Route>
                <Route path="HocBuAdmin" element={ <AdminHocBuMenu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } >
                    <Route path="DanhSach" element={ <AdminDanhSachHocBu user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="Them" element={ <TaoLopHoc user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> }/>
                    <Route path="ChapNhan/:id" element={ <AdminHocBuChapNhan user={props.user} getInfo={props.getInfo} logOut={props.logOut}/> } />
                </Route>
            </Route>
            <Route element={<Test/>} path="/test"/>
            <Route element={<NotFound/>} path="*"></Route>

        </Routes>
    )
}