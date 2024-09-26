import { config } from "./config";

const baseUrl = config.api;

interface RegistrationLinkData {
  brandId: string;
  specializationId: string;
  link: string;
}

const RegistrationLinkService = {
  listLinks: (): Promise<any> => {
    return fetch(`${baseUrl}/api/registrationlink/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to list registration links");
      return response.json();
    });
  },

  createLink: (data: RegistrationLinkData): Promise<any> => {
    return fetch(`${baseUrl}/api/registrationlink/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to create registration link");
      return response.json();
    });
  },

  deleteLink: (data: { brandId: string; specializationId: string }): Promise<any> => {
    return fetch(`${baseUrl}/api/registrationlink/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to delete registration link");
      return response.json();
    });
  },
};

export { RegistrationLinkService };