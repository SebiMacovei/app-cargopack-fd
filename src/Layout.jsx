import {Button, Flowbite, Navbar} from "flowbite-react";
import {DarkThemeToggle} from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import BottomNavBar from "./BottomNavBar/BottomNavBar.jsx";

export function Layout(props) {
    const navigate = useNavigate();
    return (
        <Flowbite>
            <Navbar fluid rounded className={"bg-yellow-melon dark:bg-black-pro gap-2"}>
               <div className={"gap-3 flex flex-row items-center"}>
                   <Link to="/">
                       <div className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                           CarGoPack
                       </div>
                   </Link>
                   <DarkThemeToggle/>
               </div>
                {localStorage.getItem("token") ?
                    <>
                        <Navbar.Toggle className={"text-white"}/>
                        <Navbar.Collapse>
                            <div className={"md:flex  md:justify-around  md:items-center md:gap-6"}>
                                    <Navbar.Link href="/statscargo">Status Curse</Navbar.Link>
                            </div>
                        </Navbar.Collapse>
                  </>
                    :
                    <Link to={"/login"}>
                        <Button gradientDuoTone="greenToBlue">
                            Conectează-te
                        </Button>
                    </Link>
                }
            </Navbar>
            {
                props.isCentered ?
                    <div className={"flex justify-center md:items-center w-full max-h-[calc(100%-60px)] p-5"}>
                        {props.children}
                    </div>
                    :
                    <div className={"max-h-[calc(100%-60px)] p-5"}>
                        {props.children}
                    </div>
            }
            {localStorage.getItem("token") && <BottomNavBar/>}
        </Flowbite>
    )
}