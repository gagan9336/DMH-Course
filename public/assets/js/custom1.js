
(function () {
    var words = ["Best Digital Marketing Course in Rohtak","Industry Recognized Digital Marketing Course Content","Digital Marketing Course with 100% Job Assistance" ],
    i = 0;
    setInterval(function(){ $('#words').fadeOut(function(){
        $(this).html(words[(i = (i + 1) % words.length)]).fadeIn();
      }); }, 3000)
  })();

// Get the button:
let mybutton = document.getElementById("scroll-up");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// $(document).ready(function() {
//   $("#btnFetch").click(function() {
//     // disable button
//     $(this).prop("disabled", true);
//     // add spinner to button
//     $(this).html(
//       '<i class="fa fa-circle-o-notch fa-spin"></i> loading...'
//     );
//   });
// });