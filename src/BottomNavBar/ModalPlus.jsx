import {Modal} from "flowbite-react";
import React from "react";
import {Link} from "react-router-dom";

export function ModalPlus(props) {
    return (
        <Modal show={props.openModal} size="4xl"
               theme={{
                   "content": {
                       "base": "relative w-full p-4 md:h-auto",
                       "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
                   }
               }} position={"center"} onClose={() => props.onCloseModal()}>
            <Modal.Header/>
            <Modal.Body>
                <ul className="flex flex-col w-full gap-6 md:grid-row-2 ">
                    <li>
                        <Link to={"/addclients"} onClick={()=>props.onCloseModal()}>
                            <input type="radio"
                                   name={"hosting-small"}
                                   id="hosting-small"
                                   className="hidden peer"
                                   value="hosting-small"
                                   required/>
                            <label htmlFor="hosting-small"
                                   className="flex justify-end p-31 bg-[url('PassangerBG.png')] bg-no-repeat bg-contain bg-[top_left_1rem] w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block px-4 text-center">
                                    <div className="w-full font-bold text-2xl">Adaugă <br/> Persoana</div>
                                </div>
                            </label>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/addpackages"} onClick={()=>props.onCloseModal()}>
                            <input type="radio"
                                   className="hidden peer"
                                   name={"hosting-small"}
                                   id="hosting-small-2"
                                   value="hosting-small-2"
                                   required/>
                            <label htmlFor="hosting-small-2"
                                   className="inline-flex bg-[url('PackageBG.png')] text-left bg-no-repeat bg-contain bg-right items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block text-2xl text-center">
                                    <div className="w-full font-bold text-2xl">Adaugă <br/> Pachet</div>
                                </div>
                            </label>
                        </Link>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
    )
}