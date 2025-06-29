// Fondo de estrellas animadas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
canvas.width = w;
canvas.height = h;
let stars = [];
for(let i=0;i<120;i++){
  stars.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*1.2+0.2, o:Math.random()*0.5+0.3});
}
function drawStars(){
  ctx.clearRect(0,0,w,h);
  for(let s of stars){
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,2*Math.PI);
    ctx.fillStyle = `rgba(200,200,255,${s.o})`;
    ctx.shadowColor = '#4e5bff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}
function animateStars(){
  for(let s of stars){
    s.x += 0.02*(s.r+0.2);
    if(s.x>w) s.x=0;
  }
  drawStars();
  requestAnimationFrame(animateStars);
}
window.addEventListener('resize',()=>{
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w; canvas.height = h;
});
animateStars();

// Lógica de acceso
const passwordInput = document.getElementById('password');
const unlockBtn = document.getElementById('unlock');
const entrarContainer = document.getElementById('entrar-container');
const errorMsg = document.getElementById('error-msg');
let unlocked = false;

function showEntrarButton(){
  if(document.getElementById('entrar')) return;
  const btn = document.createElement('button');
  btn.id = 'entrar';
  btn.textContent = 'Entrar';
  btn.className = '';
  btn.onclick = ()=>{
    gsap.to('.center-box', {opacity:0, y:-40, duration:0.7, ease:'power2.in', onComplete:()=>{
      window.location.href = 'https://rojitomalito.github.io/dentroeffect/';
    }});
  };
  entrarContainer.appendChild(btn);
  gsap.fromTo(btn, {opacity:0, filter:'blur(8px)'}, {opacity:1, filter:'blur(0px)', duration:1, delay:0.1, onStart:()=>{
    btn.classList.add('visible');
  }});
}

function hideError(){
  errorMsg.style.opacity = 0;
  errorMsg.textContent = '';
}

function showError(msg){
  errorMsg.textContent = msg;
  errorMsg.style.opacity = 1;
  gsap.fromTo(errorMsg, {y:-8}, {y:0, duration:0.5, ease:'elastic.out(1,0.5)'});
}

unlockBtn.addEventListener('click',()=>{
  hideError();
  if(passwordInput.value === '11072023'){
    unlocked = true;
    unlockBtn.disabled = true;
    passwordInput.disabled = true;
    gsap.to(unlockBtn, {opacity:0, y:20, duration:0.5, onComplete:()=>{
      unlockBtn.style.display = 'none';
      showEntrarButton();
    }});
    gsap.to(passwordInput, {boxShadow:'0 0 24px 4px #4e5bff99', duration:0.5});
    Swal.fire({
      title: '¡Portal desbloqueado!',
      text: 'Has accedido al portal oculto.',
      icon: 'success',
      background: '#181a20',
      color: '#eaeaea',
      showConfirmButton: false,
      timer: 1200,
      customClass: {popup:'swal2-dark'}
    });
  }else{
    gsap.fromTo(passwordInput, {x:0}, {x:-12, yoyo:true, repeat:3, duration:0.08, onComplete:()=>{
      gsap.to(passwordInput, {x:0, duration:0.1});
    }});
    showError('Contraseña incorrecta');
    Swal.fire({
      title: 'Error',
      text: 'La contraseña no es válida.',
      icon: 'error',
      background: '#181a20',
      color: '#eaeaea',
      showConfirmButton: false,
      timer: 1200,
      customClass: {popup:'swal2-dark'}
    });
  }
});

passwordInput.addEventListener('keydown', e=>{
  if(e.key==='Enter') unlockBtn.click();
});

passwordInput.addEventListener('input', hideError);