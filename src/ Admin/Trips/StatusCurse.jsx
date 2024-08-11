import {Layout} from "../../Layout.jsx";
import {Button, Card, Datepicker} from "flowbite-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useState} from "react";
import {ModalAdd} from "./Modal/ModalAdd.jsx";

export function StatusCurse() {
    const [openModal, setOpenModal] = useState(false);

    function onClose() {
        setOpenModal(false);
    }

    return (
        <Layout>
            <Card>
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
            <Card>

            </Card>
        </Layout>
    )
}