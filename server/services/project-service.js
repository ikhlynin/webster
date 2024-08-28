const ProjectModel = require("../models/project-model.js");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");

class ProjectService {
  async createProject(title, userId) {
    const project = await ProjectModel.create({
      title: title,
      user: userId,
    });
    return project._id;
  }

  async updDataProject(projectId, title, imagePath, state, canvasWidth, canvasHeight) {
    await ProjectModel.updateOne(
      { _id: projectId },
      { $set: { title: title, image: imagePath, state: state, canvasWidth: canvasWidth, canvasHeight: canvasHeight } }
    );
  }
  async getAllProjects(userId) {
    return await ProjectModel.find({ user: userId });
  }
  async getOneProject(projectId) {
    return await ProjectModel.findById(projectId);
  }

  async delete(projectId) {
    return await ProjectModel.deleteOne({ _id: projectId });
  }
}

module.exports = new ProjectService();
