import fs from 'fs'

const getAllGame = (req,res)=>{
  let dataGame = JSON.parse(fs.readFileSync("./dev-data/game.json"))
  console.log(dataGame)
  return res.status(200).json(dataGame)
}

const postNewGame = (req,res)=>{
  let {gameName}=req.body
  try {
    let dataGame = JSON.parse(fs.readFileSync("./dev-data/game.json"))
  let newGame = {gameID:Math.floor(Math.random() * 1000000000), gameName}
  dataGame.push(newGame)
  fs.writeFileSync("./dev-data/game.json",JSON.stringify(dataGame))
  return res.status(200).json("success")
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default {getAllGame,postNewGame}