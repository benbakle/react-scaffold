import authenticationService from "./authentication-service"

const asynchronousFunction = callback => {
    return authenticationService.status().then(response => {
        callback(response)
    })
}
const mainFunction = () => {
    const logStatus = result => {
        console.log(result)
    }

    asynchronousFunction(logStatus)
}
export default mainFunction