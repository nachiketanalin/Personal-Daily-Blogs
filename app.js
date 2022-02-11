//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hi all! Welcome to my personal blog website where I write about my daily activitites. Hope you like these too. In the day and age of video vlogs, here is a little orthodox approach to present my ideas to you people. Hope you like it!";
const aboutContent = "I am a 3rd year undergraduate at R V College of Engineering. My course is Information Science and Engineering. I hail from Patna, Bihar. I have a keen interest in data structures and algorithms. I love solving problems and have done over 500 spread across various competitive platforms. I love to code. Web development is one of my keen interests. I enjoy doing it. I am a full stack developer and this website is a product of that. My academic achievements include qualifying into round 1 of Facebook Hacker Cup and also a certified intermediate leve coder on Hackerrank. My hobbies include playing cricket, watching live sports and singing. I am also a trained guitarist!";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  
  title : String, 
  content : String,

}

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){

  Post.find({}, function(err, posts){

      res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  })
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  // posts.push(post);
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postID", function(req, res){

  const requestedID = req.params.postID;

  Post.findOne({_id: requestedID}, function(err, post){

    res.render("post", {
    
      title: post.title,
      content: post.content
    
    });
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
