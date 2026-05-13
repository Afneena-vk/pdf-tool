const express = require("express");
const cors = require("cors");
const pdfRoutes = require("./routes/pdfRoutes");
const errorHandler= require("./middleware/errorMiddleware");
const notFound = require("./middleware/notFound");


const app = express();


app.use(cors());              
app.use(express.json());   

app.use("/api/pdf", pdfRoutes);

app.use(notFound);
app.use(errorHandler);



app.get("/", (req, res) => {
  res.send("Server is running...");
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});