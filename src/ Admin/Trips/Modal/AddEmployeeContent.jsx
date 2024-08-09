import {Accordion, Button, Label, Select} from "flowbite-react";
import {Fragment} from "react";
import {IoIosAdd} from "react-icons/io";
import {RiSubtractFill} from "react-icons/ri";

export function AddEmployeeContent(props){
    function updateSelectedUser(indexCar, indexUser, click_id) {
        //
        const newselectedCars = JSON.parse(JSON.stringify(props.selectedCars)).map((selectedCar, index_map) => {
            // Checking which one of the elements are we editing
            if (index_map === indexCar) {
                const specificUsers = selectedCar.users
                specificUsers[indexUser] = {id: click_id}
                return {id: selectedCar.id, users: specificUsers}
            } else {
                return selectedCar
            }
        })
        /**
         * Verify the value of old user selected in the list of users from every car ,
         * then replace the old one with the new one and the old one pulled back into the selectedUsers.
          */

        const oldUser = props.selectedCars[indexCar].users[indexUser].id
        const newselectedUsers = props.selectedUsers.filter(selectedUser => {
            if(selectedUser.id === oldUser)
                return false
            else
                return true
            }
        )
        props.setSelectedCars(newselectedCars)
        props.setSelectedUsers([...newselectedUsers, {id: click_id}])
    }

    function deleteUser(userId, indexCar) {
        /**
         * Filter return the true values, so we need a container for the result. Those functions can use: value of the array
         * AND THE INDEX OF THE ITERATION.
         * @type {{selectedItem: string, id: number}[]}
         */
        const newSelectedCars = props.selectedCars.map((selectedItem, index_map) => {
            if (index_map === indexCar) {
                const newSelectedUsers = selectedItem.users.filter((item, index_filter) => {
                    if (item.id === userId) {
                        return false
                    } else return true
                })
                return {id: selectedItem.id, users: newSelectedUsers}
            } else return selectedItem
        })

        const ids = props.selectedUsers.filter((selectUser) => {
            if (selectUser.id === userId)
                return false
            else
                return true
        })
        // Show the new list filtered in the UI(User Interface)
        props.setSelectedCars(newSelectedCars);
        props.setSelectedUsers(ids)
    }

    // Taking the initial container/array and a new selector-delete_button into array.
    function addUser(indexCar) {
        const newselectedCars = props.selectedCars.map((selectedCar, index_map) => {
            // Checking which one of the elements are we editing
            if (index_map === indexCar) {

                return {id: selectedCar.id, users: [...selectedCar.users, {id: 0}]}
            } else {
                return selectedCar
            }
        })
        props.setSelectedCars(newselectedCars)
    }
    // console.log(props.selectedUsers)
    // console.log(props.selectedCars)
    return(<>
        <Label>Mașini selectate:</Label>
        {props.selectedCars.map((listCar, indexCar) => {
            const selectedCarByid = props.cars.find(car => {
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
                                                    theme={{"base": "flex w-full"}}
                                                color={props.emptyInput && selectedUser.id === 0?"failure":""}>
                                                    <option value={0}
                                                            disabled={true}>Alegeți un angajat.
                                                    </option>
                                                    {props.users.filter(user => {
                                                        // List of id's for selected cars.
                                                        const ids = props.selectedUsers.map((item) => item.id)
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
    </>)
}