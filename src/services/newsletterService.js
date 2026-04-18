import axiosInstance from "../config/axios.create";

export const getAllNewslettersService = async () => {
    try {
        const response = await axiosInstance.get('/admin/subscribes');
        return response.data;
    } catch (error) {
        console.error("Error fetching newsletters:", error);
        const message = error.response?.data?.message || "Failed to fetch newsletters";
        return { status: "error", message };
    }
};

export const deleteNewsletterService = async (newsletterId) => {
    try {
        const response = await axiosInstance.delete(`/admin/subscribe/${newsletterId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting newsletter:", error);
        const message = error.response?.data?.message || "Failed to delete newsletter";
        return { status: "error", message };
    }
};