import axios from 'axios';
import { useSnackbar } from 'notistack';
import { BASE_URL } from 'src/config';

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export const useAxiosInterceptors = () => {
    const { enqueueSnackbar } = useSnackbar();

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            enqueueSnackbar(error.message || 'Something went wrong', { variant: 'error' });
        }
    );

    return axiosInstance;
}

export default axiosInstance;
