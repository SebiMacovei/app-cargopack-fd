import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Calendar from "react-calendar";
import {doPost} from "../../../http.js";

export function ModalAdd(props) {
    const [rangeView, setRangeView] = useState(false);
    function addTrip(){
        doPost("")
    }
    return (
            <Modal show={props.openModal} onClose={() => props.onClose(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className={"flex justify-center items-center gap-4"}>
                        <Calendar className="shadow-lg dark:shadow-cyan-800"
                                  onChange={(value, event) => console.log(value)}
                                  selectRange={setRangeView}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => addTrip()}>I accept</Button>
                </Modal.Footer>
            </Modal>
    );
}