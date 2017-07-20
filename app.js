/* jshint esversion:6*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const json = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: false });
const fail = {success: false};
const success = {success:true};
const heard = {heard: false};
const bigBuzz = [];
let userScore = {score : 0};

app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.get('/', (request, response)=>{
  response.render('index');

});


let buzzwordObject = {
  buzzwords: []
};


app.get('/buzzwords', (request, response)=>{
  response.json(buzzwordObject);
});

app.post('/buzzwords', urlParser, (request, response)=>{
  var pointsNumber = Number(request.body.points);
  console.log(pointsNumber);
   if(!pointsNumber){
    response.send(fail);
  }
  else{
    console.log(buzzwordObject);
    var keith = request.body.buzzword;
    console.log(keith);
    buzzwordObject.buzzwords.push();
     // heard.push(request.body.buzzword);
    response.send(success);

 // console.log(request.body);
}

});
app.put('/buzzwords', (request, response)=>{

});

// app.post('/' ,(request,response)=>{
//   console.log(request.body);
//   response.send('posted');
// });
app.listen(8080, () =>{
  console.log("I am connected");
});