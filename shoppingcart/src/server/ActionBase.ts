import { AxiosRequestConfig, AxiosResponse } from "axios";
import HttpClient from "./HttpClient";

export default class ActionBase extends HttpClient {
  
  private static actionBaseInstance?: ActionBase;

  public constructor() {
    super("http://localhost:8080");
  }

  public static getInstance() {
    if (!this.actionBaseInstance) {
        this.actionBaseInstance = new ActionBase();
    }

    return this.actionBaseInstance;
}

  get<T = any, R = AxiosResponse<T>>(url: string, configProxy?: AxiosRequestConfig): Promise<R> {
    return this.instance.get<T, R>(`${this.instance.defaults.baseURL}${url}`, configProxy);
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, configProxy?: AxiosRequestConfig): Promise<R> {
      return this.instance.post<T, R>(`${this.instance.defaults.baseURL}${url}`, data, configProxy);
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, configProxy?: AxiosRequestConfig): Promise<R> {
      return this.instance.put<T, R>(`${this.instance.defaults.baseURL}${url}`, data, configProxy);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, configProxy?: AxiosRequestConfig): Promise<R> {
      return this.instance.delete<T, R>(`${this.instance.defaults.baseURL}${url}`, configProxy);
  }
}
