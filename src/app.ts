import bodyParser from "body-parser";
import express from "express";
import controllers from "./contexts/index.context";

const app = express();
const PORT = 5050;
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use("/", controllers);

app.listen(PORT, () => {
  console.log(`서버가 듣는중입니다 포트번호는 ${PORT}`);
});
