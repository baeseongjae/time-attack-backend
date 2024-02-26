import express from "express";

const app = express();
const PORT = 5050;

app.listen(PORT, () => {
  console.log(`서버가 듣는중입니다 포트번호는 ${PORT}`);
});
