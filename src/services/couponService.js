import axiosInstance from "../config/axios.create";

export const getAllCouponsService = async () => {
    try {
        const response = await axiosInstance.get("/coupons");
        return response.data;
    } catch (error) {
        console.error("Error fetching coupons:", error);
        const message = error.response?.data?.message || "Failed to fetch coupons";
        return { status: "error", message };
    }
}

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