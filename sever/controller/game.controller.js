import fs from 'fs'

const getAllGame = (req,res)=>{
  let dataGame = JSON.parse(fs.readFileSync("./dev-data/game.json"))
  return res.status(200).json(dataGame)
}
const postNewGame = (req,res)=>{

  let {gameName}=req.body
  try {
  let dataGame = JSON.parse(fs.readFileSync("./dev-data/game.json"))
  let newGame = {gameID:Math.floor(Math.random() * 1000000000), gameName,round:[]}
  dataGame.push(newGame)
  fs.writeFileSync("./dev-data/game.json",JSON.stringify(dataGame))
  return res.status(200).json("success")
  } catch (error) {
    return res.status(400).json(error)
  }
}

const detailGame=(req,res)=>{
  let {id}=req.params
  try {
    let dataGame = JSON.parse(fs.readFileSync("./dev-data/game.json"))
    let data=dataGame.find(item=>item.gameID===+id)
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteGame = (req,res)=>{
  let {gameID} = req.body
  try {
    let dataGame = JSON.parse(fs.readFileSync("./dev-data/game.json"))
  let index=dataGame.findIndex(item=>item.gameID===gameID)
  dataGame.splice(index,1)
  fs.writeFileSync("./dev-data/game.json",JSON.stringify(dataGame))
  return res.status(200).json("del success")
  } catch (error) {
    return res.status(400).json(error)
  }
  
}

export default {getAllGame,postNewGame,detailGame, deleteGame}