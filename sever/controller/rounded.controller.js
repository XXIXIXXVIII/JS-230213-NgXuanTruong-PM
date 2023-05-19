import fs from "fs";

const getAllUser = (req, res) => {
  const { id } = req.params;
  try {
    let dataRounded = JSON.parse(fs.readFileSync("./dev-data/game.json"));
    let data = dataRounded.find((item) => item.gameID === +id);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postUser = (req, res) => {
  const { id } = req.params;
  const username = req.body;
  try {
    let dataUser = JSON.parse(fs.readFileSync("./dev-data/game.json"));
    let data = dataUser.find((item) => item.gameID === +id);
    data.username = username;
    let index = dataUser.findIndex((item) => item.gameID === data.gameID);
    dataUser[index] = data;
    fs.writeFileSync("./dev-data/game.json", JSON.stringify(dataUser));
    return res.status(200).json("success");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateRound = (req, res) => {
  const { newDataUser } = req.body;
  try {
    let dataGames = JSON.parse(fs.readFileSync("./dev-data/game.json"));
    let index = dataGames.findIndex(
      (item) => item.gameID === +newDataUser.gameID
    );
    dataGames[index] = newDataUser;
    fs.writeFileSync("./dev-data/game.json", JSON.stringify(dataGames));
    return res.status(200).json("success");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteRound = (req, res) => {
  let { indexRow, id } = req.body;
  try {
    let dataGames = JSON.parse(fs.readFileSync("./dev-data/game.json"));
    let index = dataGames.findIndex((item) => item.gameID === +id);
    dataGames[index].round.splice(indexRow, 1);
    fs.writeFileSync("./dev-data/game.json", JSON.stringify(dataGames));
    return res.status(200).json("success");
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default { getAllUser, postUser, updateRound, deleteRound };
