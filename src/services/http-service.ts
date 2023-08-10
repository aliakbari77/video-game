import apiClient from "./api-client";

class HttpService{
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    getAll<T>(page: number){
        const controller = new AbortController()
        const result = apiClient.get<T>(this.endpoint + `?page=${page}`)

        return {result, cancel: () => controller.abort()}
    }
}

const create = (endpoint: string) => new HttpService(endpoint)

export default create