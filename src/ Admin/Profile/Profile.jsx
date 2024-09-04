import {Drawer, Label, Sidebar} from "flowbite-react";
import {
    HiChartPie,
    HiUsers,
} from "react-icons/hi";
import {TbLogout2} from "react-icons/tb";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {doGet} from "../../http.js";
import { Avatar } from "flowbite-react";

export function Profile(props) {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    function logOut() {
        localStorage.removeItem("token");
        toast.success("Deconectare reușită!")
        props.onCloseProfile()
        navigate("/")
    }

    useEffect(() => {
        doGet("/current-user").then((res) => {
            setAvatar(res.data.avatar_image)
            setName(res.data.name)
            setPhone(res.data.phone)
        })
    }, []);

    return (
        <>
            <Drawer open={props.openProfile} onClose={props.onCloseProfile} className={"h-full"}>
                <Drawer.Header title="PROFIL" titleIcon={() => <></>}/>
                <Drawer.Items className="flex h-[calc(100%-40px)] flex-col justify-evenly py-2">
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="[&>div]:bg-transparent [&>div]:p-0"
                    >
                        <div className="flex h-full flex-col justify-evenly py-2">
                                <div className="text-center pb-4">
                                    <Avatar img={avatar} size="xl" className={"pt-3 pb-4"} rounded bordered />
                                    <div className={"text-xl font-bold pb-4 dark:text-white"}>{name}</div>
                                    <div className={"text-xl dark:text-white"}>{phone}</div>
                                </div>
                            <hr/>
                                <Sidebar.Items className={"flex h-full flex-col justify-between py-2"}>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item href="/" icon={HiChartPie}>
                                            Dashboard
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/users/list" icon={HiUsers}>
                                            Users list
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item className={"flex m-2"}
                                                      onClick={() => logOut()}
                                                      icon={TbLogout2}>Deconectare
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                        </div>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </>
    )
}