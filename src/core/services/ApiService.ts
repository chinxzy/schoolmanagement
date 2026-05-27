import type { App } from "vue";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import type { Router } from "vue-router";

import JwtService from "@/core/services/JwtService";
import { userInSession } from "@/core/helpers/utility";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share Vue instance
   */
  public static vueInstance: App;
  public static router: Router;

  /**
   * @description initialize Vue Axios
   */
  public static init(app: App<Element>, router: Router) {
    ApiService.vueInstance = app;
    ApiService.router = router;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_BASEURL;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";

    if (userInSession()) {
      ApiService.setAuthorizationHeader();
    }

    // Add Axios interceptors
    ApiService.addInterceptors();
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setAuthorizationHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] =
      `Bearer ${JwtService.getToken()}`;
  }

  /**
   * @description add Axios interceptors
   */
  private static addInterceptors(): void {
    ApiService.vueInstance.axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          JwtService.destroyToken();
          ApiService.router.push("/login");
        }
        return Promise.reject(error);
      },
    );
  }

  /**
   * @description send the GET HTTP request
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  public static get(
    resource: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}`, config);
  }

  public static post(
    resource: string,
    params: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params, config);
  }

  public static update(
    resource: string,
    slug: string,
    params: any,
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }

  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
