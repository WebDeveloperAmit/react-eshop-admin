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

export const updateSettings = async (settingsData) => {
    try {
        const response  = await axiosInstance.post(
            '/site-settings', 
            settingsData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating settings:', error);
        const message = error.response?.data?.message;
        return { status: 'error', message };
    }
}