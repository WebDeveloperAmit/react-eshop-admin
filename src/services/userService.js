import axiosInstance from "../config/axios.create";

export const getAllUsersService = async () => {
    try {
        const response = await axiosInstance.get('/admin/users');
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        const message = error.response?.data?.message || "Failed to fetch users";
        return { status: "error", message };
    }
};