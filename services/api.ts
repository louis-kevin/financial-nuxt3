import { $fetch } from "ohmyfetch";

export default abstract class ApiService {
  baseURL: string = "http://localhost:3001";

  get<T>(url: string): Promise<T> {
    return this.call<T>(url, 'GET')
  }

  post<T>(url: string, data: any): Promise<T> {
    return this.call<T>(url, 'POST', data)
  }

  put<T>(url: string, data: any): Promise<T> {
    return this.call<T>(url, 'PUT', data)
  }

  delete<T>(url: string): Promise<T> {
    return this.call<T>(url, 'DELETE')
  }

  private async call<T>(url: string, method: string, data?: any): Promise<T> {
    try {
      return await $fetch(url, { baseURL: this.baseURL, method, body: data })
    } catch (e) {
      console.log(e)
      throw e;
    }
  }
}
