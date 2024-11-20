import cloudinary from "../cloudinary.js";
import Model from "../Models/Project.js";
import Sorted from "../Models/Sorted.js";

export const getProjects = async (req, res, next) => {
  try {
    // const page = parseInt(req.query.page) || 1; // Default page is 1
    // const limit = 6;
    let projects = await Model.find().sort({ order: 1 });
    // .limit(limit)
    // .skip((page - 1) * limit);
    // const pages = Math.ceil((await Model.countDocuments()) / limit);
    // const sorted = await Sorted.findOne();
    // if (sorted && sorted.sortedData.length > 0) {
    //   projects = sorted.sortedData.map((item) => {
    //     return projects.find((element) => element.name === item);
    //   });
    // }
    res.status(200).json({
      message: "Done Get ALL Projects",
      length: projects.length,
      // pages,
      projects,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Get Projects Controller: ${error.message}` });
  }
};

export const getProjectsByCategory = async (req, res, next) => {
  try {
    // const page = parseInt(req.query.page) || 1; // Default page is 1
    // const limit = 6;
    const { category } = req.params;
    let projects = await Model.find({ category: category }).sort({ order: 1 });
    // .limit(limit)
    // .skip((page - 1) * limit);
    // const pages = Math.ceil((await Model.countDocuments()) / limit);
    // const sorted = await Sorted.findOne();
    // if (sorted && sorted.sortedData.length > 0) {
    //   projects = sorted.sortedData.map((item) => {
    //     return projects.find((element) => element.name === item);
    //   });
    // }
    res.status(200).json({
      message: "Done Get ALL Projects",
      length: projects.length,
      // pages,
      projects,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Get Projects Controller: ${error.message}` });
  }
};

export const getsortd = async (req, res, next) => {
  try {
    const sorted = await Sorted.find();
    res.status(200).json(sorted);
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
      category,
      style,
      Images,
      thumbnailImage,
      ImagesBehindScenes,
      review,
      reviewBehindScenes,
    } = req.body;
    const lastProject = await Model.findOne().sort({ order: -1 });
    const newOrder = lastProject ? lastProject.order + 1 : 0;
    // const page = Math.ceil(((await Model.countDocuments()) + 1) / 6);

    const project = await new Model({
      name,
      thumbnail: thumbnailImage,
      category,
      date,
      style,
      videos: JSON.parse(videos),
      crews: JSON.parse(crews),
      review,
      order: newOrder,
      // page,
      images: JSON.parse(Images),
      imagesBehindScenes: ImagesBehindScenes,
      reviewBehindScenes,
    });
    await project.save();
    // const sortedData = await Sorted.findOne();
    // sortedData.sortedData.unshift(project.name);
    // sortedData.save();
    return res.status(201).json({
      message: "Done Create Project Successfully.",

      project,
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
    const project = await Model.findById(id);
    const data = await Model.findByIdAndDelete(id);
    const sortedData = await Sorted.findOne();
    sortedData.sortedData = sortedData.sortedData.filter(
      (item) => item !== project.name
    );
    sortedData.save();
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
    res.status(200).json({ message: "Done Get Project", project });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Get One Project Controller: ${error.message}` });
  }
};

export const updatePorject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Model.findById(id);
    const {
      name,
      date,
      videos,
      crews,
      style,
      Images,
      ImagesBehindScenes,
      thumbnailImage,
      review,
      reviewBehindScenes,
    } = req.body;

    project.name = name || project.name;
    project.thumbnail = thumbnailImage || project.thumbnail;
    project.date = date || project.date;
    project.style = style || project.style;
    project.videos =
      JSON.parse(videos).length > 0 ? JSON.parse(videos) : project.videos;
    project.crews =
      JSON.parse(crews).length > 0 ? JSON.parse(crews) : project.crews;
    project.review = review || project.review;
    project.images = [...project.images, ...JSON.parse(Images)];
    project.imagesBehindScenes = [
      ...project.imagesBehindScenes,
      ...ImagesBehindScenes,
    ];
    project.reviewBehindScenes =
      reviewBehindScenes || project.reviewBehindScenes;
    await project.save();
    return res
      .status(201)
      .json({ Message: "Done Update Project Successfully..", project });
  } catch (error) {
    console.log("Error Update Project Controller:", error.message);
    res
      .status(400)
      .json({ error: `Error Updata Project Controller: ${error.message}` });
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Model.findById(id);
    const { image } = req.body;
    project.images = project.images.filter((img) => {
      return img.before !== image;
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

export const sortedProjects = async (req, res, next) => {
  try {
    let { order } = req.body; // Array of items with _id and other properties

    console.log(order);
    const bulkOps = order.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: item.order } },
      },
    }));

    await Model.bulkWrite(bulkOps);
    return res.status(201).json({ message: "Done Sorted Sorted" });
  } catch (error) {
    console.log("Error From Sorted Projects Controller:", error.message);
    res
      .status(400)
      .json({ error: `Error Sorted Projects Controller: ${error.message}` });
  }
};
