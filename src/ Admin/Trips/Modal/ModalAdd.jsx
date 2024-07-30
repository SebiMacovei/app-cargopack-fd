import {Button, Label, Modal, Select, TextInput, Timeline} from "flowbite-react";
import {useEffect, useState} from "react";
import Calendar from "react-calendar";
import {doGet, doPost} from "../../../http.js";
import {HiArrowNarrowRight, HiCalendar} from "react-icons/hi";
import {Stepper} from "../../../CustomizeComponents/Stepper.jsx";
import {FaCalendarPlus} from "react-icons/fa";
import {FaCar} from "react-icons/fa";
import {HiUserAdd} from "react-icons/hi";
import {FaArrowRight} from "react-icons/fa";
import {FaArrowLeft} from "react-icons/fa";
import {MdKeyboardDoubleArrowDown} from "react-icons/md";
import {TbCalendarDown, TbCalendarUp} from "react-icons/tb";
import {IoIosAdd} from "react-icons/io";
import {RiSubtractFill} from "react-icons/ri";


export function ModalAdd(props) {
    const [rangeView, setRangeView] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [cars, setCars] = useState([]);
    const [selectionCar, setSelectionCar] = useState([{selectedItem: "", id: 0},]);
    // console.log(selectionCar)
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

    function updateSelection(index, click_id) {
        const newselectionCar = selectionCar.map((selectedCar, index_map) => {
            // Checking which one of the elements are we editing
            if (index_map === index) {
                return {selectedItem: "", id: click_id}
            } else {
                return selectedCar
            }
        })
        setSelectionCar(newselectionCar)
    }

    // Delete carItem
    function deleteCar(index) {
        /**
         * Filter return the true values, so we need a container for the result. Those functions can use: value of the array
         * AND THE INDEX OF THE ITERATION.
         * @type {{selectedItem: string, id: number}[]}
         */
        const newselectionCar = selectionCar.filter((selectedItem, index_filter) => {
            return index_filter !== index;
        })
        // Show the new list filtered in the UI(User Interface)
        setSelectionCar(newselectionCar);
    }

    // Taking the initial container/array and a new selector-delete_button into array.
    function addCar() {
        setSelectionCar([...selectionCar, {selectedItem: "", id: 0}])
    }

    // Fist if: brings the database of cars when the module shows the car page
    useEffect(() => {
        if (currentPageIndex === 2)
            doGet("/cars")
                .then(response => {
                    setCars(response.data)
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
                            {selectionCar.map((selectedCar, index) => {
                                //console.log(index,selectedCar)
                                return (
                                    <div className={"flex flex-row justify-between gap-2"}
                                         key={"selection" + index}>
                                        <Select onChange={(e) => updateSelection(index, Number(e.target.value))}
                                                value={selectedCar.id.toString()}
                                                theme={{"base": "flex w-full"}}>
                                            <option value={0}
                                                    disabled={true}>Alegeți o mașină
                                            </option>
                                            {cars.filter(car => {
                                                // List of id's for selected cars.
                                                const ids = selectionCar.map((item) => item.id)
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

    /** Takes the array formed by prop *selectRange*, it convert the data type into a custom data format
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
                <div className={"flex flex-col gap-7 "}>
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