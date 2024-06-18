import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  try {
    res.status(200).json("OK");
  } catch (error: any) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
