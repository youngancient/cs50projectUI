const form = document.querySelector('.form form');

document.addEventListener("DOMContentLoaded", function () {
  const word = document.querySelector(".word span p");
  const paused = document.querySelectorAll(".paused");
  const rocket = document.querySelector(".rocket");
  const imageDivs = document.querySelectorAll(".img div");
  const buttons = document.querySelectorAll('.alumni button');
  const blur = document.querySelector('.form');
  const offs = document.querySelectorAll('body .off');
  const alumna = document.querySelector('form #alumna');
  const alumnus = document.querySelector('form #alumnus');
  const errors = document.querySelectorAll('.form .error');
  const email = document.querySelector('#email');
  const note = document.querySelector('#note');
  const noteError = document.querySelector('.note .error');
  const emailError = document.querySelector('.email .error');

  let shown = false;
  buttons.forEach((button)=>{
    button.onclick =()=>{
        blur.classList.toggle('view');
        if(!shown){
            form.style.transform = "scale(1)";
            if(button.value === "alumnus"){
              alumna.style.display = "none";
              alumnus.style.display = "block";
            }
            if(button.value === 'alumna'){
              alumnus.style.display = "none";
              alumna.style.display = 'block';
            }
            errors.forEach((them)=>{
              them.style.visibility = 'hidden';
            })
            email.value = "";
            note.value = "";
            shown = true;
        }else{
            form.style.transform = "scale(0.1)";
            shown = false;
        }
    }
  })
  offs.forEach((off)=>{
    off.onclick=()=>{
        if(shown){
            blur.classList.remove('view');
            form.style.transform = "scale(0.1)";
            errors.forEach((them)=>{
              them.style.visibility = 'hidden';
            })
            shown = false;
        }
    }
  })
  email.onkeyup =()=>{
    emailError.style.visibility = 'hidden';
  }
  note.onkeyup =()=>{
    noteError.style.visibility = 'hidden';
  }
  form.addEventListener('submit',(e)=>{
    if(email.value == "" && note.value == ""){
        errors.forEach((them)=>{
            them.style.visibility = "visible";
            e.preventDefault();
        })
    }
    if(email.value == ""){
      emailError.innerHTML = "Email cannot be empty";
      emailError.style.visibility = "visible";
      e.preventDefault();
    }
    if(note.value == ""){
      emailError.innerHTML = "Alumni Note cannot be empty";
      noteError.style.visibility = "visible";
      e.preventDefault();
    }
    if(note.value !== "i took CS50"){
      noteError.innerHTML = "type: 'i took CS50' ";
      noteError.style.visibility = 'visible';
      e.preventDefault();
    }
    if(ValidateEmail(email) == false ){
      emailError.innerHTML = "Invalid Email";
      emailError.style.visibility = "visible";
      e.preventDefault();
    }
  })
  // animateValue();
  animateValue("#enrolled", 200000, 200001, 500);
  setInterval(() => {
    word.innerHTML = " ";
    word.innerHTML = "WAS";
    paused.forEach((ele) => {
      ele.style.animationPlayState = "running";
      setTimeout(() => {
        rocket.style.display = "none";
        imageDivs.forEach((div) => {
          div.style.visibility = "visible";
          imageIn();
        });
      }, 1200);
    });
  }, 5000);
  window.onscroll = ()=>{
    registerAnimation();
  }
});
function imageIn() {
  const images = document.querySelectorAll(".img div img");
  images.forEach((divv, i) => {
    divv.style.transform = "translateY(0%)";
  });
}
function animateValue(id, start, end, duration) {
  if (start === end) return;
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.querySelector(id);
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
const triggerPoint = window.innerHeight/ 5 * 4;
function registerAnimation(){
    const card = document.querySelector('.register .cs');
    const below = document.querySelector('.register .txt');
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerPoint){
        card.style.transform ='translateX(0)';
        below.style.transform ='translateX(0)';
    }
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))
  {
    return (true)
  }
    return (false)
}