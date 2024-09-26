import { config } from "./config";

const baseUrl = config.api;

interface SpecializationData {
  name: string;
  createdBy: string;
  updatedBy: string;
}

const SpecializationService = {
  create: (data: FormData): Promise<any> => {
    return fetch(`${baseUrl}/api/specialization/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to create specialization");
      return response.json();
    });
  },

  addIcon: (specializationId: string, iconFile: File): Promise<any> => {
    const formData = new FormData();
    formData.append("icons", iconFile);

    return fetch(`${baseUrl}/api/specialization/add-icon/${specializationId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to add icon");
      return response.json();
    });
  },

  removeIcon: (specializationId: string, iconId: string): Promise<any> => {
    return fetch(`${baseUrl}/api/specialization/delete-icon/${specializationId}/${iconId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to remove icon");
      return response.json();
    });
  },

  list: (): Promise<any> => {
    return fetch(`${baseUrl}/api/specialization/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to list specializations");
      return response.json();
    });
  },

  getDetails: (specializationId: string): Promise<any> => {
    return fetch(`${baseUrl}/api/specialization/details/${specializationId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to get specialization details");
      return response.json();
    });
  },

  delete: (specializationId: string): Promise<any> => {
    return fetch(`${baseUrl}/api/specialization/delete/${specializationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to delete specialization");
      return response.json();
    });
  },

  update: (specializationId: string, data: FormData): Promise<any> => {
    return fetch(`${baseUrl}/api/specialization/update/${specializationId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to update specialization");
      return response.json();
    });
  },
};

export { SpecializationService };