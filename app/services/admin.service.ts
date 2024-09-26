import { config } from "./config";

const baseUrl = "http://localhost:9091";

interface AdminCreateData {
  email: string;
  password: string;
  mobile: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ChangePasswordData {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

interface InvitationData {
  name: string;
  email: string;
  phone: string;
  brandId: string;
  specializationId: string;
  city: string;
  onboardingCode: string;
  expressCode: string;
  expressCodeExpiration: string;
}

const AdminService = {
  createAdmin: (data: AdminCreateData): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/createAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to create admin");
      return response.json();
    });
  },

  validateAdminOtp: (): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/validate-admin-otp`, {
      method: "POST",
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to validate OTP");
      return response.json();
    });
  },

  login: (data: LoginData): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/login`, {
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

  logout: (): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/logout`, {
      method: "POST",
    }).then((response) => {
      if (!response.ok) throw new Error("Logout failed");
      return response.json();
    });
  },

  changePassword: (data: ChangePasswordData): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/change-password`, {
      method: "POST",
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

  listInvitations: (page: number): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/invitation/list?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to list invitations");
      return response.json();
    });
  },

  sendInvitation: (data: InvitationData): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/invitation/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to send invitation");
      return response.json();
    });
  },

  sendSpecificInvitation: (invitationId: string): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/invitation/send/${invitationId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to send specific invitation");
      return response.json();
    });
  },

  deleteInvitation: (invitationId: string): Promise<any> => {
    return fetch(`${baseUrl}/api/admin/invitation/delete/${invitationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to delete invitation");
      return response.json();
    });
  },
};

export { AdminService };