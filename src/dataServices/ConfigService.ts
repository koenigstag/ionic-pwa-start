export interface IConfig {
  NODE_ENV: string;
  PUBLIC_URL: string;
  API_URL: string;
}

export const Config = {
  NODE_ENV: 'NODE_ENV',
  PUBLIC_URL: 'PUBLIC_URL',
  API_URL: 'REACT_APP_API_URL',
};

class ConfigService {
  public get(key: string) {
    return process.env[key];
  }
}

const configService = new ConfigService();

export default configService;
