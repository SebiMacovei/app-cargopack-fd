import {Button, Label, Modal, TextInput} from "flowbite-react";
import {doDestroy} from "../../../http.js";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ModalDelete(props){
    const id = "delete"
    function deleteUser(){
        doDestroy("/users/" + props.id).then(response => {
            props.onCloseModal()
            props.refresh()
        })
    }
    return(
        <Modal position={"center"} show={id === props.openModal && props.id === props.idModal} size="md" onClose={props.onCloseModal} popup>
            <Modal.Header/>
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Ești sigur că vrei să stergi angajatul?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => deleteUser()}>
                            {"Da, sunt sigur"}
                        </Button>
                        <Button color="gray" onClick={props.onCloseModal}>
                            Nu, anuleaza
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}