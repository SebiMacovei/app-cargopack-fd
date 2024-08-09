import {useState} from "react";
import Calendar from "react-calendar";
import {Label, TextInput} from "flowbite-react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {MdKeyboardDoubleArrowDown} from "react-icons/md";

export function TurContent(props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [rangeView, setRangeView] = useState(false);

    /** Takes the array formed by prop *selectRange*, it convert the data type into a custom data
     format
     * and sets the start-end dates.
     */
    function toJSONLocal(date) {
        const formatter = new Intl.DateTimeFormat('ro-RO',
            {day: '2-digit', month: '2-digit', year: 'numeric'});
        const formattedDate = formatter.format(date)
        return formattedDate
    }

    function captureRange(value) {
        setStartDate(value[0])
        setEndDate(value[1])
        // prev is included as a functionality for setters. Can get the previous information from the hook.
        props.setModelContent(prev => {
            return {...prev, start_tur: value[0], end_tur: value[1]}
        });
        props.setEmptyInput(false)
    }

    return (
        <>
            <div className={"flex justify-center items-center"}>
                <Calendar className="shadow-lg dark:shadow-cyan-800"
                          onChange={(value, event) => captureRange(value)}
                          selectRange={setRangeView}
                          value={props.modelContent.start_tur ?
                              [props.modelContent.start_tur, props.modelContent.end_tur] : ""}/>
            </div>
            <div className={"flex flex-col"}>
                <div>
                    <div className="text-center mb-2 block gap">
                        <Label value="Dată plecare tur:"/>
                    </div>
                        <TextInput type="text"
                                   value={props.modelContent.start_tur === "" ?
                                       props.modelContent.start_tur
                                       :
                                       toJSONLocal(props.modelContent.start_tur)}
                                   rightIcon={FaArrowRight}
                                   placeholder="ZZ/LL/AAAA"
                                   color={props.emptyInput ? "failure" : ""}
                                   helperText={props.emptyInput ? <>
                                       Câmp necompletat!
                                   </> : ""}
                                   readOnly/>
                </div>
                <div className="flex text-3xl justify-center text-center dark:text-white">
                    <MdKeyboardDoubleArrowDown/>
                </div>
                <div className={"flex flex-col"}>
                    <div className="mb-2 block">
                        <Label value="Dată sosire tur:"/>
                    </div>
                    <TextInput type="text"
                               value={props.modelContent.end_tur === "" ?
                                   props.modelContent.end_tur
                                   :
                                   toJSONLocal(props.modelContent.end_tur)}
                               rightIcon={FaArrowLeft}
                               placeholder="ZZ/LL/AAAA"
                               color={props.emptyInput ? "failure" : ""}
                               helperText={props.emptyInput ? <>
                                  Câmp necompletat!
                               </> : ""}
                               readOnly/>
                </div>
            </div>
        </>
    )
}