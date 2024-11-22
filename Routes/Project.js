import { Router } from "express";
import nodemailer from "nodemailer";
import {
  addProject,
  deleteImage,
  deleteProject,
  getPorjectsForHome,
  getProject,
  getProjects,
  getProjectsByCategory,
  getsortd,
  sortedProjects,
  updatePorject,
} from "../Controllers/Project.js";
import {
  createUser,
  deleteUsers,
  getUser,
  getUsers,
  updateUser,
} from "../Controllers/Users.js";
const router = Router();

router.get("/get-projects", getProjects);

router.get("/get-projects-home", getPorjectsForHome);

router.get("/get-projects/:category", getProjectsByCategory);

router.get("/get-sorted", getsortd);

router.post("/addProject", addProject);

router.get("/get-project/:id", getProject);

router.put("/updateProject/:id", updatePorject);

router.put("/deleteImage/:id", deleteImage);

router.delete("/delete-project/:id", deleteProject);

router.put("/sortedProjects", sortedProjects);

router.get("/get-users", getUsers);

router.get("/get-user/:id", getUser);

router.post("/create-user", createUser);

router.put("/update-user/:id", updateUser);

router.delete("/delete-user/:id", deleteUsers);

router.post("/sendMail", async (req, res, next) => {
  const image = decodeURIComponent(
    "https://files.pumble.com/671023af6df3d459c1245360/671023af6df3d459c1245361/673f3d83b0ecb155af370896/673f3d83b0ecb155af370895/MUVKMRlJ-black%5Flogo.png"
  );
  try {
    const { firstName, lastName, email, message } = req.body;
    // console.log({ name, email, phone, rooms, state, message });
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "marwanmamdouh159@gmail.com",
        pass: "casa yloo prts fdds",
      },
    });
    const mailOption = {
      from: {
        name: `Younes Film`,
        address: `${email}`,
      },
      // to: ["ibrahimyounes646@gmail.com", "marwanmamdouh159@gmail.com"],
      to: "marwanmamdouh159@gmail.com",
      subject: "Younes Film Email",
      text: "You just got a form submission!",
      // html: `<br/><p>You just got a form submission!</p><br/><br/>
      // <b>Form</b><br/>
      // <p>Booking From</p><br/><br/>
      // <b>Site</b><br/>
      // <p>Younes Film</p><br/><br/>
      // <b>Submitted content</b> <br/>
      // <b>First Name: ${firstName}</b><br/>
      // <b>Last Name: ${lastName}</b><br/>
      // <b>Email: ${email}</b><br/>
      // <b>Message: ${message}</b><br/>`,
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f7f7f7; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <!-- Logo and Heading Section -->
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <img src="https://files.pumble.com/671023af6df3d459c1245360/671023af6df3d459c1245361/673f3d83b0ecb155af370896/673f3d83b0ecb155af370895/MUVKMRlJ-black%5Flogo.png" alt="Younes Film Logo" style="max-width: 50px; height: auto; margin-right: 10px;"/>
              <h2 style="color: #000000; font-size: 24px; font-weight: bold; margin: 0; align-items: center;">YOUNESFILM</h2>
            </div>

            <!-- Table -->
            <table style="border-collapse: collapse; width: 100%; margin-top: 20px; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background-color: #000000; color: #fff; text-align: left;">
                  <th style="padding: 15px; border: 1px solid #ddd;">Field</th>
                  <th style="padding: 15px; border: 1px solid #ddd;">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background-color: #ffffff; border-bottom: 1px solid #ddd;">
                  <td style="padding: 15px; border: 1px solid #ddd; background-color: #fff;"><strong style="color: #000000;">First Name</strong></td>
                  <td style="padding: 15px; border: 1px solid #ddd; background-color: #fff;">${firstName}</td>
                </tr>
                <tr style="background-color: #d3d3d3; border-bottom: 1px solid #ddd;">
                  <td style="padding: 15px; border: 1px solid #ddd; background-color: #d3d3d3;"><strong style="color: #000000;">Last Name</strong></td>
                  <td style="padding: 15px; border: 1px solid #ddd; background-color: #d3d3d3;">${lastName}</td>
                </tr>
                <tr style="background-color: #ffffff; border-bottom: 1px solid #ddd;">
                  <td style="padding: 15px; border: 1px solid #ddd; background-color: #fff;"><strong style="color: #000000;">Email</strong></td>
                  <td style="padding: 15px; border: 1px solid #ddd; background-color: #fff;">${email}</td>
                </tr>
                <tr style="background-color: #d3d3d3; border-bottom: 1px solid #ddd;">
                  <td style="padding: 15px; border: 1px solid #ddd; background-color: #d3d3d3;"><strong style="color: #000000;">Message</strong></td>
                  <td style="padding: 15px; border: 1px solid #ddd; background-color: #d3d3d3;">${message}</td>
                </tr>
              </tbody>
            </table>
            
            <!-- Footer -->
            <p style="margin-top: 20px; font-size: 0.9em; text-align: center; color: #555;">This email was sent from the <strong style='color:#ff0050'>Younes Film</strong> website.</p>
          </div>`,
    };
    await transport.sendMail(mailOption);
    console.log("done");
    return res.status(200).json({ message: "Done Send mail" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
});

export default router;
