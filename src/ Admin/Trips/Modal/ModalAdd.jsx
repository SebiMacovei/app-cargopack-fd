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


export function ModalAdd(props) {
    const [rangeView, setRangeView] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [cars, setCars] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedCars, setSelectedCars] = useState([{id: 0, users: [{id: 0}]},]);
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

    function updateSelectedCar(index, click_id) {
        const newselectedCars = selectedCars.map((selectedCar, index_map) => {
            // Checking which one of the elements are we editing
            if (index_map === index) {
                return {id: click_id, users: [{id: 0}]}
            } else {
                return selectedCar
            }
        })
        setSelectedCars(newselectedCars)
    }

    function updateSelectedUser(indexCar, indexUser, click_id) {
        const newselectedCars = selectedCars.map((selectedCar, index_map) => {
            // Checking which one of the elements are we editing
            if (index_map === indexCar) {
                const specificUsers = selectedCar.users
                specificUsers[indexUser] = {id: click_id}
                return {id: selectedCar.id, users: specificUsers}
            } else {
                return selectedCar
            }
        })
        setSelectedCars(newselectedCars)
        setSelectedUsers([...selectedUsers, {id: click_id}])
    }

    // Delete carItem
    function deleteCar(index) {
        /**
         * Filter return the true values, so we need a container for the result. Those functions can use: value of the array
         * AND THE INDEX OF THE ITERATION.
         * @type {{selectedItem: string, id: number}[]}
         */
        const newselectedUser = selectedCars.filter((selectedItem, index_filter) => {
            return index_filter !== index;
        })
        const selectedCarUsers = selectedCars[index].users.map(selectedCar => {
            return selectedCar.id
        })
        const ids = selectedUsers.filter((selectUser) => {
            if (selectedCarUsers.includes(selectUser.id) === true)
                return false
            else
                return true
        })
        // Show the new list filtered in the UI(User Interface)
        setSelectedCars(newselectedUser)
        setSelectedUsers(ids)
    }

    function deleteUser(userId, indexCar) {
        /**
         * Filter return the true values, so we need a container for the result. Those functions can use: value of the array
         * AND THE INDEX OF THE ITERATION.
         * @type {{selectedItem: string, id: number}[]}
         */
        const newSelectedCars = selectedCars.map((selectedItem, index_map) => {
            if (index_map === indexCar) {
                const newSelectedUsers = selectedItem.users.filter((item, index_filter) => {
                    if (item.id === userId) {
                        return false
                    } else return true
                })
                return {id: selectedItem.id, users: newSelectedUsers}
            } else return selectedItem
        })

        const ids = selectedUsers.filter((selectUser) => {
            if (selectUser.id === userId)
                return false
            else
                return true
        })
        // Show the new list filtered in the UI(User Interface)
        setSelectedCars(newSelectedCars);
        setSelectedUsers(ids)
    }

    // Taking the initial container/array and a new selector-delete_button into array.
    function addUser(indexCar) {
        const newselectedCars = selectedCars.map((selectedCar, index_map) => {
            // Checking which one of the elements are we editing
            if (index_map === indexCar) {

                return {id: selectedCar.id, users: [...selectedCar.users, {id: 0}]}
            } else {
                return selectedCar
            }
        })
        setSelectedCars(newselectedCars)
    }

    // Taking the initial container/array and a new selector-delete_button into array.
    function addCar() {
        setSelectedCars([...selectedCars, {id: 0, users: [{id: 0}]}])
    }


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
                return (
                    <>
                        <div className={"flex justify-center items-center"}>
                            <Calendar className="shadow-lg dark:shadow-cyan-800"
                                      onChange={(value, event) => captureRange(value)}
                                      selectRange={setRangeView}/>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <div>
                                <div className="text-center mb-2 block gap">
                                    <Label value="Dată plecare tur:"/>
                                </div>
                                <TextInput type="text" value={startDate} rightIcon={FaArrowRight}
                                           placeholder="ZZ/LL/AAAA"
                                           readOnly/>
                            </div>
                            <div className="flex text-3xl justify-center text-center dark:text-white">
                                <MdKeyboardDoubleArrowDown/>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 block">
                                    <Label value="Dată sosire tur:"/>
                                </div>
                                <TextInput type="text" value={endDate} rightIcon={FaArrowLeft} placeholder="ZZ/LL/AAAA"
                                           readOnly/>
                            </div>
                        </div>
                    </>
                )
            case 1:
                return (
                    <>
                        <div className={"flex justify-center items-center"}>
                            <Calendar className="shadow-lg dark:shadow-cyan-800"
                                      onChange={(value, event) => captureRange(value)}
                                      selectRange={setRangeView}/>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <div>
                                <div className="text-center mb-2 block gap">
                                    <Label value="Dată plecare retur:"/>
                                </div>
                                <TextInput type="text" value={startDate} rightIcon={FaArrowRight}
                                           placeholder="ZZ/LL/AAAA"
                                           readOnly/>
                            </div>
                            <div className="flex text-3xl justify-center text-center dark:text-white">
                                <MdKeyboardDoubleArrowDown/>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 block">
                                    <Label value="Dată sosire retur:"/>
                                </div>
                                <TextInput type="text" value={endDate} rightIcon={FaArrowLeft} placeholder="ZZ/LL/AAAA"
                                           readOnly/>
                            </div>
                        </div>
                    </>
                )
            case 2:
                return (
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="countries" value="Selecteaza mașina:"/>
                        </div>
                        <div className={"flex flex-col gap-3"}>
                            {selectedCars.map((selectedCar, index) => {
                                return (
                                    <div className={"flex flex-row justify-between gap-2"}
                                        /**
                                        * We need index param for uniqueness of items in list, id provide in selection care aren't unique because if we delete one, it override the position in list.
*/
                                         key={"selection" + index}>
                                        <Select onChange={(e) => updateSelectedCar(index, Number(e.target.value))}
                                                value={selectedCar.id.toString()}
                                                theme={{"base": "flex w-full"}}>
                                            <option value={0}
                                                    disabled={true}>Alegeți o mașină
                                            </option>
                                            {cars.filter(car => {
                                                // List of id's for selected cars.
                                                const ids = selectedCars.map((item) => item.id)
                                                    /**
                                                     * For current selected car we need to keep its option in the list of options
                                                     * to prevent not deleting it from selected option.(
                                                     */
                                                    .filter(item => {
                                                        if (selectedCar.id === item)
                                                            return false
                                                        else
                                                            return true
                                                    })
                                                if (ids.includes(car.id) === true) {
                                                    return false
                                                } else return true
                                            }).map(car => {
                                                return <option
                                                    value={car.id}
                                                    key={index + "-" + car.id}>
                                                    {car.name} / {car.plate_number}
                                                </option>
                                            })}
                                        </Select>
                                        {index === 0 ?
                                            <Button gradientDuoTone="greenToBlue"
                                                    ize={"xs"}
                                                    className={"self-center"}
                                                    onClick={() => addCar()}><IoIosAdd/></Button>
                                            :
                                            <Button gradientMonochrome="failure"
                                                    ize={"xs"}
                                                    className={"self-center"}
                                                    onClick={() => deleteCar(index)}><RiSubtractFill/></Button>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            case 3:
                return (
                    <>
                        <Label>Mașini selectate:</Label>
                        {selectedCars.map((listCar, indexCar) => {
                            const selectedCarByid = cars.find(car => {
                                if (listCar.id === car.id)
                                    return true
                                else
                                    return false
                            })
                            return (
                                <Fragment key={"accordioncar" + indexCar}>
                                    <Accordion>
                                        <Accordion.Panel>
                                            <Accordion.Title>
                                                {selectedCarByid.name} / {selectedCarByid.plate_number}
                                            </Accordion.Title>
                                            <Accordion.Content>
                                                <div className={"flex flex-col gap-3"}>
                                                    {listCar.users.map((selectedUser, indexUser) => {
                                                        return (
                                                            <div className={"flex flex-row justify-between gap-4"}
                                                                /**
                                                                * We need index param for uniqueness of items in list,
                                                                id provide in selection care aren't unique because if we delete one, it override the position in list.
                                                                Also, in this case, we form a matrix of cars with a bunch of users, so we need more specificity.
                        */
                                                                 key={"selectioncar" + indexCar + "-" + indexUser}>
                                                                <Select
                                                                    onChange={(e) => updateSelectedUser(indexCar, indexUser, Number(e.target.value))}
                                                                    value={selectedUser.id.toString()}
                                                                    theme={{"base": "flex w-full"}}>
                                                                    <option value={0}
                                                                            disabled={true}>Alegeți un angajat.
                                                                    </option>
                                                                    {users.filter(user => {
                                                                        // List of id's for selected cars.
                                                                        const ids = selectedUsers.map((item) => item.id)
                                                                            /**
                                                                             * For current selected car we need to keep its option in the list of options
                                                                             * to prevent not deleting it from selected option.(
                                                                             */
                                                                            .filter(item => {
                                                                                if (selectedUser.id === item)
                                                                                    return false
                                                                                else
                                                                                    return true
                                                                            })
                                                                        if (ids.includes(user.id) === true) {
                                                                            return false
                                                                        } else return true
                                                                    }).map(user => {
                                                                        return <option
                                                                            value={user.id}
                                                                            key={indexCar + "-" + indexUser + "-" + user.id}>
                                                                            {user.name}
                                                                        </option>
                                                                    })}
                                                                </Select>
                                                                {indexUser === 0 ?
                                                                    <Button gradientDuoTone="greenToBlue"
                                                                            size={"xs"}
                                                                            className={"self-center"}
                                                                            onClick={() => addUser(indexCar)}><IoIosAdd/></Button>
                                                                    :
                                                                    <Button gradientMonochrome="failure"
                                                                            size={"xs"}
                                                                            className={"self-center"}
                                                                            onClick={() => deleteUser(selectedUser.id, indexCar)}><RiSubtractFill/></Button>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                    </Accordion>
                                </Fragment>
                            )
                        })}
                    </>
                )
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

    /** Takes the array formed by prop *selectRange*, it convert the data type into a custom data
     format
     * and sets the start-end dates.
     */
    function toJSONLocal(date) {
        const formatter = new Intl.DateTimeFormat('ro-RO',
            {day: '2-digit', month: '2-digit', year: 'numeric'});
        const formattedDate = formatter.format(date)
        return formattedDate
    }

    function captureRange(value) {
        setStartDate(toJSONLocal(value[0]))
        setEndDate(toJSONLocal(value[1]))
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
