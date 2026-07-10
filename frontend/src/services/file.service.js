import api from "./api";

const fileService = {
  upload: (formData) =>
    api.post("/files/upload", formData),

  uploadMultiple: (formData) =>
    api.post("/files/upload/multiple", formData),

  getFiles: () => api.get("/files"),

  getFile: (id) => api.get(`/files/${id}`),

  updateFile: (id, data) =>
    api.put(`/files/${id}`, data),

  deleteFile: (id) =>
    api.delete(`/files/${id}`),
};

export default fileService;