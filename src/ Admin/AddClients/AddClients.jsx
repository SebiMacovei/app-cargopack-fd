import {Layout} from "../../Layout.jsx";
import {Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch} from "flowbite-react";
import React, {useState} from "react";
import {HiOutlineArrowLeft, HiOutlineArrowRight} from "react-icons/hi";
import {FaPersonWalkingLuggage} from "react-icons/fa6";
import {PiPackage} from "react-icons/pi";
import { MdOutlineLuggage } from "react-icons/md";
import {Stepper} from "../../CustomizeComponents/Stepper.jsx";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsFilePersonFill } from "react-icons/bs";
import { GiWeight } from "react-icons/gi";
import { TbPackages } from "react-icons/tb";
import { RiMoneyEuroCircleFill } from "react-icons/ri";


export function AddClients() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [infoPassenger, setInfoPassenger] = useState({
        name_passenger: "", surname_passenger: "", phone_passenger: "", address_passenger: ""
    });
    const [infoPackagePassenger, setInfoPackagePassenger] = useState({
        weight_load_p:"", number_load_p:"", paid_load_p:false, paid_load_value_p:""
    })
    const steps = [{
        step: "Informații PASAGER:",
        icon: <FaPersonWalkingLuggage />
    }, {
        step: "Informații BAGAJ-PASAGER:",
        icon: <MdOutlineLuggage/>
    }]
    console.log(infoPassenger)
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
                                           onChange={e=>setInfoPassenger((prev)=>({...prev, name_passenger: e.target.value}))}
                                           value={infoPassenger.name_passenger}
                                           required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Prenume:"/>
                                </div>
                                <TextInput icon={BsFilePersonFill} type="text" placeholder="Prenume"
                                           onChange={e=>setInfoPassenger((prev)=>({...prev, surname_passenger: e.target.value}))}
                                           value={infoPassenger.surname_passenger}
                                           required/>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Număr de telefon:"/>
                            </div>
                            <TextInput icon={FaPhoneSquareAlt} type="number" placeholder="+40... /+39..."
                                       onChange={e=>setInfoPassenger((prev)=>({...prev, phone_passenger: e.target.value}))}
                                       value={infoPassenger.phone_passenger}
                                       required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de preluare:"/>
                            </div>
                            <TextInput icon={FaMapLocationDot} placeholder="Bacău/Bologna"
                                       onChange={e=>setInfoPassenger((prev)=>({...prev, address_passenger: e.target.value}))}
                                       value={infoPassenger.address_passenger}
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
                                    <Label value="Greutate bagaj:"/>
                                </div>
                                <TextInput  icon={GiWeight} type="number" placeholder="00"
                                            onChange={e=>setInfoPackagePassenger((prev)=>({...prev, weight_load_p: e.target.value}))}
                                            value={infoPassenger.weight_load_p}
                                            required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Număr colete:"/>
                                </div>
                                <TextInput icon={TbPackages} type="number" placeholder="00"
                                           onChange={e=>setInfoPackagePassenger((prev)=>({...prev, number_load_p: e.target.value}))}
                                           value={infoPassenger.number_load_p}  required/>
                            </div>
                        </div>
                        <div className={"mb-2 flex gap-7 "}>
                            <div className={"flex-grow"}>
                                <div className={"mb-4 block"}>
                                    <Label value="Platit?"/>
                                </div>
                                <ToggleSwitch className={"flex items-center self-center"}
                                              onChange={e=>setInfoPackagePassenger((prev)=>({...prev, paid_load_p: e.target.checked}))}
                                              checked={infoPassenger.paid_load_p}
                                              label={infoPassenger.paid_load_p ? "DA" : "MAI TÂRZIU"}/>
                            </div>
                            {infoPassenger.paid_load_p ?
                                <div className={"flex flex-col justify-end"}>
                                    <div className="mb-2 block">
                                        <Label value="Sumă achitată:"/>
                                    </div>
                                    <TextInput icon={RiMoneyEuroCircleFill} type="number" placeholder="00"
                                               onChange={e=>setInfoPackagePassenger((prev)=>({...prev, paid_load_value_p: e.target.value}))}
                                               value={infoPassenger.paid_load_value_p}
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
                                       helperText="Poze la bagajelele pasagerilor"/>
                        </div>
                        <hr/>
                        <div className={"flex flex-row justify-between gap-7"}>
                            <Button onClick={() => setCurrentStepIndex(prevState => prevState - 1)} outline pill>
                                <HiOutlineArrowLeft className="h-6 w-6"/>
                            </Button>
                            <Button className={"mb-2 flex gap-7 "} outline gradientDuoTone="greenToBlue">
                                ADAUGĂ PASAGER
                            </Button>

                        </div>

                    </div>
                )
        }
    }

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