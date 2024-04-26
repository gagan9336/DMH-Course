var express = require("express"),
   app = express(),
   {google} = require("googleapis"),
   bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
   aos = require("aos"),
   nodemailer = require("nodemailer"),
   flash = require("connect-flash");
   // axios = require('axios'),
   // uniqid = require('uniqid'),
   // sha256 = require("sha256"),
   // date = require('date-and-time');

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

// // phonepay testing purpous
// const Phone_Pe_Host_URL = "https://api-preprod.phonepe.com/apis/hermes";
// const Merchant_ID = "PGTESTPAYUAT";
// const Salt_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
// const Salt_INDEX = 1; 

// // phonepay req
// app.get("/pay/:amount", (req, res) => {
//    const amount = req.params.amount;
//    const payEndPoint = "/pg/v1/pay";
//    const merchantTransactionId = uniqid();
//    const userId = 128;

//    const payload = {
//       "merchantId": Merchant_ID,
//       "merchantTransactionId": merchantTransactionId,
//       "merchantUserId": userId,
//       "amount": amount, // in paise
//       "redirectUrl": `http://localhost:2000/redirect-url/${merchantTransactionId}`,
//       "redirectMode": "REDIRECT",
//       // "callbackUrl": `https://course.digitalmediahawk.com/redirect-url/${merchantTransactionId}`,
//       "mobileNumber": "8383862320",
//       "paymentInstrument": {
//         "type": "PAY_PAGE"
//       }
//     }
// // SHA256(base64 encoded payload + “/pg/v1/pay” + salt key) + ### + salt index
//     const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
//     const base64EncodedPayload = bufferObj.toString("base64");

//     const xVerify = sha256(base64EncodedPayload + payEndPoint + Salt_KEY) + "###" + Salt_INDEX;
    

//    const options = {
//    method: 'post',
//    url: `${Phone_Pe_Host_URL}${payEndPoint}`,
//    headers: {
//                accept: 'application/json',
//                'Content-Type': 'application/json',
//                'X-VERIFY': xVerify
//             },
//    data: {
//       request: base64EncodedPayload,
//    }
//    };
//    axios
//    .request(options)
//          .then(function (response) {
//          console.log(response.data);
//          const url = response.data.data.instrumentResponse.redirectInfo.url;
//          res.redirect(url);
//          // res.send(url);
//    })
//    .catch(function (error) {
//       console.error(error);
//    });

// })

// app.get("/redirect-url/:merchantTransactionId", (req, res) => {
//    const { merchantTransactionId } = req.params;
//    console.log('merchantTransactionId', merchantTransactionId);
//    if(merchantTransactionId) {

      
//       // SHA256(“/pg/v1/status/{merchantId}/{merchantTransactionId}” + saltKey) + “###” + saltIndex
//       const xVerify = sha256(`/pg/v1/status/${Merchant_ID}/${merchantTransactionId}` + Salt_KEY) + "###" + Salt_INDEX;
//       console.log("xverify: "+ xVerify);
//       const options = {
//       method: 'get',
//       url: `${Phone_Pe_Host_URL}/pg/v1/status/${Merchant_ID}/${merchantTransactionId}`,
//       headers: {
//             accept: 'application/json',
//             'Content-Type': 'application/json',
//             'X-MERCHANT-ID': merchantTransactionId,
//             'X-VERIFY': xVerify,
//             },
//       };
//       axios
//       .request(options)
//             .then(function (response) {
//             console.log(response.data); 
//             // res.send(response.data);
//             const pattern = date.compile('MMM D, YYYY  hh:mm A');
//             const transaction_date = date.format(new Date(), pattern);
//             const messageRes = response.data.code;
//             const transaction_id = response.data.data.transactionId;
//             const payment_mes = response.data.message;
//             const amount_pay = response.data.data.amount / 100;
//             const pay_type = response.data.data.paymentInstrument.type;
//             res.render("payment_response", {messageRes: messageRes, transaction_id: transaction_id, payment_mes, payment_mes, amount_pay, amount_pay, transaction_date: transaction_date, pay_type:pay_type})
//       })
//       .catch(function (error) {
//          console.error('line 170 error:'+ error);
//       });

//       // res.send({merchantTransactionId});
//    } else {
//       res.send('line 175 error:'+ {error: "Error"})
//    }
// })




// getting Home page
app.get("/", (req, res) => {
   res.render("index1", {slides: slides, slideImg: slideImg});
})

// app.get("/test", (req, res) => {
//    const pattern = date.compile('MMM D, YYYY  hh:mm A');
//    const transaction_date = date.format(new Date(), pattern);
//    console.log(transaction_date);
//    res.render("test", {transaction_date: transaction_date});
// })
// getting Home page
// app.get("/content", (req, res) => {
//    res.render("content");
// })

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
         subject: 'EXECUTIVE PROGRAM IN DIGITAL MARKETING',
         html: '<h3>Dear '+ req.body.name +',</h3><h3>Greetings of the day!!</h3><p>It brings us great joy and pleasure to share in this moment of success with you, as you embark on an exciting journey towards boosting your career prospects through Digital Marketing. You are taking the first step towards becoming a valued member of the prestigious Digital Media Hawks community, and we could not be more thrilled to welcome you.</p><p>As you prepare to take this course, we want to offer our warmest congratulations to you. The attached brochure will provide you with an overview of what is in store for you, and we are confident that the knowledge and skills you will gain from this program will prove to be invaluable in your professional journey.</p><p>On behalf of everyone at Digital Media Hawks, we want to extend our best wishes to you as you set out on this new path. We look forward to working with you and helping you grow and succeed. Congratulations once again!</p><p>For more details, you can contact us between 10AM - 6PM from Monday to Saturday on our whatsapp number: +91 9817853556 or digitalmediahawk@gmail.com</p><p>Regards,<br><span style="font-weight: bold;">Digital Media Hawk</span></p>',
         attachments: {
            filename: "Executive Programme In Digital Marketing.pdf",
            path: "./attachments/Executive Programme In Digital Marketing.pdf"
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
         req.flash("error", "It's not you, it's us 😣. Some error had occur. Please try later 😓. If you want to contact us now 😀, Click below button.")
         res.redirect("/");
      } else if(req.body.businessName == null) {
         res.redirect("/confirmation");
      } else {
         req.flash("success", "Your form is submitted 😀. Our experts will contact you soon 👌. If you want to contact us now, Click below button.")
         res.redirect("/");
      }
   });
})

// getting confirmation page
app.get("/confirmation", (req, res) => {
   res.render("confirmation");
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

// getting t&c page
app.get("/refund-policy", (req, res) => {
   res.render("refund");
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