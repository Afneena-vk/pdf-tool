"use strict";
// const express = require("express");
// const cors = require("cors");
// const pdfRoutes = require("./routes/pdfRoutes");
// const errorHandler= require("./middleware/errorMiddleware");
// const notFound = require("./middleware/notFound");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pdfRoutes_1 = __importDefault(require("./routes/pdfRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/pdf", pdfRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Server is running...");
});
app.use(notFound_1.default);
app.use(errorMiddleware_1.default);
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
