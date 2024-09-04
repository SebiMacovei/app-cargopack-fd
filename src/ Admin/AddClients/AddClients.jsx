import {Layout} from "../../Layout.jsx";
import {Button, Card, FileInput, Label, TextInput, ToggleSwitch} from "flowbite-react";
import React, {useState} from "react";
import {HiOutlineArrowLeft, HiOutlineArrowRight} from "react-icons/hi";
import {FaPersonWalkingLuggage} from "react-icons/fa6";
import {MdOutlineLuggage} from "react-icons/md";
import {Stepper} from "../../CustomizeComponents/Stepper.jsx";
import {FaPhoneSquareAlt} from "react-icons/fa";
import {FaMapLocationDot} from "react-icons/fa6";
import {BsFilePersonFill} from "react-icons/bs";
import {GiWeight} from "react-icons/gi";
import {TbPackages} from "react-icons/tb";
import {RiMoneyEuroCircleFill} from "react-icons/ri";
import {doPost} from "../../http.js";
import {ValidationChangeStep} from "../../CustomizeComponents/ValidationChangeStep.js";
import {useNavigate} from "react-router-dom";


export function AddClients() {
    const navigate = useNavigate()
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [infoPassenger, setInfoPassenger] = useState({
        name_passenger: "",
        surname_passenger: "",
        phone_passenger: "",
        address_passenger_pick_up: "",
        address_passenger_drop_off: ""
    });
    const [infoPackagePassenger, setInfoPackagePassenger] = useState({
        weight_load_p: "", number_load_p: "", paid: false, paid_value: 0, images: []
    })
    const [isValidInput, setValidInput] = useState({
        name_passenger: false,
        surname_passenger: false,
        phone_passenger: false,
        address_passenger_pick_up: false,
        address_passenger_drop_off: false,
        weight_load_p: false,
        number_load_p: false,
        paid_value: false,
        paid: false
    })
    const [notEverytimeRed, setNotEverytimeRed] = useState(false)
    const steps = [{
        step: "Informații PASAGER:",
        icon: <FaPersonWalkingLuggage/>
    }, {
        step: "Informații BAGAJ-PASAGER:",
        icon: <MdOutlineLuggage/>
    }]

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function next() {
        ValidationChangeStep(isValidInput, infoPassenger, setCurrentStepIndex, setValidInput, "+", setNotEverytimeRed, 1)
    }

    function back() {
        ValidationChangeStep(isValidInput, infoPassenger, setCurrentStepIndex, setValidInput, "-", setNotEverytimeRed, 1)
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
                                           onChange={e => setInfoPassenger((prev) => ({
                                               ...prev,
                                               name_passenger: capitalize(e.target.value)
                                           }))}
                                           color={isValidInput.name_passenger === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoPassenger.name_passenger}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Prenume:"/>
                                </div>
                                <TextInput icon={BsFilePersonFill} type="text" placeholder="Prenume"
                                           onChange={e => setInfoPassenger((prev) => ({
                                               ...prev,
                                               surname_passenger: capitalize(e.target.value)
                                           }))}
                                           color={isValidInput.surname_passenger === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoPassenger.surname_passenger}
                                           required/>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Număr de telefon:"/>
                            </div>
                            <TextInput icon={FaPhoneSquareAlt} type="number" placeholder="+40... /+39..."
                                       onChange={e => setInfoPassenger((prev) => ({
                                           ...prev,
                                           phone_passenger: e.target.value
                                       }))}
                                       color={isValidInput.phone_passenger === false && notEverytimeRed === true ? "failure" : ""}
                                       value={infoPassenger.phone_passenger}
                                       required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de preluare:"/>
                            </div>
                            <TextInput icon={FaMapLocationDot} placeholder="Bacău/Bologna"
                                       onChange={e => setInfoPassenger((prev) => ({
                                           ...prev,
                                           address_passenger_pick_up: capitalize(e.target.value)
                                       }))}
                                       color={isValidInput.address_passenger_pick_up === false && notEverytimeRed === true ? "failure" : ""}
                                       value={infoPassenger.address_passenger_pick_up}
                                       required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de predare:"/>
                            </div>
                            <TextInput icon={FaMapLocationDot} placeholder="Bacău/Bologna"
                                       onChange={e => setInfoPassenger((prev) => ({
                                           ...prev,
                                           address_passenger_drop_off: capitalize(e.target.value)
                                       }))}
                                       color={isValidInput.address_passenger_drop_off === false && notEverytimeRed === true ? "failure" : ""}
                                       value={infoPassenger.address_passenger_drop_off}
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
                                    <Label value="Greutate bagaj:"/>
                                </div>
                                <TextInput icon={GiWeight} type="number" placeholder="00"
                                           onChange={e => setInfoPackagePassenger((prev) => ({
                                               ...prev,
                                               weight_load_p: e.target.value
                                           }))}
                                           color={isValidInput.weight_load_p === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoPackagePassenger.weight_load_p}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Număr colete:"/>
                                </div>
                                <TextInput icon={TbPackages} type="number" placeholder="00"
                                           onChange={e => setInfoPackagePassenger((prev) => ({
                                               ...prev,
                                               number_load_p: e.target.value
                                           }))}
                                           color={isValidInput.number_load_p === false && notEverytimeRed === true ? "failure" : ""}
                                           value={infoPackagePassenger.number_load_p} required/>
                            </div>
                        </div>
                        <div className={"mb-2 flex gap-7 "}>
                            <div className={"flex-grow"}>
                                <div className={"mb-4 block"}>
                                    <Label value="Platit?"/>
                                </div>
                                <ToggleSwitch className={"flex items-center self-center"}
                                              onChange={e => setInfoPackagePassenger((prev) => ({
                                                  ...prev,
                                                  paid: e
                                              }))}
                                              checked={infoPackagePassenger.paid}
                                              label={infoPackagePassenger.paid ? "DA" : "MAI TÂRZIU"}/>
                            </div>
                            {infoPackagePassenger.paid ?
                                <div className={"flex flex-col justify-end"}>
                                    <div className="mb-2 block">
                                        <Label value="Sumă achitată:"/>
                                    </div>
                                    <TextInput icon={RiMoneyEuroCircleFill} type="number" placeholder="00"
                                               onChange={e => setInfoPackagePassenger((prev) => ({
                                                   ...prev,
                                                   paid_value: e.target.value
                                               }))}
                                               color={isValidInput.number_load_p === false && notEverytimeRed === true ? "failure" : ""}
                                               value={infoPackagePassenger.paid_value}
                                               required/>
                                </div>
                                : ""}
                        </div>
                        <div id="fileUpload" className={"mb-2"}>
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Selectează poze bagaje-pasageri"/>
                            </div>
                            <FileInput id="file"
                                       multiple
                                       accept={"image/*"}
                                       onChange={e => setInfoPackagePassenger((prev) => ({
                                           ...prev,
                                           images: e.target.files
                                       }))}
                                       helperText="Poze la bagajelele pasagerilor"/>
                        </div>
                        <hr/>
                        <div className={"flex flex-row justify-between gap-7"}>
                            <Button onClick={() => back()} outline pill>
                                <HiOutlineArrowLeft className="h-6 w-6"/>
                            </Button>
                            <Button className={"mb-2 flex gap-7"} outline gradientDuoTone="greenToBlue"
                                    onClick={e => addPassanger()}>
                                ADAUGĂ PASAGER
                            </Button>

                        </div>

                    </div>
                )
        }
    }

    function addPassanger() {
        let isFormValid = ValidationChangeStep(isValidInput, infoPackagePassenger, setCurrentStepIndex, setValidInput, "+", setNotEverytimeRed, 1)
        const formData = new FormData();
        formData.append("package[weight]", infoPackagePassenger.weight_load_p);
        formData.append("package[number_load]", infoPackagePassenger.number_load_p);
        formData.append("package[paid]", infoPackagePassenger.paid);
        formData.append("package[paid_value]", infoPackagePassenger.paid_value);
        for (let i = 0; i < infoPackagePassenger.images.length; i++) {
            formData.append("package[images][]", infoPackagePassenger.images[i]);
        }

        if (isFormValid) {
            doPost("/clients", {
                name: infoPassenger.name_passenger + " " + infoPassenger.surname_passenger,
                phone: infoPassenger.phone_passenger,
                pick_up_address: infoPassenger.address_passenger_pick_up,
                drop_off_address: infoPassenger.address_passenger_drop_off,
                paid: infoPackagePassenger.paid,
                paid_value: infoPackagePassenger.paid_value,
                client_type_id: 3
            }).then((response) => {
                formData.append("package[passenger_id]", response.data.id);
                doPost("/packages", formData).then(responsePackages => navigate("/"))
            })
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