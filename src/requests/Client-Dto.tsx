interface Login {
    email: string,
    password: string 
}

interface Message {
    Message: string,
    where: Location,
    important: boolean
}

enum Location {
    Nexus = 0,
    Realm = 1,
    Server = 2
}

export {
    Login,
    Message,
    Location
}