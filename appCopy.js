
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/BlogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static("public"));



const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Feugiat nibh sed pulvinar proin gravida. Sit amet commodo nulla facilisi nullam. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Nisi lacus sed viverra tellus in hac habitasse. Purus sit amet luctus venenatis lectus magna fringilla urna. Etiam sit amet nisl purus in. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Tellus orci ac auctor augue. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Fringilla est ullamcorper eget nulla facilisi.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. ";

var posts = [];



app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});


app.get("/compose",function(req, res){

res.render("compose");

});

app.post("/compose",function(req, res){

  let postTitle = req.body.postTitle;
  let postBody = req.body.postBody;

  const composedPost = new Post({
    title: postTitle,
    content: postBody
  });

  composedPost.save();


  Post.find({}, function(err, foundPosts){
    if(!err){
      posts = foundPosts;
        res.redirect("/");
    } else{
      console.log("Error while retrieving posts from DB");
    }
  });
});

app.get("/posts/:postName", function(req, res){
  let requiredPost = req.params.postName;

  Post.find({title: requiredPost},function(err, foundPost){
    if(!err){
      res.render("post",{title: foundPost.title , content: foundPost.content});
    } else {
      console.log("Requested post not found");
    }
  });


});



app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});



// const homeStartingContent = new Post({
//   title: "Home1",
//   content: "Feugiat nibh sed pulvinar proin gravida. Sit amet commodo nulla facilisi nullam. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Nisi lacus sed viverra tellus in hac habitasse. Purus sit amet luctus venenatis lectus magna fringilla urna. Etiam sit amet nisl purus in. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Tellus orci ac auctor augue. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Fringilla est ullamcorper eget nulla facilisi."
// });
//
// const aboutContent = new Post({
//   title: "About",
//   content: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
// });
//
// const contactContent = new Post({
//
//   title: "Contact Page",
//   content: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
// });




// Post.insertMany(posts, function(err){
//   if(!err){
//     console.log("Default posts created");
//   } else {
//     console.log("Error in creating default posts");
//   }
// });

// let homeContent = "";
// Post.find({title: "Home1"}, function(err, foundPost){
//   if(!err){
//     homeContent = foundPost;
//   } else {
//     console.log("Error in retrieving home post");
//   }
// });



//


// Post.findOne({title: "About"},function(err, foundPost){
//   if(!err){
//     aboutPage = foundPost;
//     res.render("about", {aboutContent: aboutPage});
//   }
//
//   else{
//     console.log("Error in retrieving about post");
//   }
// });

//

//
// app.get("/compose", function(req, res){
//   res.render("compose");
// });
//
// app.post("/compose", function(req, res){
//   const post = {
//     title: req.body.postTitle,
//     content: req.body.postBody
//   };
//
//   posts.push(post);
//
//   res.redirect("/");
//
// });
//
// app.get("/posts/:postName", function(req, res){
//   const requestedTitle = _.lowerCase(req.params.postName);
//
//   posts.forEach(function(post){
//     const storedTitle = _.lowerCase(post.title);
//
//     if (storedTitle === requestedTitle) {
//       res.render("post", {
//         title: post.title,
//         content: post.content
//       });
//     }
//   });
//
// });
