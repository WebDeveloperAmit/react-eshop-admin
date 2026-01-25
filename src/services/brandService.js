import axiosInstance from "../config/axios.create";

export const createBrandService = async (brandData) => {
    try {
        const role = localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user")).role 
        : null;

        if (role !== "admin") {
            return { success: false, message: "❌ Only admin can create brands" };
        }

        const response = await axiosInstance.post(
            '/brand/create', 
            brandData,  {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating brand:", error);
        const message = error.response?.data?.message || "Failed to create brand";
        return { status: "error", message };
    }
};

export const getAllBrandsService =  async () => {
    try {
        const response = await axiosInstance.get("/brands");
        return response.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        const message = error.response?.data?.message || "Failed to fetch brands";
        return { status: "error", message };
    }
}

export const editBrandService = async (brandId) => {
    try {
        const response = await axiosInstance.get(`/brand/${brandId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching brand:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to fetch brand"
        };
    }
}

export const updateBrandService = async (brandData, brandId) => {
    try {
        const response = await axiosInstance.put(
            `/brand/update/${brandId}`,
            brandData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating brand:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to update brand"
        };
    }
}

export const deleteBrandService = async (brandId) => {
    try {
        const response = await axiosInstance.delete(`/brand/delete/${brandId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting brand:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to delete brand"
        };
    }
}

export const searchBrandService = async (searchBrand) => {
    try {
        const response = await axiosInstance.get(
            `/brand?search=${searchBrand}`
        );
        return response.data;
    } catch (error) {
        console.error("Error searching brand:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to search brand"
        };
    }
}
