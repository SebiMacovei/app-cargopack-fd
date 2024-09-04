import {Layout} from "../../Layout.jsx";
import {Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch} from "flowbite-react";
import React, {useState} from "react";
import {FaPersonArrowUpFromLine} from "react-icons/fa6"
import {FaPersonArrowDownToLine} from "react-icons/fa6"
import {PiPackage} from "react-icons/pi";
import {Stepper} from "../../CustomizeComponents/Stepper.jsx";
import {HiOutlineArrowRight} from "react-icons/hi";
import {HiOutlineArrowLeft} from "react-icons/hi";
import {FaPhoneSquareAlt} from "react-icons/fa";
import {FaMapLocationDot} from "react-icons/fa6";
import {BsFilePersonFill} from "react-icons/bs";
import {GiWeight} from "react-icons/gi";
import {TbPackages} from "react-icons/tb";
import {RiMoneyEuroCircleFill} from "react-icons/ri";
import {ValidationChangeStep} from "../../CustomizeComponents/ValidationChangeStep.js";
import {doPost} from "../../http.js";
import {useNavigate} from "react-router-dom";

export function AddPackages() {
    const navigate=useNavigate()
    const [statusPayment, setStatusPayment] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [infoGiver, setInfoGiver] = useState({
        name_giver: "", surname_giver: "", phone_giver: "", address_giver: ""
    });
    const [infoReceiver, setInfoReceiver] = useState({
        name_receiver: "", surname_receiver: "", phone_receiver: "", address_receiver: ""
    });
    const [infoPackage, setInfoPackage] = useState({
        weight_load: "", number_load: "", paid_load: false, paid_load_value: 0, images: []
    })
    const [notEverytimeRed, setNotEverytimeRed] = useState(false)
    const steps = [{
        step: "Informații EXPEDITOR",
        icon: <FaPersonArrowUpFromLine/>
    }, {
        step: "Informații DESTINATAR",
        icon: <FaPersonArrowDownToLine/>
    }, {
        step: "Informații COLET",
        icon: <PiPackage/>
    }]
    const [isValidInput, setValidInput] = useState({
        name_giver: false,
        surname_giver: false,
        phone_giver: false,
        address_giver: false,
        name_receiver: false,
        surname_receiver: false,
        phone_receiver: false,
        address_receiver: false,
        weight_load: false,
        number_load: false,
        paid_load_value: false
    })

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function next() {
        switch (currentStepIndex) {
            case 0:
                ValidationChangeStep(isValidInput, infoGiver, setCurrentStepIndex, setValidInput, "+", setNotEverytimeRed, 2)
                break
            case 1:
                ValidationChangeStep(isValidInput, infoReceiver, setCurrentStepIndex, setValidInput, "+", setNotEverytimeRed, 2)
        }
    }

    function back() {
        switch (currentStepIndex) {
            case 1:
                ValidationChangeStep(isValidInput, infoGiver, setCurrentStepIndex, setValidInput, "-", setNotEverytimeRed, 2)
                break
            case 2:
                ValidationChangeStep(isValidInput, infoReceiver, setCurrentStepIndex, setValidInput, "-", setNotEverytimeRed, 2)
        }
    }
    function addPackage() {
        let isFormValid = ValidationChangeStep(isValidInput, infoPackage, setCurrentStepIndex, setValidInput, "+", setNotEverytimeRed, 2)
        const formData = new FormData();
        formData.append("package[weight_load]", infoGiver.name_giver + " " + infoGiver.surname_giver);
        formData.append("package[number_load]", infoGiver.phone_giver);
        formData.append("package[paid_load]", infoGiver.address_giver);
        formData.append("package[paid_load_value]", infoPackage.paid_load);
        formData.append("package[images]", infoPackage.images);


        if (isFormValid) {
            doPost("/clients", {
                name: infoGiver.name_giver + " " + infoGiver.surname_giver,
                phone: infoGiver.phone_giver,
                pick_up_address: infoGiver.address_giver,
                paid: infoPackage.paid_load,
                paid_value: infoPackage.paid_load_value,
                client_type_id: 1
            }).then((responseGiver) => {
                formData.append("package[giver_id]", responseGiver.data.id);
                doPost("/clients", {
                    name: infoReceiver.name_receiver + " " + infoReceiver.surname_receiver,
                    phone: infoReceiver.phone_receiver,
                    drop_off_address: infoReceiver.address_receiver,
                    paid: infoPackage.paid_load,
                    paid_value: infoPackage.paid_load_value,
                    client_type_id: 2
                }).then((responseReceiver) => {
                    formData.append("package[receiver_id]", responseReceiver.data.id);
                    doPost("/packages", formData).then(responsePackage=> navigate("/"))
                })
            })
        }
    }


    function switchSteps() {
        switch (currentStepIndex) {
            case 0:
                return (
                    <div className={"flex flex-col gap-6"}>
                        <hr/>
                        <Label className={"flex justify-center font-bold text-md"}>{steps[0].step}</Label>
                        <div className={"flex flex-row gap-7"}>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Nume de familie:"/>
                                </div>
                                <TextInput icon={BsFilePersonFill} placeholder="Nume"
                                           onChange={e => setInfoGiver((prev) => ({
                                               ...prev,
                                               name_giver: capitalize(e.target.value)
                                           }))}
                                           color={isValidInput.name_giver === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoGiver.name_giver}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Prenume:"/>
                                </div>
                                <TextInput icon={BsFilePersonFill} placeholder="Prenume"
                                           onChange={e => setInfoGiver((prev) => ({
                                               ...prev,
                                               surname_giver: capitalize(e.target.value)
                                           }))}
                                           color={isValidInput.surname_giver === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoGiver.surname_giver}
                                           required/>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Număr de telefon:"/>
                            </div>
                            <TextInput type="number" icon={FaPhoneSquareAlt} placeholder="+40... /+39..."
                                       onChange={e => setInfoGiver((prev) => ({...prev, phone_giver: e.target.value}))}
                                       color={isValidInput.phone_giver === false && notEverytimeRed === true ? "failure" : ""}
                                       value={infoGiver.phone_giver}
                                       required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de preluare:"/>
                            </div>
                            <TextInput icon={FaMapLocationDot} placeholder="Bacău/Bologna"
                                       onChange={e => setInfoGiver((prev) => ({
                                           ...prev,
                                           address_giver: capitalize(e.target.value)
                                       }))}
                                       color={isValidInput.address_giver === false && notEverytimeRed === true ? "failure" : ""}
                                       value={infoGiver.address_giver}
                                       required/>
                        </div>
                        <hr/>
                        <div className={"flex justify-center"}>
                            <Button onClick={() => next()} outline pill>
                                <HiOutlineArrowRight className="h-6 w-6"/>
                            </Button>
                        </div>
                    </div>)
            case 1:
                return (
                    <div className={"flex flex-col gap-6"}>
                        <hr/>
                        <Label className={"flex justify-center font-bold text-md"}>{steps[1].step}</Label>
                        <div className={"flex flex-row gap-7"}>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Nume de familie:"/>
                                </div>
                                <TextInput icon={BsFilePersonFill} placeholder="Nume"
                                           onChange={e => setInfoReceiver((prev) => ({
                                               ...prev,
                                               name_receiver: capitalize(e.target.value)
                                           }))}
                                           color={isValidInput.name_receiver === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoReceiver.name_receiver}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Prenume:"/>
                                </div>
                                <TextInput icon={BsFilePersonFill} placeholder="Prenume"
                                           onChange={e => setInfoReceiver((prev) => ({
                                               ...prev,
                                               surname_receiver: capitalize(e.target.value)
                                           }))}
                                           color={isValidInput.surname_receiver === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoReceiver.surname_receiver}
                                           required/>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Număr de telefon:"/>
                            </div>
                            <TextInput type="number" icon={FaPhoneSquareAlt} placeholder="+40... /+39..."
                                       onChange={e => setInfoReceiver((prev) => ({
                                           ...prev,
                                           phone_receiver: e.target.value
                                       }))}
                                       color={isValidInput.phone_receiver === false && notEverytimeRed === true ? "failure" : ""}
                                       value={infoReceiver.phone_receiver}
                                       required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de predare:"/>
                            </div>
                            <TextInput icon={FaMapLocationDot} placeholder="Bacău/Bologna"
                                       onChange={e => setInfoReceiver((prev) => ({
                                           ...prev,
                                           address_receiver: capitalize(e.target.value)
                                       }))}
                                       color={isValidInput.address_receiver === false && notEverytimeRed === true ? "failure" : ""}
                                       value={infoReceiver.address_receiver}
                                       required/>
                        </div>
                        <hr/>
                        <div className={"flex flex-row justify-evenly mt-2"}>
                            <Button onClick={() => back()} outline pill>
                                <HiOutlineArrowLeft className="h-6 w-6"/>
                            </Button>
                            <Button onClick={() => next()} outline pill>
                                <HiOutlineArrowRight className="h-6 w-6"/>
                            </Button>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className={"flex flex-col gap-6"}>
                        <hr/>
                        <Label className={"flex justify-center font-bold text-md"}>{steps[2].step}</Label>
                        <div className={"flex flex-row gap-7"}>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Greutate bagaj:"/>
                                </div>
                                <TextInput icon={GiWeight} type="number" placeholder="00"
                                           onChange={e => setInfoPackage((prev) => ({
                                               ...prev,
                                               weight_load: e.target.value
                                           }))}
                                           color={isValidInput.weight_load === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoPackage.weight_load}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Număr colete:"/>
                                </div>
                                <TextInput icon={TbPackages} type="number" placeholder="00"
                                           onChange={e => setInfoPackage((prev) => ({
                                               ...prev,
                                               number_load: e.target.value
                                           }))}
                                           color={isValidInput.weight_load === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoPackage.number_load}
                                           required/>
                            </div>
                        </div>
                        <div className={"mb-2 flex gap-7 "}>
                            <div className={"flex-grow"}>
                                <div className={"mb-4 block"}>
                                    <Label value="Platit?"/>
                                </div>
                                <ToggleSwitch className={"flex items-center self-center"}
                                              onChange={e => setInfoPackage((prev) => ({...prev, paid_load: e}))}
                                              checked={infoPackage.paid_load}
                                              label={infoPackage.paid_load ? "DA" : "MAI TÂRZIU"}/>
                            </div>
                            {infoPackage.paid_load ?
                                <div className={"flex flex-col justify-end"}>
                                    <div className="mb-2 block">
                                        <Label value="Sumă achitată:"/>
                                    </div>
                                    <TextInput icon={RiMoneyEuroCircleFill} type="number" placeholder="00"
                                               onChange={e => setInfoPackage((prev) => ({
                                                   ...prev,
                                                   paid_load_value: e.target.value
                                               }))}
                                               color={isValidInput.paid_load_value === false && notEverytimeRed === true ? "failure" : ""}
                                               value={infoPackage.paid_load_value}
                                               required/>
                                </div>
                                : ""}
                        </div>
                        <div id="fileUpload" className={"mb-2"}>
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Selectează poze colet"/>
                            </div>
                            <FileInput id="file"
                                       multiple
                                       accept={"image/*"}
                                       onChange={e => setInfoPackage((prev) => ({
                                           ...prev,
                                           images: e.target.files
                                       }))}
                                       helperText="Poze la colete"/>
                        </div>
                        <hr/>
                        <div className={"flex flex-row justify-between gap-7"}>
                            <Button onClick={() => back()} outline pill>
                                <HiOutlineArrowLeft className="h-6 w-6"/>
                            </Button>
                            <Button className={"mb-2 flex gap-7 "}
                                    onClick={() => addPackage()} outline gradientDuoTone="greenToBlue">
                                ADAUGĂ COLETE
                            </Button>

                        </div>

                    </div>
                )
        }
    }

    return (
        <Layout isCentered={true}>
            <div>
                <Card className={"flex flex-col gap-5 max-w-xl bg-mold dark:bg-slate-700"}>
                    <Stepper steps={steps}
                             currentPageIndex={currentStepIndex}></Stepper>
                    {switchSteps()}
                </Card>
            </div>
        </Layout>
    )
}