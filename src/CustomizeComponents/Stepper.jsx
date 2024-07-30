import {useState} from "react";

export function Stepper(props) {

    const [currentIndexPage, setCurrentIndexPage] = useState(0)
    const last = props.steps[props.steps.length - 1];

    function setProgress(element, index) {
        setCurrentIndexPage(index)
        props.setCurrentPage(index)
    }

    function getColor(index,prefix) {
        if(index < currentIndexPage) {
            return  prefix + "-green-600" + " " + "dark:" + prefix + "-green-600"
        }else if(index === currentIndexPage) {
            return prefix + "-cyan-600 after:border-gray-600" + " " + "dark:" + prefix + "-cyan-600 after:border-gray-600"
        }else if(index > currentIndexPage){
            return prefix + "-gray-600" + " " + "dark:" + prefix + "-gray-600"
        }
    }

    return (
        <>
            <ol className="flex flex-row items-center w-full mb-3">
                {
                    props.steps.map((element, index) => {
                        return (
                            <div key={element.step}
                                className={`flex flex-col ${element === last? "" : "w-full"}`}>
                                <li className={`text-white dark:text-white ${element === last ? "block" : `flex items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 ${getColor(index, "after:border")} after:inline-block`}`}>
                                    <div onClick={() => setProgress(element, index)}
                                         className={`flex flex-row items-center justify-center w-10 h-10 ${getColor(index, "bg")} rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}>{element.icon}
                                    </div>
                                </li>
                            </div>

                        )
                    })
                }
            </ol>
        </>

    )
}