import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "http://localhost:3000/";
  // const defaultUrl = "http://192.168.100.3:3000/";

  const axiosClient = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });
  axiosClient.interceptors.request.use((config) => {
    const { status, data } = useAuth()
    // Here we check if user is logged in
    if (status.value == 'authenticated') {
      // If the user is logged in we can now get the token, we get something like `Bearer yourTokenJ9F0JFODJ` but we only need the string without the word **Bearer**, So we split the string using the space as a separator and we access the second position of the array **[1]**
      const { token } = useAuthState()
      config.headers['Authorization'] = token.value
    }
    return config
  },(error) => {
    // Do something with request error
    return Promise.reject(error);
  });
  return {
    provide: {
      axiosClient: axiosClient,
    },
  };
});