import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
const base = axios.create({
	//  baseURL: "https://home.moodsinger.com/api",
	baseURL: 'http://localhost:3000/api',
	// baseURL: "https://api.home.moodsinger.com/api"
});

// Request interceptor
base.interceptors.request.use(async (config) => {
	if (typeof window !== 'undefined') {
		const token = secureLocalStorage.getItem('@authToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

// Response interceptor
base.interceptors.response.use(
	(response) => response?.data,
	(error) => {
		if (error.response?.status === 401) {
			// Client-side handling
			if (typeof window !== 'undefined') {
				secureLocalStorage.removeItem('@authToken');
				window.location.href = '/login'; // Full page reload to clear state
			}
		}
		return Promise.reject(error);
	}
);

export default base;
