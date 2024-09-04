import React, {useState} from 'react';
import './BottomNavBar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faBell, faUser, faPlusCircle, faRectangleList} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {ModalPlus} from "./ModalPlus.jsx";
import {Profile} from "../ Admin/Profile/Profile.jsx";


export default function BottomNavBar() {
    const [openModal, setOpenModal] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <div className="bottom-nav-bar dark:bg-black-pro">
            <Link to={"/"} className="nav-item">
                <FontAwesomeIcon icon={faHome}/>
            </Link>
            <Link to={"/statscargo"} className="nav-item">
                <FontAwesomeIcon icon={faRectangleList} />
            </Link>
            <div onClick={() => {
                setOpenModal(true)
            }} className="nav-item add-button">
                <FontAwesomeIcon icon={faPlusCircle}/>
            </div>
            <Link to={"/"} className="nav-item">
                <FontAwesomeIcon icon={faBell}/>
            </Link>
            <div onClick={() => {
                setOpenProfile(true)}}
                 className="nav-item">
                <FontAwesomeIcon icon={faUser}/>
            </div>
            <ModalPlus onCloseModal={() => {
                setOpenModal(false)
            }}
                       openModal={openModal}/>
            <Profile openProfile={openProfile}
                     onCloseProfile={() => {
                         setOpenProfile(false)
                     }}/>
        </div>
    );
};