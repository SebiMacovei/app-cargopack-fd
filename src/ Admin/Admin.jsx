import {Avatar, Button, Card} from "flowbite-react";
import {FaRegEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {useEffect, useState} from "react";
import {doPost, doGet} from "../http.js";
import {Layout} from "../Layout.jsx";
import {IoPersonAddSharp} from "react-icons/io5";
import {ModalEdit} from "./Employees/Modal/ModalEdit.jsx";
import {ModalDelete} from "./Employees/Modal/ModalDelete.jsx";
import {ModalAdd} from "./Employees/Modal/ModalAdd.jsx";
import {Link} from "react-router-dom";


export function Admin() {
    const [openModal, setOpenModal] = useState("");
    const [idModal, setIdModal] = useState(0);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        doGet("/users")
            .then(response => {
                setUsers(response.data)
            })
    }, []);

    function onCloseModal() {
        setOpenModal("");
    }

    function refresh() {
        doGet("/users")
            .then(response => {
                setUsers(response.data)
            })
    }

    return (
        <Layout>
            <div className={"flex flex-col items-center"}>
                <Card className="max-w-lg min-w-[350px] basis-[200px]">
                    <div className="mb-4 flex items-center justify-between">
                        <div className={"flex row-auto items-center gap-3"}>
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Lista
                                angajati</h5>
                            <Button gradientMonochrome="success" size="xs"
                                    onClick={() => setOpenModal("add")}><IoPersonAddSharp/></Button>
                            <ModalAdd openModal={openModal}
                                      onCloseModal={onCloseModal}
                                      refresh={refresh}/>
                        </div>
                        <Link to={"/emptablelist"}
                              className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            Vezi tot
                        </Link>
                    </div>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user) => {
                                return (
                                    <li className="py-3 sm:py-4"
                                        key={user.id}>
                                        <div className="flex items-center space-x-4">
                                            <Avatar img={user.avatar_image} size="md" className={"pt-3 pb-4"} rounded bordered />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.phone}</p>
                                            </div>
                                            <div
                                                className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                                                <Button gradientMonochrome="lime" size="xs"
                                                        onClick={() => {
                                                            setOpenModal("edit")
                                                            setIdModal(user.id)
                                                        }}><FaRegEdit/></Button>
                                                <ModalEdit openModal={openModal}
                                                           onCloseModal={onCloseModal}
                                                           id={user.id}
                                                           refresh={refresh}
                                                           user={user}
                                                           idModal={idModal}/>
                                                <Button gradientMonochrome="failure" size="xs"
                                                        onClick={() => {
                                                            setOpenModal("delete")
                                                            setIdModal(user.id)
                                                        }}><MdDeleteForever/></Button>
                                                <ModalDelete openModal={openModal}
                                                             onCloseModal={onCloseModal}
                                                             id={user.id}
                                                             refresh={refresh}
                                                             idModal={idModal}/>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </Card>
                <Card></Card>
            </div>
        </Layout>
    )
}
