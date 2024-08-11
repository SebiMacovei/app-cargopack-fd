import {Layout} from "../../Layout.jsx";
import {Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch} from "flowbite-react";
import React, {useState} from "react";
import {FaPersonArrowUpFromLine} from "react-icons/fa6"
import {FaPersonArrowDownToLine} from "react-icons/fa6"
import {PiPackage} from "react-icons/pi";
import {Stepper} from "../../CustomizeComponents/Stepper.jsx";
import {HiOutlineArrowRight} from "react-icons/hi";
import {HiOutlineArrowLeft} from "react-icons/hi";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsFilePersonFill } from "react-icons/bs";
import { GiWeight } from "react-icons/gi";
import { TbPackages } from "react-icons/tb";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
export function AddPackages() {
    const [statusPayment, setStatusPayment] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [infoGiver, setInfoGiver] = useState({
        name_giver: "", surname_giver: "", phone_giver: "", address_giver: ""
    });
    const [infoReceiver, setInfoReceiver] = useState({
        name_receiver: "", surname_receiver: "", phone_receiver: "", address_receiver: ""
    });
    const [infoPackage, setInfoPackage] = useState({
        weight_load:"", number_load:"", paid_load:false, paid_load_value:""
    })
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
                                           onChange={e=>setInfoGiver((prev)=>({...prev, name_giver: e.target.value}))}
                                           value={infoGiver.name_giver}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Prenume:"/>
                                </div>
                                <TextInput icon={BsFilePersonFill} placeholder="Prenume"
                                           onChange={e=>setInfoGiver((prev)=>({...prev, surname_giver: e.target.value}))}
                                           value={infoGiver.surname_giver}
                                           required/>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Număr de telefon:"/>
                            </div>
                            <TextInput type="number" icon={FaPhoneSquareAlt} placeholder="+40... /+39..."
                                       onChange={e=>setInfoGiver((prev)=>({...prev, phone_giver: e.target.value}))}
                                       value={infoGiver.phone_giver}
                                       required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de preluare:"/>
                            </div>
                            <TextInput icon={FaMapLocationDot} placeholder="Bacău/Bologna"
                                       onChange={e=>setInfoGiver((prev)=>({...prev, address_giver: e.target.value}))}
                                       value={infoGiver.address_giver}
                                       required/>
                        </div>
                        <hr/>
                        <div className={"flex justify-center"}>
                            <Button onClick={() => setCurrentStepIndex(prevState => prevState + 1)} outline pill>
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
                                           onChange={e=>setInfoReceiver((prev)=>({...prev, name_receiver: e.target.value}))}
                                           value={infoReceiver.name_receiver}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Prenume:"/>
                                </div>
                                <TextInput  icon={BsFilePersonFill} placeholder="Prenume"
                                            onChange={e=>setInfoReceiver((prev)=>({...prev, surname_receiver: e.target.value}))}
                                            value={infoReceiver.surname_receiver}
                                            required/>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Număr de telefon:"/>
                            </div>
                            <TextInput type="number" icon={FaPhoneSquareAlt} placeholder="+40... /+39..."
                                       onChange={e=>setInfoReceiver((prev)=>({...prev, phone_receiver: e.target.value}))}
                                       value={infoReceiver.phone_receiver}
                                       required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de predare:"/>
                            </div>
                            <TextInput icon={FaMapLocationDot} placeholder="Bacău/Bologna"
                                       onChange={e=>setInfoReceiver((prev)=>({...prev, address_receiver: e.target.value}))}
                                       value={infoReceiver.address_receiver}
                                       required/>
                        </div>
                        <hr/>
                        <div className={"flex flex-row justify-evenly mt-2"}>
                            <Button onClick={() => setCurrentStepIndex(prevState => prevState - 1)} outline pill>
                                <HiOutlineArrowLeft className="h-6 w-6"/>
                            </Button>
                            <Button onClick={() => setCurrentStepIndex(prevState => prevState + 1)} outline pill>
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
                                           onChange={e=>setInfoPackage((prev)=>({...prev, weight_load: e.target.value}))}
                                           value={infoPackage.weight_load}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Număr colete:"/>
                                </div>
                                <TextInput icon={TbPackages} type="number" placeholder="00"
                                           onChange={e=>setInfoPackage((prev)=>({...prev, number_load: e.target.value}))}
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
                                              onChange={e=>setInfoPackage((prev)=>({...prev, paid_load: e.target.checked}))}
                                              checked={infoPackage.paid_load}
                                              label={infoPackage.paid_load ? "DA" : "MAI TÂRZIU"}/>
                            </div>
                            {infoPackage.paid_load ?
                                <div className={"flex flex-col justify-end"}>
                                    <div className="mb-2 block">
                                        <Label value="Sumă achitată:"/>
                                    </div>
                                    <TextInput icon={RiMoneyEuroCircleFill} type="number" placeholder="00"
                                               onChange={e=>setInfoPackage((prev)=>({...prev, paid_load_value: e.target.value}))}
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
                                       helperText="Poze la colete"/>
                        </div>
                        <hr/>
                        <div className={"flex flex-row justify-between gap-7"}>
                            <Button onClick={() => setCurrentStepIndex(prevState => prevState - 1)} outline pill>
                                <HiOutlineArrowLeft className="h-6 w-6"/>
                            </Button>
                            <Button className={"mb-2 flex gap-7 "} outline gradientDuoTone="greenToBlue">
                                ADAUGĂ COLETE
                            </Button>

                        </div>

                    </div>
                )
        }
    }
console.log(infoGiver, infoReceiver, infoPackage)
    return (
        <Layout isCentered={true}>
            <div>
                <Card className={"flex flex-col gap-5 max-w-xl"}>
                    <Stepper steps={steps}
                             currentPageIndex={currentStepIndex}></Stepper>
                    {switchSteps()}
                </Card>
            </div>
        </Layout>
    )
}