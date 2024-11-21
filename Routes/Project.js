import { Router } from "express";
import nodemailer from "nodemailer";
import {
  addProject,
  deleteImage,
  deleteProject,
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
        name: `Real State`,
        address: `${email}`,
      },
      // to: "ibrahimyounes646@gmail.com",
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
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007BFF;">You just got a form submission!</h2>
        <hr/>
        <p><strong>Form:</strong> Booking From</p>
        <p><strong>Site:</strong> Younes Film</p>
        <hr/>
        <h3 style="color: #007BFF;">Submitted Content:</h3>
        <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>First Name</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${firstName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Last Name</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <hr/>
        <p style="font-size: 0.9em; color: #555;">This email was sent from the <strong>Younes Film</strong> website.</p>
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
