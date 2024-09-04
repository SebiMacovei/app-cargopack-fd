import {Avatar, Button, FileInput, Label, Modal, TextInput} from "flowbite-react";
import {doPatch} from "../../../http.js";
import {useState} from "react";
import {RiLockPasswordFill} from "react-icons/ri";
import {toast} from "react-toastify";

export function ModalEdit(props){
    const id = "edit"

    const [name, setName] = useState(props.user.name)
    const [phone, setPhone] = useState(props.user.phone)
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(props.user.avatar);
    const [focused, setIsFocused] = useState(false);
    function editUser() {
        const formData = new FormData();
        formData.append("user[name]", name);
        formData.append("user[phone]", phone);
        formData.append("user[password]", password);
        if(avatar){
            formData.append("user[avatar]", avatar);
        }
        doPatch("/users/" + props.id, formData).then((response) => {
            props.onCloseModal()
            toast.success("Utilizator actualizat!")
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
                        <Avatar img={props.user.avatar_image} size="xl" className={"pt-3 pb-4"} rounded bordered />
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
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Parola"/>
                        </div>
                        <TextInput onChange={e => setPassword(e.target.value)} id="password1" type="password"
                                   icon={RiLockPasswordFill} placeholder="Parola"
                                   required/>
                    </div>
                    <div id="fileUpload" className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="file" value="Incarcă imaginea"/>
                        </div>
                        <FileInput id="file"
                                   helperText="Adauga poza pentru a seta profilul angajatului"
                                   accept={"image/*"}
                                   onChange={e => setAvatar(e.target.files[0])}/>
                    </div>
                    <div className="w-full flex justify-center ">
                        <Button onClick={() => editUser()}>Salvează</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}