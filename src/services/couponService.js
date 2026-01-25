import axiosInstance from "../config/axios.create";

// Get All Coupons
export const getAllCouponsService = async () => {
    try {
        const response = await axiosInstance.get("/coupons");
        return response.data;
    } catch (error) {
        console.error("Error fetching coupons:", error);
        const message = error.response?.data?.message || "Failed to fetch coupons";
        return { 
            status: "error", 
            message 
        };
    }
}

// Create Coupon
export const createCouponService = async (couponData) => {
    try {
        const role = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).role
        : null;

        if (role !== "admin") {
            return { success: false, message: "❌ Only admin can create coupons" };
        }

        const response = await axiosInstance.post("/create-coupon", couponData);

        return response.data;

    } catch (error) {
        console.error("Error creating coupon:", error);
        const message = error.response?.data?.message || "Failed to create coupon";
        return { status: "error", message };
    }
}

// Get Single Coupon
export const getSingleCoupon = async (couponId) => {
    try {
        const response = await axiosInstance.get(`coupon/${couponId}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching single coupon:", error);
        const message = error.response?.data?.message || "Failed to fetch coupons";
        return { 
            status: "error", 
            message 
        };
    }
}

// Update Coupon
export const updateCoupon = async (couponData, couponId) => {
    try {
        const response = await axiosInstance.put(
            `coupon/update/${couponId}`, 
            couponData
        );
        return response.data;
    } catch (error) {
        console.error("Error update coupon:", error);
        const message = error.response?.data?.message || "Failed to update coupon";
        return {
            status: "error",
            message
        }
    }
}

// Delete Coupon
export const deleteCoupon = async (couponId) => {
    try {
        const response = await axiosInstance.delete(`coupon-delete/${couponId}`);
        return response.data;
    } catch (error) {
        console.error("Error delete coupon:", error);
        const message = error.response?.data?.message || "Failed to delete coupon";
        return {
            status: "error",
            message
        }
    }
}

// Search Coupon
export const searchCouponsService = async (search) => {
    try {
        const response = await axiosInstance.get(
            `/coupons?search=${search}`
        );
        return response.data;
    } catch (error) {
        return {
            status: "error",
            message: error.response?.data?.message || "Search failed"
        }
    }
};