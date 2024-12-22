import axios from 'axios';

const client = axios.create({
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

client.interceptors.response.use((response) => { return response }, async (error) => {
    return Promise.reject(error);
});

export const $client = client;
