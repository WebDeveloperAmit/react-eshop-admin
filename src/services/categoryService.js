import axiosInstance from "../config/axios.create";

export const getAllCategoriesService = async () => {
    try {
        const response = await axiosInstance.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        const message = error.response?.data?.message || "Failed to fetch categories";
        return { status: "error", message };
    }
}

export const createCategoryService = async (data) => { 
    try {
        const role = localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user")).role 
        : null;

        if (role !== "admin") {
            return { success: false, message: "❌ Only admin can create categories" };
        }

        const response = await axiosInstance.post("/create-category", data, {
            headers: { "Content-Type" : "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        const message = error.response?.data?.message || "Failed to create category";
        return { status: "error", message };
    }
}
// Operator Mono, 'Consolas'