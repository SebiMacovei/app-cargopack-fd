export function ValidationChangeStep(isValidInput, data, setCurrentStepIndex, setValidInput, direction,setNotEverytimeRed,maxStep) {
    // Create a new object with a new reference(new memory cell) so React can understand that we are updating the object state.
    let currentState = {...isValidInput}
    let isFormValid = true
    console.log(currentState)
    Object.keys(data).forEach((key) => {
        if (key === "paid_value"){
            if(data.paid === false){
                currentState.paid_value = true
            }
        } else {
            if (data[key] === "") {
                currentState[key] = false
                isFormValid = false
            } else {
                currentState[key] = true
            }
        }
    })
    setNotEverytimeRed(true)
    if (isFormValid === true){
        if (direction === "-"){
            setCurrentStepIndex(prevState => {
                if (prevState === 0)
                    return prevState
                else
                    return prevState - 1
            })
            setNotEverytimeRed(true)
        }
        else
        {
            setCurrentStepIndex(prevState => {
                if (prevState >= maxStep)
                    return prevState
                else
                    return prevState + 1
            })
            setNotEverytimeRed(false)
        }
    }
    setValidInput(currentState)
    return isFormValid
}


