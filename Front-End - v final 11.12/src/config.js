export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const URL_IMAGES = `${API_BASE_URL}/images/`;

export const LOGIN_ENDPOINT = `${API_BASE_URL}/api/Auth/Login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/api/User/register`;

export const GET_SHOES_ENDPOINT = `${API_BASE_URL}/api/SmartSearch/Search`;
export const GET_SHOE_BY_ID_ENDPOINT = `${API_BASE_URL}/api/Product/id?id=`;

export const GET_CART_ENDPOINT = `${API_BASE_URL}/api/Cart/GetCart/`;
export const ADD_TO_CART_ENDPOINT = `${API_BASE_URL}/api/Cart/AddToCart`;

export const POST_ORDERS_ENDPOINT = `${API_BASE_URL}/api/orders`;
export const ORDERS_BY_USER_ENDPOINT = `${API_BASE_URL}/api/Orders/user/`;

export const GET_USERS_ENDPOINT = `${API_BASE_URL}/api/User`;
export const DELETE_USER_ENDPOINT = `${API_BASE_URL}/api/User/`;
export const UPDATE_USER_ENDPOINT = `${API_BASE_URL}/api/User/UpdateUser`;
export const UPDATE_USER_ADMIN_ENDPOINT = `${API_BASE_URL}/api/User/UpdateUserAdmin`;

export const ADD_PRODUCT_ENDPOINT = "https://localhost:7200/api/Product/AddProduct";
export const PUT_SHOES_ENDPOINT = "https://localhost:7200/api/Product/UpdateProduct/"; 

export const GET_REVIEW_ENDPOINT = "https://localhost:7200/api/Review/Product/";