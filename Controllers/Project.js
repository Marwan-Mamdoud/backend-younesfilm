import cloudinary from "../cloudinary.js";
import Model from "../Models/Project.js";

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Model.find();
    return res.status(200).json({ message: "Done Get Projects", projects });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Get Projects Controller: ${error.message}` });
  }
};

export const addProject = async (req, res, next) => {
  try {
    const {
      name,
      date,
      videos,
      crews,
      Images,
      thumbnailImage,
      ImagesBehindScenes,
      review,
      reviewBehindScenes,
    } = req.body;
    let thumbnail = await cloudinary.uploader.upload(thumbnailImage, {
      format: "webp",
    });
    let images = [];
    let imagesBehindScenes = [];
    thumbnail = thumbnail.secure_url;
    for (const img of Images) {
      const result = await cloudinary.uploader.upload(img, {
        format: "webp",
      });
      images.push(result.secure_url);
    }
    for (const img of ImagesBehindScenes) {
      const result = await cloudinary.uploader.upload(img, {
        format: "webp",
      });
      imagesBehindScenes.push(result.secure_url);
    }
    const project = await new Model({
      name,
      thumbnail,
      date,
      videos: JSON.parse(videos),
      crews: JSON.parse(crews),
      review,
      images,
      imagesBehindScenes,
      reviewBehindScenes,
    });
    await project.save();
    return res.status(201).json({
      message: "Done Create Project Successfully.",
      name,
      date,
      videos,
      images,
      thumbnail,
      imagesBehindScenes,
      crews,
      review,
      reviewBehindScenes,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Create Project Controller: ${error.message}` });
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Model.findByIdAndDelete(id);
    if (data)
      return res
        .status(201)
        .json({ message: "Done Delete Project Successfully." });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Delete Project Controller: ${error.message}` });
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Model.findById(id);
    if (project)
      return res.status(200).json({ message: "Done Get Project", project });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Get One Project Controller: ${error.message}` });
  }
};

export const updatePorject = async (req, res, next) => {
  try {
    console.log(req.body);

    const { id } = req.params;
    const {
      name,
      date,
      videos,
      crews,
      Images,
      thumbnailImage,
      ImagesBehindScenes,
      review,
      reviewBehindScenes,
    } = req.body;

    const project = await Model.findById(id);
    let thumbnail = null;
    if (req.body.thumbnailImage !== "undefined") {
      thumbnail = await cloudinary.uploader.upload(thumbnailImage, {
        format: "webp",
      });
      thumbnail = thumbnail.secure_url;
    }

    let images = [];
    let imagesBehindScenes = [];

    if (req.body.Images.length > 0)
      for (const img of Images) {
        const result = await cloudinary.uploader.upload(img, {
          format: "webp",
        });
        images.push(result.secure_url);
      }

    if (req.body.ImagesBehindScenes.length > 0)
      for (const img of ImagesBehindScenes) {
        const result = await cloudinary.uploader.upload(img, {
          format: "webp",
        });
        imagesBehindScenes.push(result.secure_url);
      }

    project.name = req.body.name || project.name;
    project.thumbnail = thumbnail || project.thumbnail;
    project.date = req.body.date || project.date;
    project.videos =
      JSON.parse(req.body.videos).length > 0
        ? JSON.parse(req.body.videos)
        : project.videos;
    project.crews =
      JSON.parse(req.body.crews).length > 0
        ? JSON.parse(req.body.crews)
        : project.crews;
    project.review = req.body.review || project.review;
    project.images = [...project.images, ...images];
    project.imagesBehindScenes = [
      ...project.imagesBehindScenes,
      ...imagesBehindScenes,
    ];
    project.reviewBehindScenes =
      req.body.reviewBehindScenes || project.reviewBehindScenes;
    await project.save();
    return res
      .status(201)
      .json({ Message: "Done Update Project Successfully..", project });
  } catch (error) {
    console.log("Error Update Project Controller:", error.message);
    res
      .status(400)
      .json({ error: `Error Get One Project Controller: ${error.message}` });
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Model.findById(id);
    console.log(project, "project");
    const { image } = req.body;
    console.log(image, "body");
    project.images = project.images.filter((img) => {
      return img !== image;
    });
    project.date = req.body.date || project.date;
    project.imagesBehindScenes = project.imagesBehindScenes.filter((img) => {
      return img !== image;
    });
    await project.save();
    return res
      .status(201)
      .json({ message: "Done Delete image from Porject", project });
  } catch (error) {
    console.log("Error Delete Image From  Project Controller:", error.message);
    res
      .status(400)
      .json({ error: `Error Get One Project Controller: ${error.message}` });
  }
};
