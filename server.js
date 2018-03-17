var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const PORT = 8080;
let buzzWords = [];

app.use(
  express.static("/public", next => {
    next();
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) =>
  res.sendFile("public/index.html", { root: __dirname })
);

app.get("/buzzwords", (req, res) => {
  res.json(buzzWords); //return buzzWords obj as JSON
  res.append("success", "true"); //setting header status
  res.end();
});

app.post("/buzzwords", (req, res) => {
  let newWord = req.body;
  //   for (var i = 0; i < buzzWords.length; i++) {
  //     //if buzzWord already exists in array, overwite
  //     if (buzzWords[i].buzzWord === newWord.buzzWord) {
  //       buzzWords[i].buzzWord = newWord.buzzWord;
  //       buzzWords[i].points = newWord.points;
  //       res.end();
  //       return buzzWords;
  //     }
  //   }
  if (buzzWords.length > 5) {
    //err if more than 5 objects
    res.append("success", "false").end();
  } else {
    buzzWords.push({
      buzzWord: newWord.buzzWord,
      points: newWord.points
    });
    res.end();
    console.log(buzzWords);
    return buzzWords;
  }
});

app.put("/buzzwords", (req, res) => {
  let putWord = req.body;

  for (var i = 0; i <= buzzWords.length; i++) {
    //iterating to find matching key
    if (buzzWords[i].buzzWord === putWord.buzzWord) {
      //   res.send("success: true");
      buzzWords[i].points = Number(putWord.points);
      console.log(buzzWords);

      res.end();
      return buzzWords;
    } else {
      //   res.send({"success: false"});
      res.end();
    }
  }
});

app.delete("/buzzwords", (req, res) => {
  let deletedWord = req.body;

  for (var i = 0; i <= buzzWords.length; i++) {
    if (buzzWords[i].buzzWord === deletedWord.buzzWord) {
      buzzWords.splice(i, 1);
      console.log(buzzWords);
      res.end();
      return buzzWords;
    }
  }
});

app.post("/reset", (req, res) => {
  buzzWords = [];
  res.end();
  return buzzWords;
});
app.post("/heard", (req, res) => {
  let heardWord = req.body;
  for (var i = 0; i <= buzzWords.length; i++) {
    if ((buzzWords[i].buzzWord = heardWord.buzzWord)) {
      //chosen word
      let addScore = Number(buzzWords[i].points);
      console.log(buzzWords);
      if (buzzWords[i].totalScore) {
        //if exists already, update totalScore
        buzzWords[i].totalScore = Number(addScore + buzzWords[i].totalScore);
        res.end();
        console.log(buzzWords);
        return buzzWords;
      } else {
        buzzWords[i].totalScore = addScore;
        res.end();
        console.log(buzzWords);
        return buzzWords;
      }
    }
  }
});
app.listen(PORT, () => console.log("Server listening on port 8080"));
