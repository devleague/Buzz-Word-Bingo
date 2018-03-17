var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const PORT = 8080;
let buzzWords = {};

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

  if (Object.keys(buzzWords).length > 10) {
    //err if more than 5 objects
    res.append("success", "false").end();
  } else {
    res.append("success", "true");
    buzzWords.buzzWord = newWord.buzzWord; //adding to object
    buzzWords.points = newWord.points;
    console.log(buzzWords);

    res.end();
    return buzzWords;
  }
});

app.put("/buzzwords", (req, res) => {
  let putWord = req.body;

  for (var i = 0; i <= Object.keys(buzzWords).length; i++) {
    //iterating to find matching key

    if (buzzWords.buzzWord[i] === putWord.buzzWord) {
      res.append("success", "true");
      buzzWords.putWord[i] = putWord.points;
      console.log(buzzWords);

      res.end();
    } else {
      res.append("success", "false").end();
    }
  }
});

app.listen(PORT, () => console.log("Server listening on port 8080"));
