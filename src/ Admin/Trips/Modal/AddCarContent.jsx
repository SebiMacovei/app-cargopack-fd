import {useState} from "react";
import {Button, Label, Select} from "flowbite-react";
import {IoIosAdd} from "react-icons/io";
import {RiSubtractFill} from "react-icons/ri";

export function AddCarContent(props) {
    function updateSelectedCar(index, click_id) {
        const newselectedCars = props.selectedCars.map((selectedCar, index_map) => {
            // Checking which one of the elements are we editing
            if (index_map === index) {
                return {id: click_id, users: [{id: 0}]}
            } else {
                return selectedCar
            }
        })
        props.setSelectedCars(newselectedCars)
    }
    // Taking the initial container/array and a new selector-delete_button into array.
    function addCar() {
        props.setSelectedCars(prev => [...prev, {id: 0, users: [{id: 0}]}])
    }
    // Delete carItem
    function deleteCar(index) {
        /**
         * Filter return the true values, so we need a container for the result. Those functions can use: value of the array
         * AND THE INDEX OF THE ITERATION.
         * @type {{selectedItem: string, id: number}[]}
         */
        const newselectedUser = props.selectedCars.filter((selectedItem, index_filter) => {
            return index_filter !== index;
        })
        const selectedCarUsers = props.selectedCars[index].users.map(selectedCar => {
            return selectedCar.id
        })
        const ids = props.selectedUsers.filter((selectUser) => {
            if (selectedCarUsers.includes(selectUser.id) === true)
                return false
            else
                return true
        })
        // Show the new list filtered in the UI(User Interface)
        props.setSelectedCars(newselectedUser)
        props.setSelectedUsers(ids)
    }
    return (<div>
        <div className="mb-2 block">
            <Label htmlFor="countries" value="Selecteaza mașina:"/>
        </div>
        <div className={"flex flex-col gap-3"}>
            {props.selectedCars.map((selectedCar, index) => {
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
                            {props.cars.filter(car => {
                                // List of id's for selected cars.
                                const ids = props.selectedCars.map((item) => item.id)
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
    </div>)
}