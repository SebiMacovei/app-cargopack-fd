import {Button, Label, Modal, TextInput} from "flowbite-react";
import {doPatch} from "../../../http.js";
import {useState} from "react";

export function ModalEdit(props){
    const id = "edit"

    const [name, setName] = useState(props.user.name)
    const [phone, setPhone] = useState(props.user.phone)
    function editUser() {
        doPatch("/users/" + props.id, {
            name: name,
            phone: phone
        }).then((response) => {
            props.onCloseModal()
            props.refresh()
        })
    }
    return(
        <Modal show={id === props.openModal && props.id === props.idModal} size="md" onClose={props.onCloseModal} popup>
            <Modal.Header/>
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Setează
                        datale angajatului</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Nume:"/>
                        </div>
                        <TextInput
                            id="name"
                            placeholder="Numele angajatului"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Număr de telefon:"/>
                        </div>
                        <TextInput
                            id="phone"
                            placeholder="Număr de telefon al angajatului"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full flex justify-center ">
                        <Button onClick={() => editUser()}>Salvează</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}