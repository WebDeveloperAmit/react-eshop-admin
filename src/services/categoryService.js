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

        const response = await axiosInstance.post(
            "/category/create", 
            data, 
            {
                headers: { "Content-Type" : "multipart/form-data" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        const message = error.response?.data?.message || "Failed to create category";
        return { status: "error", message };
    }
}

export const editCategoryService = async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to fetch category"
        };
    }
}

export const updateCategoryService = async (categoryData, categoryId) => {
    try {
        const response = await axiosInstance.put(
            `/category/update/${categoryId}`,
            categoryData,
            {
                headers: { "Content-Type" : "multipart/form-data" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to update category"
        };
    }
}

export const deleteCategoryService = async (categoryId) => {
    try {
        const response = await axiosInstance.delete(
            `/category/delete/${categoryId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to delete category"
        };
    }
}

export const searchCategoryService = async (searchCategory) => {
    try {
        const response = await axiosInstance.get(
            `/categories?search=${searchCategory}`
        );
        return response.data;
    } catch (error) {
        console.error("Error search category:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to search category"
        };
    }
}