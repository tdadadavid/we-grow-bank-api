import reqAgent, {AxiosError} from "axios";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {config} from "../../config";
import {Injectable} from "@nestjs/common";

export interface RequestAuth {
    [key: string]: string;
}
export class HttpService {

    private auth: Map<string, unknown> = new Map<string, unknown>();
    constructor(private readonly url: string = config.api.exchange_rates_api) {}

    public async get(args: any[], url: string | URL | undefined): Promise<AxiosResponse> {
        const requestPath: string = url.toString()|| this.url;
        const requestConfig: any = {
            method: "GET",
            params: args,
            withCredentials: true,
            headers: {
                "apiKey": config.api.exchange_rates_api_key
            }
        }

        try {
            return await reqAgent.get(requestPath, requestConfig)
        }catch (e: any){
            console.log(e)
            return e.response;
        }
    }

    public async post(args: any[], url?: string | URL | undefined): Promise<AxiosResponse> {
        const requestPath: string  = url.toString() || this.url;
        const requestDBody = {...args};
        const requestHeaders: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            return await reqAgent.post(requestPath, requestDBody, requestHeaders);
        }catch (e: any){
            console.log(e)
            return e.response
        }
    }

    public getAuth(): Record<any, any> {
        return this.auth;
    }

    public setAuth(auth: RequestAuth[]): HttpService {
        auth.forEach(({ key, value}: RequestAuth) => {
            this.auth.set(key, value);
        })
        return this;
    }
}