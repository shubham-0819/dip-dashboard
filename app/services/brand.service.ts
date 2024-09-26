import { config } from "./config";

const baseUrl = config.api;

interface BrandData {
  name: string;
  createdBy: string;
  updatedBy: string;
}

const BrandService = {
  listBrands: (): Promise<any> => {
    return fetch(`${baseUrl}/api/brand/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to list brands");
      return response.json();
    });
  },

  createBrand: (data: BrandData): Promise<any> => {
    return fetch(`${baseUrl}/api/brand/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to create brand");
      return response.json();
    });
  },

  deleteBrand: (brandId: string): Promise<any> => {
    return fetch(`${baseUrl}/api/brand/delete/${brandId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to delete brand");
      return response.json();
    });
  },
};

export { BrandService };