import {Button, Table} from "flowbite-react";
import {Layout} from "../../Layout.jsx";
import {useEffect, useState} from "react";
import {doGet} from "../../http.js";
import {FaRegEdit} from "react-icons/fa";
import {ModalEdit} from "./Modal/ModalEdit.jsx";
import {MdDeleteForever} from "react-icons/md";
import {ModalDelete} from "./Modal/ModalDelete.jsx";
import {IoPersonAddSharp} from "react-icons/io5";
import {ModalAdd} from "./Modal/ModalAdd.jsx";

export function EmployeesTableList() {
    const [users, setUsers] = useState([])
    const [openModal, setOpenModal]=useState("")


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
            <div className="overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Angajat</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Locație</Table.HeadCell>
                        <Table.HeadCell>Pachete</Table.HeadCell>
                        <Table.HeadCell>Persoane</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <Table.Row>
                            <Table.Cell>
                                <Button gradientMonochrome="success" size="xs"
                                        onClick={() => setOpenModal("add")}><IoPersonAddSharp/></Button>
                                <ModalAdd openModal={openModal}
                                          onCloseModal={onCloseModal}
                                          refresh={refresh}/>
                            </Table.Cell>
                            <Table.Cell/>
                            <Table.Cell/>
                            <Table.Cell/>
                            <Table.Cell/>
                            <Table.Cell/>
                        </Table.Row>
                        {users.map(user => {
                            return(
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                                            key={user.id}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user.name}
                                    </Table.Cell>
                                    <Table.Cell>Activ</Table.Cell>
                                    <Table.Cell>Jesi</Table.Cell>
                                    <Table.Cell>200</Table.Cell>
                                    <Table.Cell>300</Table.Cell>
                                    <Table.Cell>
                                        <div
                                            className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                                            <Button gradientMonochrome="lime" size="xs"
                                                    onClick={() => setOpenModal("edit")}><FaRegEdit/></Button>
                                            <ModalEdit openModal={openModal}
                                                       onCloseModal={onCloseModal}
                                                       id={user.id}
                                                       refresh={refresh}
                                                       user={user}/>
                                            <Button gradientMonochrome="failure" size="xs"
                                                    onClick={() => setOpenModal("delete")}><MdDeleteForever/></Button>
                                            <ModalDelete openModal={openModal}
                                                         onCloseModal={onCloseModal}
                                                         id={user.id}
                                                         refresh={refresh}/>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        </Layout>
    )
}