import $api from "../http/index";

export default class UserService {
  static async update(formData) {
    return $api.post("/updUser", formData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
