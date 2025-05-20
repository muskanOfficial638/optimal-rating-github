import { AuthProxy, DashboardProxy } from "../../proxies";
import i18n from "i18next";
import types from "../../store/types/auth";
import moment from "moment";
import { ApiUrl } from "../../config";

export default {
  getAccount: () => async (dispatch) => {
    try {
      let country =
        typeof window !== "undefined" ? localStorage.getItem("country") : "";
      if (country) {
        localStorage.setItem("country", country);
        DashboardProxy.setHeader("country", country);
      }
      const response = await DashboardProxy.getData({ url: `${ApiUrl}init` });
      dispatch({
        type: types.AUTH_SET,
        key: "ip",
        data: response.result.set.ipService,
      });
      dispatch({
        type: types.AUTH_SET,
        key: "account",
        data: response.result.set.user,
      });
      moment.locale(
        response.result.set.ipService.language_code
          ? response.result.set.ipService.language_code
          : "en"
      );
      if (!country) {
        i18n.changeLanguage(
          response.result.set.ipService.country_code
            ? response.result.set.ipService.country_code.toLowerCase()
            : "en"
        );
        moment.locale(
          response.result.set.ipService.language_code
            ? response.result.set.ipService.language_code.toLowerCase()
            : "en"
        );
        localStorage.setItem(
          "country",
          !response.result.set.ipService.country_code
            ? "null"
            : response.result.set.ipService.country_code.toLowerCase()
        );
        DashboardProxy.setHeader(
          "country",
          !response.result.set.ipService.country_code
            ? "null"
            : response.result.set.ipService.country_code.toLowerCase()
        );
      }
      return response;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  },
  login: (data) => async (dispatch) => {
    dispatch({ type: types.AUTH_REQUEST, key: "login" });
    try {
      const user = await AuthProxy.login(data);
      const response = await DashboardProxy.getData({ url: `${ApiUrl}init` });
      dispatch({ type: types.AUTH_SUCCESS, key: "login" });
      dispatch({
        type: types.AUTH_SET,
        key: "account",
        data: response.result.set.user,
      });
      return user;
    } catch (error) {
      dispatch({ type: types.AUTH_ERROR, key: "login", error });
      throw error;
    }
  },
  register: (data) => async (dispatch) => {
    dispatch({ type: types.AUTH_REQUEST, key: "register" });
    try {
      const user = await AuthProxy.register(data);
      const response = await DashboardProxy.getData({ url: `${ApiUrl}init` });
      dispatch({ type: types.AUTH_SUCCESS, key: "register" });
      dispatch({
        type: types.AUTH_SET,
        key: "account",
        data: response.result.set.user,
      });
      return user;
    } catch (error) {
      dispatch({ type: types.AUTH_ERROR, key: `${ApiUrl}register`, error });
      throw error;
    }
  },
  forgotPassword: (data) => async (dispatch) => {
    dispatch({ type: types.AUTH_REQUEST, key: "forgotPassword" });
    try {
      const response = await DashboardProxy.postData({
        url: `${ApiUrl}reset-my-password`,
        data,
      });
      dispatch({ type: types.AUTH_SUCCESS, key: "forgotPassword" });
      return response;
    } catch (error) {
      dispatch({ type: types.AUTH_ERROR, key: "forgotPassword", error });
      throw error;
    }
  },
  resetPassword: (payload) => async (dispatch) => {
    dispatch({ type: types.AUTH_REQUEST, key: "resetPassword" });
    try {
      const response = await DashboardProxy.postData({
        url: `${ApiUrl}new-password/${payload.id}`,
        data: payload.data,
      });
      dispatch({ type: types.AUTH_SUCCESS, key: "resetPassword" });
      return response;
    } catch (error) {
      dispatch({ type: types.AUTH_ERROR, key: "resetPassword", error });
      throw error;
    }
  },
  logout: () => async (dispatch) => {
    localStorage.removeItem("session");
    localStorage.clear();
    //  AuthProxy.setHeader('Authorization', null);
    DashboardProxy.setHeader("Authorization", null);
    dispatch({ type: types.AUTH_SET, key: "account", data: null });
    return;
  },
  updateState: (payload) => async (dispatch) => {
    dispatch({ type: types.AUTH_SET, ...payload });
    return;
  },

  socialRegister: (data) => async (dispatch) => {
    dispatch({ type: types.AUTH_REQUEST, key: "register-social" });
    try {
      const user = await AuthProxy.socialRegister(data);
      const response = await DashboardProxy.getData({ url: `${ApiUrl}init` }); //new
      dispatch({ type: types.AUTH_SUCCESS, key: "register-social" });
      // dispatch({ type: types.AUTH_SET, key: "account", data: result.user }); // usable old
      dispatch({
        type: types.AUTH_SET,
        key: "account",
        data: response.result.set.user,
      });
      return user;
    } catch (error) {
      dispatch({
        type: types.AUTH_ERROR,
        key: `${ApiUrl}register-social`,
        error,
      });
      throw error;
    }
  },
};
