const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

const startingContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Augue mauris augue neque gravida in fermentum et sollicitudin. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Malesuada fames ac turpis egestas maecenas. Posuere urna nec tincidunt praesent semper. Aliquet eget sit amet tellus. Elit eget gravida cum sociis natoque penatibus et magnis. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Elementum nisi quis eleifend quam. Tincidunt id aliquet risus feugiat in ante metus dictum at. Lacus sed turpis tincidunt id aliquet risus feugiat in ante. Viverra nibh cras pulvinar mattis nunc sed. Enim eu turpis egestas pretium aenean pharetra magna. Mattis nunc sed blandit libero volutpat sed. Ultrices sagittis orci a scelerisque purus.';

const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet dui accumsan sit amet nulla facilisi morbi. Id aliquet lectus proin nibh. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Scelerisque felis imperdiet proin fermentum leo vel. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Proin fermentum leo vel orci porta non pulvinar. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Tincidunt arcu non sodales neque. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis.'

const contactContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Aenean sed adipiscing diam donec adipiscing. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Pretium vulputate sapien nec sagittis. Sed vulputate odio ut enim blandit volutpat maecenas. Viverra aliquet eget sit amet tellus cras adipiscing enim. Quam vulputate dignissim suspendisse in est. A pellentesque sit amet porttitor eget dolor morbi non. Pellentesque massa placerat duis ultricies. Nisl nisi scelerisque eu ultrices vitae. Varius vel pharetra vel turpis nunc eget lorem.';

const posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('home', {startingContent: startingContent, posts: posts});
});

app.get('/compose', function(req, res){
  res.render('compose');
});

app.post('/compose', function(req, res){
  const post = {title: req.body.title, content: req.body.content};
  posts.push(post);
  res.redirect('/');
});

app.get('/contact', function(req, res){
  res.render('contact', {contactContent: contactContent});
});

app.get('/about', function(req, res){
  res.render('about', {aboutContent: aboutContent});
});

app.get('/posts/:postName', function(req, res){
  const req_title = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    if (_.lowerCase(post.title) === req_title){
      res.render('post', {title: post.title, content: post.content});
    }
  });
});


app.listen(3000, function(req, res){
  console.log('Port 3000 is listening.');
});
