var express = require("express"),
   app = express(),
   {google} = require("googleapis"),
   bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
   aos = require("aos"),
   nodemailer = require("nodemailer"),
   flash = require("connect-flash");

require('dotenv').config();


const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });



// Setting Port
const PORT = process.env.PORT || 2000;

app.use(require("express-session")({
   secret: "ONE AGAIN RUSTY WINS CUTEST DOG",
   resave: false,
   saveUninitialized: false
}));

// setting packages
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(flash());
app.use(express.urlencoded({
   extended: true
}));
app.use(express.static(__dirname + "/public/"));
app.use(methodOverride("_method"));
//adding current user info
app.use((req,res,next)=>{
   res.locals.currentUser=req.user;
   res.locals.success = req.flash("success");
   res.locals.error= req.flash("error");
   next();
})
var slides = [
   "Foundation of Marketing",
   "Conducting Marketing Research",
   "Consumer Behaviour",
   "Search Engine Optimization",
   "Social Media (FB/Insta/YouTube)",
   "Email Marketing",
   "Content Marketing",
   "Mobile Marketing",
   "Blogging",
   "Video or Reels",
   "Google Ads",
   "Social Media Marketing",
   "Google Analytics Tools",
   "Google Search Console Tools",
   "SEO Tools",
   "Website Creation & Planning",
   "WordPress Basics",
   "HTML/CSS Basics",
];

var slideImg = [
   "assets/images/icons/foundation of marketing.png",
   "assets/images/icons/conducting marketing research.png",
   "assets/images/icons/consumer-behavior.png",
   "assets/images/icons/Search Engine Optimization.png",
   "assets/images/icons/social-media.png",
   "assets/images/icons/email marketing.png",
   "assets/images/icons/content marketing.png",
   "assets/images/icons/mobile marketing.png",
   "assets/images/icons/blogging.png",
   "assets/images/icons/reels.png",
   "assets/images/icons/google ads.png",
   "assets/images/icons/social media marketing.png",
   "assets/images/icons/google analytics tool.png",
   "assets/images/icons/google search.png",
   "assets/images/icons/seo tools.png",
   "assets/images/icons/website creation.png",
   "assets/images/icons/wordpress.png",
   "assets/images/icons/coding.png"
]

// getting Home page
app.get("/", (req, res) => {
   res.render("index1", {slides: slides, slideImg: slideImg});
})

app.post("/", (req, res) => {
   var smtpTransport = nodemailer.createTransport({
      // host: "smtp.hostinger.com",
      // port: 465,
      // secure: true,
      service: 'gmail',
      auth: {
         type: 'OAuth2',
         user: process.env.email2,
         pass: process.env.pass2,
         clientId : process.env.CLIENT_ID,
         clientSecret: process.env.CLIENT_SECRET,
         refreshToken: process.env.REFRESH_TOKEN,
         accessToken: process.env.accessToken
      }
   });
   if(req.body.businessName == null) {
      var mailOptions = {
         to: req.body.email,
         from: process.env.email1,
         subject: 'Brochure Course',
         html: '<h3>To Apply Click Here: <buton><a href="https://forms.gle/uQ5ypRJWWVKhPhn69">Apply Now!</a></button></h3>',
         attachments: {
            filename: "Brochure.pdf",
            path: "./attachments/brochure.pdf"
         }
      };
   } else {
      var mailOptions = {
         to: process.env.email1,
         from: process.env.email2,
         subject: 'Mail DMH: ' + req.body.email,
         html: '<h3>Business Name: ' + req.body.businessName + '<br> Full Name: ' + req.body.name + '<br>Email: ' + req.body.email + '<br>Phone Number: ' + req.body.Phone + '<br>Address: ' + req.body.address + '<br>Message: ' + req.body.message + '.</h3>',
      };
   }
   smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
         console.log(err);
         req.flash("error", "It's not you, it's us. Some error had occur. Please try later. If you want to contact us now, Click below button.")
         res.redirect("/");
      } else if(req.body.businessName == null) {
         req.flash("success", "We have sent you the brochure. Hope you will join our course. Want to talk more about this course? Click Below!")
         res.redirect("/");
      } else {
         req.flash("success", "Your form is submitted. Our experts will contact you soon. If you want to contact us now, Click below button.")
         res.redirect("/");
      }
   });
})


// getting privacy-policy page
app.get("/privacy-policy", (req, res) => {
   res.render("privacy-policy");
})

// getting disclaimer page
app.get("/disclaimer", (req, res) => {
   res.render("disclaimer");
})

// getting t&c page
app.get("/t&c", (req, res) => {
   res.render("t&c");
})


// getting sitemap page
app.get("/sitemap.xml", (req, res) => {
   res.sendFile("sitemap.xml", { root: '.' });
})

// getting robots.txt page
app.get("/robots.txt", (req, res) => {
   res.sendFile("robots.txt", { root: '.' });
})

// for error page
app.get("*", (req, res) => {
   res.render("error");
})

// Starting Port
app.listen(PORT, () => {
   console.log(`The Server Started at Port ${PORT}`);
});