import axiosInstance from "../config/axios.create";

export const getAllContactCustomersService = async (contactData) => {
    try {
        const response = await axiosInstance.post();
        return response.data;
    } catch (error) {
        console.error("Error contacting customer:", error);
        const message = error.response?.data?.message || "Failed to contact customer";
        return { status: "error", message };
    }
};

export const deleteContactCustomerService = async (contactId) => {
    try {
        const response = await axiosInstance.delete(`/contact-customer/delete/${contactId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting contact customer:", error);
        const message = error.response?.data?.message || "Failed to delete contact customer";
        return { status: "error", message };
    }
};