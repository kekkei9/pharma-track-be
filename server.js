import Express from "express";
import staffRouter from "./src/staff/routes.js";
import appointmentRouter from "./src/appointment/routes.js";
import clinicRouter from "./src/clinic/routes.js";
import prescriptionRouter from "./src/prescription/routes.js";
import doctortimeRouter from "./src/doctortime/routes.js";
import paymentRouter from "./src/payment.js";
import cors from "cors";

const App = Express();

App.use(Express.text());
App.use(cors());

App.get("/", (req, res) => {
  res.send("placeholder");
});

App.use("/api/v1/staff", staffRouter);

App.use("/api/v1/appointment", appointmentRouter);

App.use("/api/v1/clinic", clinicRouter);

App.use("/api/v1/prescription", prescriptionRouter);

App.use("/api/v1/doctortime", doctortimeRouter);

App.use("/api/v1/payment", paymentRouter);

App.listen(3000, () => console.log(`App is listening on 3000`));
