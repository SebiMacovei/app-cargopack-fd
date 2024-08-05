import {Button, Label, Modal, Select, TextInput, Timeline} from "flowbite-react";
import {Fragment, useEffect, useState} from "react";
import Calendar from "react-calendar";
import {doGet, doPost} from "../../../http.js";
import {Stepper} from "../../../CustomizeComponents/Stepper.jsx";
import {FaCar} from "react-icons/fa";
import {HiUserAdd} from "react-icons/hi";
import {FaArrowRight} from "react-icons/fa";
import {FaArrowLeft} from "react-icons/fa";
import {MdKeyboardDoubleArrowDown} from "react-icons/md";
import {TbCalendarDown, TbCalendarUp} from "react-icons/tb";
import {IoIosAdd} from "react-icons/io";
import {RiSubtractFill} from "react-icons/ri";
import {Accordion} from "flowbite-react";
import {TurContent} from "./TurContent.jsx";
import {ReturnContent} from "./ReturnContent.jsx";
import {AddCarContent} from "./AddCarContent.jsx";
import {AddEmployeeContent} from "./AddEmployeeContent.jsx";


export function ModalAdd(props) {
    const [cars, setCars] = useState([]);
    const [selectedCars, setSelectedCars] = useState([{id: 0, users: [{id: 0}]},]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [modelContent, setModelContent] = useState({
        start_tur: "", end_tur: "", start_retur: "", end_retur: "", selected_cars: []
    });
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([{id: 0},]);

    const steps = [{
        step: "1. Adaugă dată tur",
        icon: <TbCalendarUp/>
    }, {
        step: "2. Adaugă dată retur",
        icon: <TbCalendarDown/>
    }, {
        step: "3. Adaugă mașini",
        icon: <FaCar/>
    }, {
        step: "3. Adaugă șoferi",
        icon: <HiUserAdd/>
    }]
    // Fist if: brings the database of cars when the module shows the car page
    useEffect(() => {
        if (currentPageIndex === 2)
            doGet("/cars")
                .then(response => {
                    setCars(response.data)
                })
        if (currentPageIndex === 3)
            doGet("/users")
                .then(response => {
                    setUsers(response.data)
                })
    }, [currentPageIndex]);

    // Every page of the module
    function switchSteps() {
        switch (currentPageIndex) {
            case 0:
                return (<TurContent setModelContent={setModelContent}
                                    modelContent={modelContent}/>)
            case 1:
                return (<ReturnContent setModelContent={setModelContent}
                                       modelContent={modelContent}/>)
            case 2:
                return (<AddCarContent selectedUsers={selectedUsers}
                                       setSelectedUsers={setSelectedUsers}
                                       selectedCars={selectedCars}
                                       setSelectedCars={setSelectedCars}
                                       cars={cars}/>)
            case 3:
                return (<AddEmployeeContent selectedUsers={selectedUsers}
                                            setSelectedUsers={setSelectedUsers}
                                            selectedCars={selectedCars}
                                            setSelectedCars={setSelectedCars}
                                            cars={cars}
                                            users={users}/>)
        }
    }

    // Makes a request to the server for adding the element of the stepper into database.
    function addTrip() {
        doPost("/trips", {
            start_date: startDate,
            end_date: endDate,
            destination_id: 1
        }).then(response => {
            setStartDate("")
            setEndDate("")
        })
    }

    return (
        <Modal show={props.openModal} onClose={() => props.onClose(false)}>
            <Modal.Header>
                {steps[currentPageIndex].step}
            </Modal.Header>
            <Modal.Body>
                <div className={"flex flex-col gap-5"}>
                    <Stepper steps={steps}
                             setCurrentPage={setCurrentPageIndex}/>
                    {switchSteps()}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => addTrip()}>Următorul</Button>
            </Modal.Footer>
        </Modal>
    );
}
