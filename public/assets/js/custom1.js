
// ====functionality of showing 3 headings in single line after short duration====
// (function () {
//     var words = ["Best Digital Marketing Course in Rohtak","Industry Recognized Digital Marketing Course Content","Digital Marketing Course with 100% Job Assistance" ],
//     i = 0;
//     setInterval(function(){ $('#words').fadeOut(function(){
//         $(this).html(words[(i = (i + 1) % words.length)]).fadeIn();
//       }); }, 3000)
//   })();


// Gets the video src from the data-src on each button

var $videoSrc = "https://www.youtube.com/embed/QcTv6nGoCM4?si=lSD4NkRvPKPRMMe2";  

console.log($videoSrc+" not shown");

  
  
// when the modal is opened autoplay it  
$('#video').on('shown.bs.modal', function (e) {
    
// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
$("#video1").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
})
  


// stop playing the youtube video when I close the modal
$('#video').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video1").attr('src',$videoSrc); 
}) 
    
    


  
let accordianHead = Array.from(document.querySelectorAll(".accordian_head"));

accordianHead.map((item) =>
  item.addEventListener("click", () => {
    closeAllAccordian(item);
  })
);

function closeAllAccordian(current_target) {
  console.log(current_target);
  accordianHead.map((item) => {
    if (current_target !== item) {
      const accordianBody = item.nextElementSibling;
      const togglerBtn = item.firstElementChild;
      togglerBtn.classList.remove("active");
      accordianBody.classList.remove("active_body");
    } else {
      const accordianBody = current_target.nextElementSibling;
      const togglerBtn = item.firstElementChild;
      togglerBtn.classList.toggle("active");
      accordianBody.classList.toggle("active_body");
    }
  });
}

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