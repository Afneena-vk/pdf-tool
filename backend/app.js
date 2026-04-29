const express = require("express");
const cors = require("cors");
const pdfRoutes = require("./routes/pdfRoutes");


const app = express();


app.use(cors());              
app.use(express.json());   

app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});