import axiosInstance from "../config/axios.create";

export const getAllSlidersService = async () => {
    try {
        const response = await axiosInstance.get("/sliders");
        return response.data;
    } catch (error) {
        console.error("Error fetching sliders:", error);
        const message = error.response?.data?.message || "Failed to fetch sliders";
        return { status: "error", message };
    }
}

export const createSliderService = async (data) => {
    try {
        const role = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).role
        : null;
        
        if (role !== "admin") {
            return { success: false, message: "❌ Only admin can create sliders" };
        } 

        const response = await axiosInstance.post("/create-slider", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating slider:", error);
        const message = error.response?.data?.message || "Failed to create slider";
        return { status: "error", message };
    }
}