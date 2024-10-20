import { apiWithAuth, apiWithOutAuth, getApiResponse, getErrorResponse } from "./httpService";

export const pagination = (formData) => apiWithAuth.post(formData).then(getApiResponse).catch(getErrorResponse);
export const registerAPI = (formData) => apiWithOutAuth.post("/register", formData).then(getApiResponse).catch(getErrorResponse);
export const Applogin = (formData) => apiWithOutAuth.post("/login", formData).then(getApiResponse).catch(getErrorResponse);
export const sendOTP = (formData) => apiWithOutAuth.post("/recover/send_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const resendOTP = (formData) => apiWithOutAuth.post("/recover/resend_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const verifyOTP = (formData) => apiWithOutAuth.post("/recover/verify_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const setNewPassword = (formData) => apiWithOutAuth.post("/recover/create_new_password", formData).then(getApiResponse).catch(getErrorResponse);
export const verifyReferral = (formData) => apiWithAuth.post("/app/verify_referral", formData).then(getApiResponse).catch(getErrorResponse);


export const setTransactionPin = (formData) => apiWithAuth.post("app/wallet/create_pin",formData).then(getApiResponse).catch(getErrorResponse);


export const fetchGiftcards = () => apiWithAuth.post("app/giftcard/fetch_giftcards").then(getApiResponse).catch(getErrorResponse);
export const fetchGiftcard = (formData) => apiWithAuth.post("app/giftcard/fetch_a_giftcard",formData).then(getApiResponse).catch(getErrorResponse);

export const fetchCryptos = () => apiWithAuth.post("app/crypto/fetch_crypto").then(getApiResponse).catch(getErrorResponse);
