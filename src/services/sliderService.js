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
            return { 
                success: false, 
                message: "❌ Only admin can create sliders" 
            };
        } 

        const response = await axiosInstance.post(
            "/create-slider", 
            data, 
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error creating slider:", error);
        const message = error.response?.data?.message || "Failed to create slider";
        return { status: "error", message };
    }
}

export const editSliderService = async (sliderId) => {
    try {
        const response = await axiosInstance.get(`/slider/${sliderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching slider:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to fetch slider"
        };
    }
}

export const updateSliderService = async (sliderData, sliderId) => {
    try {
        const response = await axiosInstance.put(
            `/slider/update/${sliderId}`,
            sliderData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating slider:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to update slider"
        };
    }
}

export const deleteSliderService = async (sliderId) => {
    try {
        const response = await axiosInstance.delete(`/slider/delete/${sliderId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting slider:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to delete slider"
        };
    }
}

export const searchSliderService = async (searchSlider) => {
    try {
        const response = await axiosInstance.get(
            `/sliders?search=${searchSlider}`
        );
        return response.data;
    } catch (error) {
        console.error("Error searching slider:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to search slider"
        };
    }
}