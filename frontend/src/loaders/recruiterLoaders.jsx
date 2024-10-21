/* eslint-disable no-unused-vars */
import { userApi } from "@/redux/api/userApi";
import { store } from "@/redux/store";
import { redirect } from "react-router-dom";

export const RecruiterLoaders = async (requiredType) => {
  const p = store.dispatch(userApi.endpoints.getUser.initiate());
  try {
    const response = await p.unwrap();
    const userType = response.userType;
    if (userType !== requiredType) {
      return redirect("/");
    }
    return response;
  } catch (error) {
    return redirect("/");
  } finally {
    p.unsubscribe();
  }
};
