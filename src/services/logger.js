class LogDatShit {
    count = 0;

    log = console.log
    // log = (message) => {
    //     let premessage;
    //     if (this.count <= 2)
    //         premessage = "You just logged some shit";

    //     if (this.count > 2 && this.count <= 5)
    //         premessage = "Man, you are still loggin' some shit";

    //     if (this.count > 5)
    //         premessage = "Damn! You are loggin' a lotta shit!";

    //     console.log(`${premessage} : ${message} `)
    //     this.count++;
    // }
}
export default new LogDatShit();