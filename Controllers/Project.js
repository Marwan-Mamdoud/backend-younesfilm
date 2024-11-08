import cloudinary from "../cloudinary.js";
import Model from "../Models/Project.js";
import Sorted from "../Models/Sorted.js";

export const getProjects = async (req, res, next) => {
  try {
    let projects = await Model.find().lean().sort({ _id: -1 });
    const sorted = await Sorted.findOne();
    if (sorted && sorted.sortedData.length > 0) {
      projects = sorted.sortedData.map((item) => {
        return projects.find((element) => element.name === item);
      });
    }
    return res.status(200).json({
      message: "Done Get ALL Projects",
      length: projects.length,
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
      Images,
      thumbnailImage,
      ImagesBehindScenes,
      review,
      reviewBehindScenes,
    } = req.body;

    const project = await new Model({
      name,
      thumbnail: thumbnailImage,
      category,
      date,
      videos: JSON.parse(videos),
      crews: JSON.parse(crews),
      review,
      images: JSON.parse(Images),
      imagesBehindScenes: ImagesBehindScenes,
      reviewBehindScenes,
    });
    await project.save();
    const sortedData = await Sorted.findOne();
    sortedData.sortedData.unshift(project.name);
    sortedData.save();
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

    let sortedData = await Sorted.findOne();

    sortedData.sortedData = sortedData.sortedData.map((item) => {
      if (item === project.name) {
        return (item = name || project.name);
      } else {
        return (item = item);
      }
    });
    project.name = name || project.name;
    project.thumbnail = thumbnailImage || project.thumbnail;
    project.date = date || project.date;
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
    await sortedData.save();
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
  let sortedData = req.body; // Array of items with _id and other properties

  try {
    // Step 1: Iterate through the sorted data
    if (sortedData && sortedData.length > 0) {
      let data = sortedData.map((data) => data.name);
      let sortedProjects = await Sorted.findOne();
      if (!sortedProjects) {
        sortedData = await new Sorted({
          sortedData: data,
        });
        await sortedData.save();
      } else {
        sortedProjects.sortedData = data;
        await sortedProjects.save();
      }
      return res
        .status(201)
        .json({ message: "Done Sorted Projects Succefully.." });
    } else {
      return res.status(201).json({ message: "Allready Sorted" });
    }
  } catch (error) {
    console.log("Error From Sorted Projects Controller:", error.message);
    res
      .status(400)
      .json({ error: `Error Sorted Projects Controller: ${error.message}` });
  }
};
