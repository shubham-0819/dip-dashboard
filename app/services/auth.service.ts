import { config } from "./config";

const baseUrl = config.api;

interface LoginData {
  userName: string;
  password: string;
}

interface ChangePasswordData {
  userName: string;
  password: string;
  newPassword: string;
}

const AuthService = {
  login: (data: LoginData): Promise<any> => {
    return fetch(`${baseUrl}/api/doctor/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Login failed");
      return response.json();
    });
  },

  changePassword: (data: ChangePasswordData): Promise<any> => {
    return fetch(`${baseUrl}/api/doctor/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to change password");
      return response.json();
    });
  },
};

export { AuthService };