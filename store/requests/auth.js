import store from "../../store";
import actions from "../../store/actions/auth";
import { notification } from "antd";
import axios from "axios";

export const getAccount = async (lanData) => {
  try {
    const response = await store.dispatch(actions.getAccount());
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload) => {
  try {
    const response = await store.dispatch(actions.login(payload));
    return response;
  } catch (error) {
    throw error;
  }
};

// export const register = async (payload) => {
//   try {
//     const response = await store.dispatch(actions.register(payload));
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const register = async (payload) => {
  try {
    const response = await axios.post(
      "https://staging.server.optimalrating.com/api/register",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const socialRegister = async (payload) => {
  try {
    const response = await store.dispatch(actions.socialRegister(payload));
    return response;
  } catch (error) {
    throw error;
  }
}

export const forgotPassword = async (payload) => {
  try {
    const response = await store.dispatch(actions.forgotPassword(payload));
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await store.dispatch(actions.resetPassword(payload));
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateState = async (payload) => {
  try {
    const response = await store.dispatch(actions.updateState(payload));
    return response;
  } catch (error) {
    throw error;
  }
};

// export const logout = async () => {
//   try {
//     const response = await store.dispatch(actions.logout());
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const logout = async () => {
  try {
    // Clear application state by dispatching the logout action
    const response = await store.dispatch(actions.logout());

    // Clear cookies by calling the /api/logout endpoint
    await fetch("/api/logout", {
      method: "POST",
    });

    // Optionally redirect to the login page or any other page
    window.location.href = "/";

    return response;
  } catch (error) {
    throw error;
  }
};
