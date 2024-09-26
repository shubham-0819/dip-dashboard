import { config } from "./config";

const baseUrl = config.api;

interface SubadminInvitationData {
  name: string;
  email: string;
  phone: string;
  brandId: string;
  specializationId: string;
}

interface UpdateInvitationData extends SubadminInvitationData {
  invitationId: string;
}

const SubadminService = {
  sendInvitation: (data: SubadminInvitationData): Promise<any> => {
    return fetch(`${baseUrl}/api/subadmin/sendInvitation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to send subadmin invitation");
      return response.json();
    });
  },

  resendInvitation: (data: UpdateInvitationData): Promise<any> => {
    return fetch(`${baseUrl}/api/subadmin/resendInvitation`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to resend subadmin invitation");
      return response.json();
    });
  },

  updateInvitation: (invitationId: string, data: UpdateInvitationData): Promise<any> => {
    return fetch(`${baseUrl}/api/subadmin/updateInvitation?invitationId=${invitationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to update subadmin invitation");
      return response.json();
    });
  },

  listInvitations: (): Promise<any> => {
    return fetch(`${baseUrl}/api/subadmin/listInvitation`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to list subadmin invitations");
      return response.json();
    });
  },

  deleteInvitation: (invitationId: string): Promise<any> => {
    return fetch(`${baseUrl}/api/subadmin/deleteInvitation`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ invitationId }),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to delete subadmin invitation");
      return response.json();
    });
  },

  getInvitation: (invitationId: string): Promise<any> => {
    return fetch(`${baseUrl}/api/subadmin/getIinvitation/${invitationId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to get subadmin invitation");
      return response.json();
    });
  },
};

export { SubadminService };