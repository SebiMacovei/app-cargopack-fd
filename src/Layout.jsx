import {Button, Flowbite, Navbar, NavbarLink} from "flowbite-react";
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
            <Navbar fluid rounded className={"bg-amber-500 gap-2"}>
                <Navbar.Brand as={Link} href="/" className={"gap-3"}>
                        <div className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        CarGoPack
                        </div>
                    <DarkThemeToggle/>
                </Navbar.Brand>
                {localStorage.getItem("token") ?
                    <>
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <div className={"md:flex  md:justify-around  md:items-center md:gap-6"}>
                                    <Navbar.Link href="#">Profil</Navbar.Link>
                                    <Navbar.Link href="/statscargo">Status Curse</Navbar.Link>
                                    <Navbar.Link href="/addpackages">Adaugă Pachet</Navbar.Link>
                                    <Navbar.Link href="/addclients">Adaugă Persoana</Navbar.Link>
                                <Button className={"flex m-2"}
                                        onClick={() => logOut()} outline gradientDuoTone="greenToBlue">
                                    Deconectează-te
                                </Button>
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
                    <div className={"flex justify-center md:items-center h-[calc(100%-60px)] p-5"}>
                        {props.children}
                    </div>
                    :
                    <div className={"h-[calc(100%-60px)] p-3"}>
                        {props.children}
                    </div>
            }

        </Flowbite>
    )
}