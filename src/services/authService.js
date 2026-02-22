import axiosInstance from "../config/axios.create";

export const loginService =  async (credentials) => {
    try {
        const response = await axiosInstance.post(
            '/admin/login', 
            credentials
        );
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        const message = error.response?.data?.message || "Failed to login";
        return { 
            message,
            status: "error" 
        };
        // return Promise.reject({ success: false, message: "Login failed" });
    }
}