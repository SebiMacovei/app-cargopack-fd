import {Layout} from "../../Layout.jsx";
import {Badge, Button, Card} from "flowbite-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
import {ModalAdd} from "./Modal/ModalAdd.jsx";
import {doGet} from "../../http.js";
import {Stepper} from "../../CustomizeComponents/Stepper.jsx";
import { TiArrowDownThick } from "react-icons/ti";

export function StatusCurse() {
    const [openModal, setOpenModal] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [startTurDate, setStartTurDate] = useState("");
    const [startReturDate, setStartReturDate] = useState("");
    const [endTurDate, setEndTurDate] = useState("");
    const [endReturDate, setEndReturDate] = useState("");
    const [destinationTur, setDestinationTur] = useState("");
    const [destinationRetur, setDestinationRetur] = useState("");
    const [steps, setSteps] = useState([]);

    function onClose() {
        setOpenModal(false);
    }
    function roDateFormat(date) {
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`
    }
    useEffect(() => {
        doGet("/current-trips").then(response => {
            if(response.data.currentTurs.length > 0 && response.data.currentReturs.length > 0){
                setStartTurDate(roDateFormat(response.data.currentTurs[0].start_date))
                setEndTurDate(roDateFormat(response.data.currentTurs[0].end_date))
                setStartReturDate(roDateFormat(response.data.currentReturs[0].start_date))
                setEndReturDate(roDateFormat(response.data.currentReturs[0].end_date))
                setDestinationTur(response.data.currentTurs[0].destination.name)
                setDestinationRetur(response.data.currentReturs[0].destination.name)
                setSteps([{
                    step: (response.data.currentTurs[0].start_date).slice(-2)
                }, {
                    step: response.data.currentTurs[0].end_date.slice(-2)

                }, {
                    step: response.data.currentReturs[0].start_date.slice(-2)
                }, {
                    step: response.data.currentReturs[0].end_date.slice(-2)
                }])
            }
        })
    }, []);
    return (
        <Layout>
            {endReturDate &&
                <Card className={"flex justify-evenly bg-darker-mold"} theme={{
                    "root": {
                        "children": "flex flex-col h-full w-full justify-evenly gap-4 p-4"
                    }
                }}>
                        <div className={"flex rounded-3xl h-fit justify-center font-semibold bg-green-100 text-green-800 gap-4"}>CURSĂ
                            CURENTĂ
                        </div>
                    <Stepper steps={steps}
                             setCurrentPage={setCurrentPageIndex}
                             currentPageIndex={currentPageIndex}/>
                    <div className={"flex flex-row justify-evenly text-center gap-2"}>
                        <Card className={"flex text-xl dark:bg-white"}>
                            <div className={"bg-cyan-100 font-semibold rounded border p-2"}>Tur</div>
                            <div className={"bg-cyan-100 rounded border font-semibold flex flex-col items-center p-1"}>{destinationRetur}<br/>{startTurDate}
                                <TiArrowDownThick/> {destinationTur}<br/>{endTurDate}</div>
                        </Card>
                        <Card className={"flex text-xl dark:bg-white"}>
                            <div className={"bg-cyan-100 font-semibold rounded border p-2"}>Retur</div>
                            <div
                                className={"bg-cyan-100 rounded border font-semibold flex flex-col items-center p-1"}>{destinationTur}<br/>{startReturDate}
                                <TiArrowDownThick/>{destinationRetur}<br/>{endReturDate}</div>
                        </Card>
                    </div>
                </Card>
            }
            <Card className={"bg-mold dark:bg-slate-700"}>
                <div className={"flex justify-center text-black dark:text-amber-50 font-bold"}>
                    <Button gradientDuoTone="purpleToBlue"
                            onClick={() => setOpenModal(true)}>Adaugă cursă</Button>
                    <ModalAdd openModal={openModal}
                              onClose={onClose}></ModalAdd>
                </div>
                <div className={"flex justify-center items-center gap-4"}>
                    <Calendar className="shadow-lg dark:shadow-cyan-800"
                              onChange={(value, event) => console.log(value)}/>
                </div>
            </Card>
            <Card className={"bg-darker-mold"}>

            </Card>
        </Layout>
    )
}