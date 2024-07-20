import {Layout} from "./Layout.jsx";
import {Button} from "flowbite-react";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate=useNavigate();
    return (
        <Layout>
            <Button onClick={()=> navigate("/admin")}>Admin</Button>
        </Layout>
    )
}

export default HomePage
