/* eslint-disable no-unused-vars */
import { userApi } from "@/redux/api/userApi";
import { store } from "@/redux/store";
import { redirect } from "react-router-dom";

export const UserLoader = async () => {
  const p = store.dispatch(userApi.endpoints.getUser.initiate());

  try {
    const response = await p.unwrap();
    return response;
  } catch (err) {
    return redirect("/");
  } finally {
    p.unsubscribe();
  }
};
