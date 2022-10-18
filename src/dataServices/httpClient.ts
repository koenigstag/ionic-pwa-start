import axios from 'axios';

const config = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};

const httpClient = () => {
  const client = axios.create(config);

  client.interceptors.request.use(
    (config) => config,
    (err) => {
      // TODO dispatch redux - set offline status = true

      return Promise.reject(err);
    }
  );

  client.interceptors.response.use(
    (res) => res.data,
    (err) => {
      return Promise.reject(err);
    }
  );

  return client;
};

export default httpClient;
