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
export const fetchGiftcardOrder = (formData) => apiWithAuth.post("app/giftcard/fetch_giftcard_order",formData).then(getApiResponse).catch(getErrorResponse);


export const fetchWallet = () => apiWithAuth.post("app/wallet/fetch").then(getApiResponse).catch(getErrorResponse);
export const fetchReferrals = () => apiWithAuth.post("app/wallet/referrals").then(getApiResponse).catch(getErrorResponse);
export const fetchBanks = () => apiWithAuth.post("app/wallet/fetch_bank").then(getApiResponse).catch(getErrorResponse);
export const fetchTransactions = () => apiWithAuth.post("app/wallet/fetch_transactions").then(getApiResponse).catch(getErrorResponse);
export const addBankAccount = (formData) => apiWithAuth.post("app/wallet/add_bank_account",formData).then(getApiResponse).catch(getErrorResponse);
export const verifyPin = (formData) => apiWithAuth.post("app/wallet/verify_pin",formData).then(getApiResponse).catch(getErrorResponse); // pending
export const withdraw = (formData) => apiWithAuth.post("app/wallet/withdraw",formData).then(getApiResponse).catch(getErrorResponse);

export const fetchCryptos = () => apiWithAuth.post("app/crypto/fetch_crypto").then(getApiResponse).catch(getErrorResponse);
export const fetchCryptoOrder = () => apiWithAuth.post("app/crypto/fetch_crypto_order").then(getApiResponse).catch(getErrorResponse);

export const fetchEFund = () => apiWithAuth.post("app/efund/fetch_efund").then(getApiResponse).catch(getErrorResponse);


export const updateInfoAPI = (formData) => apiWithAuth.post("app/profile/update",formData).then(getApiResponse).catch(getErrorResponse);
export const deactivateAccount = (formData) => apiWithAuth.post("app/profile/delete_account",formData).then(getApiResponse).catch(getErrorResponse);
export const updatePassword = (formData) => apiWithAuth.post("app/profile/update_password",formData).then(getApiResponse).catch(getErrorResponse);


export const fetchNotification = () => apiWithAuth.post("app/notifications/fetch").then(getApiResponse).catch(getErrorResponse);
export const fetchUnreadNotification = () => apiWithAuth.post("app/notifications/fetch-unread").then(getApiResponse).catch(getErrorResponse);
export const markAsUnread = (formData) => apiWithAuth.post("app/notifications/mark-asread",formData).then(getApiResponse).catch(getErrorResponse);
export const markAllAsUnread = (formData) => apiWithAuth.post("app/notifications/markall-asread",formData).then(getApiResponse).catch(getErrorResponse);  