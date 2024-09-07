import { Login, Message } from './Client-Dto.tsx'

namespace Client {
    let token: string | undefined = undefined;

    export const login = (credentials:Login) => {
        const response = fetch(`http://${process.env.API_ADDRESS}:${process.env.API_PORT}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        return response;
    }

    export const serverMessage = (message:Message) => {
        const response = fetch(`http://${process.env.API_ADDRESS}:${process.env.API_PORT}/message`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                token
            })
        })

        return response;
    }

    export const setToken = (newToken:string) => {
        token = newToken;
    }
}

export {
    Client
}