import fs from "fs";

const getAllUser = (req, res) => {
  const { id } = req.params;
  let dataRounded = JSON.parse(fs.readFileSync("./dev-data/rounds.json"));
  let data = dataRounded.find((item) => item.gameID === +id);
  return res.status(200).json(data);
};

const postUser = (req, res) => {
  const { id } = req.params;
  const username = req.body;
  try {
    let dataUser = JSON.parse(fs.readFileSync("./dev-data/rounds.json"));
    let data = dataUser.find((item) => item.gameID === +id);
    data.username = username;
    fs.writeFileSync("./dev-data/rounds.json", JSON.stringify(data));
    return res.status(200).json("success");
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default { getAllUser, postUser };
