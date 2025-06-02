"use client"
import { toast } from "react-toastify";
import base from "../axios";
import END_POINTS from "../endPoints";
import secureLocalStorage from "react-secure-storage";

export const fetchLogin = async (data: any) => {
    try {
        const response = await base.post(END_POINTS.login, data);
        if (response.status === 200) { // Assuming 200 is the success status code
            secureLocalStorage.setItem('@authToken', response.data.token);
            toast.success("Login successful");
            return response.data;
        }
        else {
            toast.error(response.data.message as string);
        }
    } catch (error: any) {
        toast.error(error.response.data.message);
        return error.response.data;
    }
}

export const fetchRegister = async (data: any) => {
    try {
        const response = await base.post(END_POINTS.register, data);
        if (response.status === 201) {
            toast.success("Registration successful");
            return response.data;
        }
        else {
            toast.error(response.data.message as string);
        }
    } catch (error: any) {
        toast.error(error.response.data.message);
        return error.response.data;
    }
}

export const fetchGoogleUser = async (data: any) => {
    try {
        const response = await base.post(END_POINTS.google, data);
        if (response.status === 200) {
            secureLocalStorage.setItem('@authToken', response.data.token);
            toast.success("Login successful");
            return response.data;
        }
        else {
            toast.error(response.data.message as string);
        }
    } catch (error: any) {
        toast.error(error.response.data.message);
        return error.response.data;
    }
}