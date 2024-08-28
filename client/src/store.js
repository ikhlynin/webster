import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URL } from "./http";
import AuthService from "./service/auth-service";
import UserService from "./service/user-service";
import ProjectService from "./service/project-service";

export default class Store {
  user = {
    id: "",
    email: "",
    name: "",
    img: "",
    status: "",
    activated: false,
    isadmin: false,
  };
  isAuth = false;
  isLoading = false;
  canvasName;
  canvasWidth;
  canvasHeight;
  canvasBackColor;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  getAuth() {
    if (!localStorage.getItem("token")) {
      this.setAuth(false);
      return false;
    }
    return this.isAuth;
  }

  setUser(activated, email, id, img, name, status, isadmin) {
    this.user.id = id;
    this.user.email = email;
    this.user.name = name;
    this.user.img = img;
    this.user.status = status;
    this.user.activated = activated;
    this.user.isadmin = isadmin;
  }

  setCanvasConf(canvasName, canvasWidth, canvasHeight, canvasBackColor) {
    this.canvasName = canvasName;
    this.canvasWidth = canvasWidth;
    this.canvasBackColor = canvasBackColor;
    this.canvasHeight = canvasHeight;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async refresh() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      if (!response.data.accessToken) {
        this.setAuth(false);
        return;
      }
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(
        response.data.user.activated,
        response.data.user.email,
        response.data.user.id,
        response.data.user.img,
        response.data.user.name,
        response.data.user.status,
        response.data.user.isAdmin
      );
    } catch (e) {
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/checkAuth`, {
        withCredentials: true,
      });
      if (response.data == "auth: false") {
        this.setAuth(false);
        return;
      }
      this.setAuth(true);
      this.setUser(
        response.data.user.activated,
        response.data.user.email,
        response.data.user.id,
        response.data.user.img,
        response.data.user.name,
        response.data.user.status,
        response.data.user.isAdmin
      );
    } catch (e) {
    } finally {
      this.setLoading(false);
    }
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(
        response.data.user.activated,
        response.data.user.email,
        response.data.user.id,
        response.data.user.img,
        response.data.user.name,
        response.data.user.status,
        response.data.user.isAdmin
      );
      return true;
    } catch (e) {
      console.log(e.response?.data?.message);
      return e;
    }
  }
  async registration(name, email, password) {
    try {
      const response = await AuthService.registration(name, email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(
        response.data.user.activated,
        response.data.user.email,
        response.data.user.id,
        response.data.user.img,
        response.data.user.name,
        response.data.user.status,
        response.data.user.isAdmin
      );
      return true;
    } catch (e) {
      console.log(e.response?.data?.message);
      return e;
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      localStorage.setItem("active_cals", "");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }


  /////////////////////////////////////////////////Project///////////////////////////////////////////
  async updateProject(files, title, state, projectId, canvasWidth, canvasHeight) {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("state", state);
      formData.append("projectId", projectId);
      formData.append("img", files);
      formData.append("canvasWidth", canvasWidth);
      formData.append("canvasHeight", canvasHeight);
      const response = await ProjectService.update(formData);
      return true;
    } catch (e) {
      console.log(e.response?.data?.message);
      return e;
    }
  }

  async newPr(title, userId) {
    try {
      const response = await ProjectService.newPr(title, userId);
      return response.data;
    } catch (e) {
      console.log(e.response?.data?.message);
      return e;
    }
  }
  async getAllProjct(userId) {
    try {
      const response = await ProjectService.getAllPr(userId);
      return response.data;
    } catch (e) {
      console.log(e.response?.data?.message);
      return e;
    }
  }

  async getOneProject(projId) {
    try {
      const response = await ProjectService.getOnePr(projId);
      return response.data;
    } catch (e) {
      console.log(e.response?.data?.message);
      return e;
    }
  }

  async deleteProject(projId) {
    try {
      const response = await ProjectService.deleteProject(projId);
      return response.data;
    } catch (e) {
      console.log(e.response?.data?.message);
      return e;
    }
  }
}
