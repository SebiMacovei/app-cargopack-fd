import {Layout} from "../Layout.jsx";
import { Button, Label, TextInput } from "flowbite-react";
import { RiLockPasswordFill } from "react-icons/ri";
import {useState} from "react";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import {PhoneIcone} from "./resource/PhoneIcone.jsx";
import {doPost} from "../http.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
export function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [focused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    function submit(){
         doPost("/login",{"user":{ phone: phone, password: password }})
             .then(response => {
                 localStorage.setItem("token",response.headers.authorization);
                 navigate("/")
                 toast.success("Conectare reușită!")
             }).catch(error => toast.error(JSON.stringify(error.message)))
    }
    return(
        <Layout isCentered={true}>
                <div className="flex max-w-md w-full flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Numele de autentificare:"/>
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
                        <TextInput onChange={e=> setPassword(e.target.value)} id="password1" type="password" icon={RiLockPasswordFill}   placeholder="Parola"
                                   required/>
                    </div>
                    <Button onClick={()=> submit()} type="submit">Conectează-te</Button>
                </div>
        </Layout>
    )
}