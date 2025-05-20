import Proxy from "./Proxy";
import DashboardProxy from "./DashboardProxy";
import {ApiUrl} from '../config';

class AuthProxy {
  constructor() {
    /*const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
    /*super(
      process.env.REACT_APP_API_URL,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );*/
  }
  socialRegister = async (data) => { //updated code
    try {
      const response = await DashboardProxy.postData({
        url: `${ApiUrl}register-social`,
        data,
      });
      DashboardProxy.setHeader(
        "Authorization",
        `Bearer ${response.token}`
      );
      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      throw error;
    }
  };
  login = async (data) => {
    try {
      const response = await DashboardProxy.postData({
        url: `${ApiUrl}login`,
        data,
      });
      //this.setHeader("Authorization", `Bearer ${response.token.access_token}`);
      DashboardProxy.setHeader(
        "Authorization",
        `Bearer ${response.token.access_token}`
      );
      localStorage.setItem("token", response.token.access_token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      const response = await DashboardProxy.postData({
        url: `${ApiUrl}register`,
        data,
      });
      this.setHeader("Authorization", `Bearer ${response.access_token}`);
      DashboardProxy.setHeader(
        "Authorization",
        `Bearer ${response.access_token}`
      );
      localStorage.setItem("token", response.access_token);
      return response;
    } catch (error) {
      throw error;
    }
  };
  // socialRegister = async (data) => { // old code 
  //   try {
  //     const response = await DashboardProxy.postData({
  //       url: `${ApiUrl}register-social`,
  //       data,
  //     });
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
}

export default new AuthProxy();
