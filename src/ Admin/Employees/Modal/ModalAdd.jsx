import {Button, Label, Modal, TextInput} from "flowbite-react";
import {useState} from "react";
import {doPost} from "../../../http.js";
import {RiLockPasswordFill} from "react-icons/ri";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import {PhoneIcone} from "../../../Authentication/resource/PhoneIcone.jsx";
import {toast} from "react-toastify";
export function ModalAdd(props){
    const id = "add"
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("");
    const [focused, setIsFocused] = useState(false);
    function addUser(){
        doPost("/signup", {"user":{ name: name, phone: phone, password: password }})
        .then((response) => {
            setName("")
            setPhone("")
            props.onCloseModal()
            toast.success("Inregistrare reușită!")
            props.refresh()
        }).catch(error => {
            toast.error("Utilizatorul există deja!")
        })
    }
    console.log(name)
    return(
        <Modal show={id === props.openModal} size="md" onClose={props.onCloseModal} popup>
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
                        <PhoneInput
                            onClick={()=>setIsFocused(true)}
                            onBlur={()=>setIsFocused(false)}
                            defaultCountry="RO"
                            placeholder="Introduceți numărul de telefon"
                            value={phone}
                            onChange={setPhone}
                            flagComponent={PhoneIcone}
                            className={`${focused ? "ring-2 ring-cyan-500" : ""} block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-900 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 text-sm pl-2 rounded-lg`}
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
                    <div className="w-full flex justify-center ">
                        <Button onClick={()=>  addUser()} disabled={phone&&!isValidPhoneNumber(phone)} type="submit">Salvează</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}