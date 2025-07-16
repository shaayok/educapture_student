
import { BASE_URL } from "../constants";
import { fetchAPI } from "./api";
import { handleResponse } from "./handleResponse";


export async function login({ email, password }) {
  const response = await fetchAPI(`${BASE_URL}/api/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const result = await handleResponse(response);

  const token = result.data?.data?.token;
  const userId = result.data?.data?.loggedInUserId;
  const ndaSigned = result.data?.data?.ndaSigned;

  console.log("TOKEN:", token);
  console.log("USER ID:", userId);

  if (!token) {
    throw new Error('Login failed: token not found');
  }

  return { token, userId, ndaSigned };
}

export async function acceptNda() {
  const response = await fetchAPI(`${BASE_URL}/api/nda`)

  const result = await handleResponse(response);

  const status = result?.data?.status
  const message = result?.data?.message

  if (!message || message !== "NDA signed successfully.")
    throw new Error("NDA signing failure");

  return { status };
}

export function logout() {
  localStorage.removeItem('authToken');
}
