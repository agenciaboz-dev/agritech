import { api } from "../api"

interface ApiOptions {
    data?: any
    callback: Function
    errorCallback?: Function
    finallyCallback?: Function
}

export const useApi = () => {
    const defaultError = (error: Error, errorCallback?: Function) => {
        errorCallback && errorCallback()
        console.log(error)

        alert("Erro desconhecido")
    }

    const defaultFinally = (finallyCallback?: Function) => {
        finallyCallback && finallyCallback()
    }

    const user = {
        login: (options: ApiOptions) => {
            api.post("/user/login", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },
        signup: (options: ApiOptions) => {
            api.post("/user/register", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },

        find: {
            username: (options: ApiOptions) => {
                api.post("/user/find/username", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
    }

    return { user, defaultError, defaultFinally }
}
