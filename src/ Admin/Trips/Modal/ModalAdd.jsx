import {Button, Modal} from "flowbite-react";
import {useEffect, useState} from "react";
import {doGet, doPost} from "../../../http.js";
import {Stepper} from "../../../CustomizeComponents/Stepper.jsx";
import {FaCar} from "react-icons/fa";
import {HiUserAdd} from "react-icons/hi";
import {TbCalendarDown, TbCalendarUp} from "react-icons/tb";
import {TurContent} from "./TurContent.jsx";
import {ReturnContent} from "./ReturnContent.jsx";
import {AddCarContent} from "./AddCarContent.jsx";
import {AddEmployeeContent} from "./AddEmployeeContent.jsx";
import {useNavigate} from "react-router-dom";

export function ModalAdd(props) {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [selectedCars, setSelectedCars] = useState([{id: 0, users: [{id: 0}]},]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [selectedData, setSelectedData] = useState({
        start_tur: "", end_tur: "", start_retur: "", end_retur: ""
    });
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([{id: 0},]);
    const [emptyInput, setEmptyInput] = useState(false)

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
                return (<TurContent setModelContent={setSelectedData}
                                    modelContent={selectedData}
                                    emptyInput={emptyInput}
                                    setEmptyInput={setEmptyInput}/>)
            case 1:
                return (<ReturnContent setModelContent={setSelectedData}
                                       modelContent={selectedData}
                                       emptyInput={emptyInput}
                                       setEmptyInput={setEmptyInput}/>)
            case 2:
                return (<AddCarContent selectedUsers={selectedUsers}
                                       setSelectedUsers={setSelectedUsers}
                                       selectedCars={selectedCars}
                                       setSelectedCars={setSelectedCars}
                                       cars={cars}
                                       emptyInput={emptyInput}
                                       setEmptyInput={setEmptyInput}/>)
            case 3:
                return (<AddEmployeeContent selectedUsers={selectedUsers}
                                            setSelectedUsers={setSelectedUsers}
                                            selectedCars={selectedCars}
                                            setSelectedCars={setSelectedCars}
                                            cars={cars}
                                            users={users}
                                            emptyInput={emptyInput}
                                            setEmptyInput={setEmptyInput}/>)
        }
    }

    function validateData(direction) {
        switch (direction === "+" ? currentPageIndex : currentPageIndex - 1) {
            case 0:
                if (selectedData.start_tur === "" && selectedData.end_tur === "") {
                    setEmptyInput(true)
                } else {
                    setEmptyInput(false)
                    if (direction === "+")
                        setCurrentPageIndex(currentPageIndex + 1)
                    else if (direction === "-")
                        setCurrentPageIndex(currentPageIndex - 1)
                }
                break
            case 1:
                if (selectedData.start_retur === "" && selectedData.end_retur === "") {
                    setEmptyInput(true)
                } else {
                    setEmptyInput(false)
                    if (direction === "+")
                        setCurrentPageIndex(currentPageIndex + 1)
                    else if (direction === "-")
                        setCurrentPageIndex(currentPageIndex - 1)
                }
                break
            case 2:
                if (selectedCars.some(selectedCar=> {return selectedCar.id === 0}))
                {
                    setEmptyInput(true)
                }
                else {
                    setEmptyInput(false)
                    if (direction === "+")
                        setCurrentPageIndex(currentPageIndex + 1)
                    else if (direction === "-")
                        setCurrentPageIndex(currentPageIndex - 1)
                }
                break
            case 3:
                if (selectedCars.some(selectedCar=> {return selectedCar.users.some(selectedUser => {
                    return selectedUser.id === 0})}))
                {
                    setEmptyInput(true)
                }
                else {
                    setEmptyInput(false)
                    if (direction === "-")
                        setCurrentPageIndex(currentPageIndex - 1)
                    else if(direction === "+")
                        return true
                }
                break
        }
    }

    // Makes a request to the server for adding the element of the stepper into database.
    function nextStepper() {
        validateData("+")
    }

    function previousStepper() {
        if (currentPageIndex < 0)
            setCurrentPageIndex(0)
        else
            validateData("-")
    }

    function addTrip() {
        if(validateData("+") === true){
            const allData = {
                tur_data: {
                    start_tur_date: selectedData.start_tur,
                    end_tur_date: selectedData.end_tur
                },
                retur_data: {
                    start_retur_date: selectedData.start_retur,
                    end_retur_date: selectedData.end_retur
                },
                selectedCars_data: selectedCars.map(selectedCar => {
                    return {car_id: selectedCar.id, users: selectedCar.users}
                })
            }
            doPost("/trips", allData).then(response => {
                window.location.reload()
            })
        }
    }


    return (
        <Modal show={props.openModal} onClose={() => props.onClose(false)}>
            <Modal.Header>
                {steps[currentPageIndex].step}
            </Modal.Header>
            <Modal.Body>
                <div className={"flex flex-col gap-5"}>
                    <Stepper steps={steps}
                             setCurrentPage={setCurrentPageIndex}
                             currentPageIndex={currentPageIndex}/>
                    {switchSteps()}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={"flex w-full justify-between"}>
                    {currentPageIndex === 0 ?
                        <div className={"flex justify-end"}></div>
                        :
                        <Button outline gradientDuoTone="pinkToOrange"
                                onClick={() => previousStepper()}>
                            Inapoi
                        </Button>}
                    {currentPageIndex === 3 ?
                        <Button outline gradientDuoTone="greenToBlue"
                                onClick={() => addTrip()}>
                            Adaugă cursă
                        </Button>
                        :
                        <Button outline gradientDuoTone="cyanToBlue"
                                onClick={() => nextStepper()}>
                            Urmatorul
                        </Button>
                    }
                </div>
            </Modal.Footer>
        </Modal>
    );
}
