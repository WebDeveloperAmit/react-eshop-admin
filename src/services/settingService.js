import axiosInstance from "../config/axios.create";

export const getSettings = async () => {
    try {
        const response  = await axiosInstance.get('/site-settings');
        return response.data;
    } catch (error) {
        console.error('Error fetching settings:', error);
        const message = error.response?.data?.message || 'Failed to fetch settings';return { status: 'error', message };
    }
}