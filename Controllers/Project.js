import cloudinary from "../cloudinary.js";
import Model from "../Models/Project.js";
import Sorted from "../Models/Sorted.js";

export const getProjects = async (req, res, next) => {
  try {
    let projects = await Model.find();
    const sorted = await Sorted.findOne();
    if (sorted && sorted.sortedData.length > 0) {
      const sortedProjects = sorted.sortedData.map((item) =>
        projects.find((element) => element.name === item)
      );
      projects = sortedProjects;
      return res
        .status(200)
        .json({ message: "Done Get ALL Projects", projects });
    } else {
      return res
        .status(200)
        .json({ message: "Done Get ALL Projects", projects });
    }
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
    let thumbnail = await cloudinary.uploader.upload(thumbnailImage, {
      format: "webp",
    });
    let images = [];
    let imagesBehindScenes = [];
    thumbnail = thumbnail.secure_url;
    const Imagess = JSON.parse(Images);
    console.log(Imagess, "images array");

    for (const img of Imagess) {
      const before = await cloudinary.uploader.upload(img.before, {
        format: "webp",
      });
      const after = await cloudinary.uploader.upload(img.after, {
        format: "webp",
      });
      images.push({ before: before.secure_url, after: after.secure_url });
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
      category,
      date,
      videos: JSON.parse(videos),
      crews: JSON.parse(crews),
      review,
      images: images,
      imagesBehindScenes: imagesBehindScenes,
      reviewBehindScenes,
    });
    await project.save();
    const sortedData = await Sorted.findOne();
    sortedData.sortedData.unshift(project.name);
    sortedData.save();
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
    const project = await Model.findById(id);
    const data = await Model.findByIdAndDelete(id);
    const sortedData = await Sorted.findOne();
    sortedData.sortedData = sortedData.sortedData.filter(
      (item) => item !== project.name
    );
    sortedData.save();
    if (data);
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

    let thumbnail = null;
    if (req.body.thumbnailImage) {
      thumbnail = await cloudinary.uploader.upload(thumbnailImage, {
        format: "webp",
      });
      thumbnail = thumbnail.secure_url;
    }

    let imagesBehindScenes = [];
    const Imagess = JSON.parse(Images);
    let images = [];

    if (req.body.Images.length > 0) {
      for (const img of Imagess) {
        const before = await cloudinary.uploader.upload(img.before, {
          format: "webp",
        });
        const after = await cloudinary.uploader.upload(img.after, {
          format: "webp",
        });
        images.push({ before: before.secure_url, after: after.secure_url });
      }
    }

    if (req.body.ImagesBehindScenes.length > 0) {
      for (const img of ImagesBehindScenes) {
        const result = await cloudinary.uploader.upload(img, {
          format: "webp",
        });
        imagesBehindScenes.push(result.secure_url);
      }
    }
    let sortedData = await Sorted.findOne();
    console.log(sortedData, "first");

    sortedData.sortedData = sortedData.sortedData.map((item) => {
      if (item === project.name) {
        return (item = req.body.name || project.name);
      } else {
        return (item = item);
      }
    });
    console.log(sortedData, "second");
    await sortedData.save();
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
