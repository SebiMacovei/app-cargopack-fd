import {Layout} from "../../Layout.jsx";
import {Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch} from "flowbite-react";
import React, {useState} from "react";
import {FaPersonArrowUpFromLine} from "react-icons/fa6"
import {FaPersonArrowDownToLine} from "react-icons/fa6"
import {PiPackage} from "react-icons/pi";
import {Stepper} from "../../CustomizeComponents/Stepper.jsx";
import {HiOutlineArrowRight} from "react-icons/hi";
import {HiOutlineArrowLeft} from "react-icons/hi";

export function AddPackages() {
    const [statusPayment, setStatusPayment] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
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
                                    <Label value="Nume:"/>
                                </div>
                                <TextInput placeholder="Nume de familie" required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Prenume:"/>
                                </div>
                                <TextInput placeholder="Prenume" required/>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Număr de telefon:"/>
                            </div>
                            <TextInput type="number" placeholder="+40... /+39..." required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de preluare:"/>
                            </div>
                            <TextInput placeholder="Bacău/Bologna" required/>
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
                                    <Label value="Nume:"/>
                                </div>
                                <TextInput placeholder="Nume de familie" required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Prenume:"/>
                                </div>
                                <TextInput placeholder="Prenume" required/>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Număr de telefon:"/>
                            </div>
                            <TextInput type="number" placeholder="+40... /+39..." required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label value="Adresa de predare:"/>
                            </div>
                            <TextInput placeholder="Bacău/Bologna" required/>
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
                                <TextInput type="number" placeholder="00" required/>
                            </div>
                            <div className={"flex-grow"}>
                                <div className="mb-2 block">
                                    <Label value="Număr colete:"/>
                                </div>
                                <TextInput type="number" placeholder="00" required/>
                            </div>
                        </div>
                        <div className={"mb-2 flex gap-7 "}>
                            <div className={"flex-grow"}>
                                <div className={"mb-4 block"}>
                                    <Label value="Platit?"/>
                                </div>
                                <ToggleSwitch className={"flex items-center self-center"} checked={statusPayment}
                                              label={statusPayment ? "DA" : "MAI TÂRZIU"} onChange={setStatusPayment}/>
                            </div>
                            {statusPayment ?
                                <div className={"flex flex-col justify-end"}>
                                    <div className="mb-2 block">
                                        <Label value="Sumă achitată:"/>
                                    </div>
                                    <TextInput type="number" placeholder="00" required/>
                                </div>
                                : ""}
                        </div>
                        <div id="fileUpload" className={"mb-2"}>
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Selectează poze persoana"/>
                            </div>
                            <FileInput id="file"
                                       multiple
                                       helperText="Poze la pachetele persoanelor"/>
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