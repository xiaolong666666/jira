import qs from "qs";
import { useAuth } from "context/auth-provider";
import { API_URL, API_METHOD } from "../constants";

const { GET, POST } = API_METHOD;

interface RequestConfig extends RequestInit {
  token?: string;
  data?: object;
}

export const http = (
  endPoint: string,
  { headers, token, data, ...customConfig }: RequestConfig = {}
) => {
  const config = {
    method: GET,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...headers,
    },
    ...customConfig,
  };

  if (config.method === GET) {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    Object.assign(config, {
      body: JSON.stringify(data || {}),
    });
  }

  return window
    .fetch(`${API_URL}/${endPoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        const { logout } = useAuth();
        logout();
        window.location.reload();
        return Promise.reject({ message: "登录失效" });
      }
      const data = response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(await data);
      }
    });
};
