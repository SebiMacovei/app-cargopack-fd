import {Button, Flowbite, Navbar} from "flowbite-react";
import {DarkThemeToggle} from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";

export function Layout(props) {
    const navigate = useNavigate();
    if (localStorage.getItem("token")) {
        const decoded = jwtDecode(localStorage.getItem("token"));
        if (decoded.exp <= Math.floor(new Date().getTime() / 1000)) {
            localStorage.removeItem("token")
        }
    }

    function logOut() {
        localStorage.removeItem("token");
        toast.success("Deconectare reușită!")
        navigate("/")
    }

    return (
        <Flowbite>
            <Navbar className={"bg-amber-500"}>
                <Navbar.Brand className={"gap-3"}>
                    <span
                        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">CarGoPack
                    </span>
                    <DarkThemeToggle/>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    {localStorage.getItem("token") ?
                        <Button onClick={() => logOut()} outline gradientDuoTone="greenToBlue">
                            Deconectează-te
                        </Button>
                        :
                        <Link to={"/login"}>
                            <Button gradientDuoTone="greenToBlue">
                                Conectează-te
                            </Button>
                        </Link>}
                    <Navbar.Toggle/>
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="/" active>
                        Acasă
                    </Navbar.Link>
                    <Navbar.Link href="#">Profil</Navbar.Link>
                    <Navbar.Link href="/statscargo">Status Curse</Navbar.Link>
                    <Navbar.Link href="#">Adaugă Pachet</Navbar.Link>
                    <Navbar.Link href="#">Adaugă Persoana</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
            {props.isCentered ?
                <div className={"flex justify-center md:items-center h-[calc(100%-60px)] p-8"}>
                    {props.children}
                </div>
                :
                <div className={"h-[calc(100%-60px)] p-8"}>
                    {props.children}
                </div>}

        </Flowbite>
    )
}