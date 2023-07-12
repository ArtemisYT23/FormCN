import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_BACKEND_CN;
const BASE_SECURITY = import.meta.env.VITE_URL_AUTENTICATED;
const BASE_DOCUMENTAL = import.meta.env.VITE_URL_DOCUMENTAL_CN;

export const client = (TockenUser) =>
    axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    })

export const documental = (TockenUser) =>
    axios.create({
        baseURL: BASE_DOCUMENTAL,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    })

export const autenticated = () =>
    axios.create({
        baseURL: BASE_SECURITY,
        headers: {
            "Content-Type": "application/json",
        }
    })