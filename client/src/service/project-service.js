import $api from "../http/index";

export default class ProjectService {
  static async update(formData) {
    return $api.post("/upProject", formData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static async newPr(title, userId) {
    return $api.post("/project", { title, userId });
  }
  static async getAllPr(userId) {
    return $api.get(`/projectAll/${userId}`);
  }
  static async getOnePr(projId) {
    return $api.get(`/projectOne/${projId}`);
  }

  static async deleteProject(projId) {
    return $api.delete(`/project/${projId}`);
  }
}
