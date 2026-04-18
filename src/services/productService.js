import axiosInstance from "../config/axios.create";

export const getAllProductsService = async () => {
    try {
        const response = await axiosInstance.get("/admin/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        const message = error.response?.data?.message || "Failed to fetch products";
        return { status: "error", message };
    }
}

export const createProductService = async (data) => {
    try {
        // const role = localStorage.getItem("user") 
        // ? JSON.parse(localStorage.getItem("user")).role 
        // : null;

        // if (role !== "admin") {
        //     return { success: false, message: "❌ Only admin can create products" };
        // }

        const response = await axiosInstance.post(
            "/admin/product/create", 
            data, 
            {
                headers: { "Content-Type" : "multipart/form-data" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        const message = error.response?.data?.message || "Failed to create product";
        return { status: "error", message };
    }
}

export const editProductService = async (productId) => {
    try {
        const response = await axiosInstance.get(
            `/admin/product/edit/${productId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to fetch product"
        };
    }
}

export const updateProductService = async (productData, productId) => {
    try {
        const response = await axiosInstance.put(
            `/admin/product/update/${productId}`,
            productData,
            {
                headers: { "Content-Type" : "multipart/form-data" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to update product"
        };
    }
}

export const deleteProductService = async (productId) => {
    try {
        const response = await axiosInstance.delete(
            `/admin/product/delete/${productId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to delete product"
        };
    }
}

export const searchProductService = async (searchProduct) => {
    try {
        const response  = await axiosInstance.get(
            `/admin/products?searchTerm=${searchProduct}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error search product:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message || "Failed to search product"
        };
    }
}