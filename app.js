//jshint esversion: 6
const express =require("express");
const app = express();
const bodyParser =require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/" ,function(req ,res){
  res.sendFile(__dirname + "/signup.html");

});
app.post("/" ,function(request ,response){
  const email = request.body.email;
  const firstName = request.body.first_name;
  const lastName = request.body.last_name;

   const data ={
     members: [
       {
         email_address:email,
         status:"subcribed",
         merge_fields: {
           FNAME:firstName,
           LNAME:lastName
         }
       }
     ]
   };

const jsonData = JSON.stringify(data);
const url ="https://us2.api.mailchimp.com/3.0/lists/d805399dfd";
const options ={
  method:"POST",
  auth: "mohan:c7204f751ccfbdaba04139e63625f65a-us2"
}
const req = https.request(url, options, function(response){
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
req.write(jsonData);
req.end();
});

app.listen(3000 ,function(){
  console.log("server running on 3000");
});

// c7204f751ccfbdaba04139e63625f65a-us2
// list id d805399dfd
