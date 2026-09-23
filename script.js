function toggleMobileMenu(){
  document.getElementById('hamburgerBtn').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu(){
  document.getElementById('hamburgerBtn').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

// TOUCH HOVER FEEL
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.btn, .cta-pill, .gather-row, .loc-card, .media-item').forEach(function(el){
    el.addEventListener('touchstart', function(){ el.classList.add('touch-active'); }, {passive:true});
    el.addEventListener('touchend', function(){ setTimeout(function(){ el.classList.remove('touch-active'); }, 150); }, {passive:true});
  });
});

// GIVING MODAL
function showGivingModal(e){
  e.preventDefault();
  document.getElementById('givingModal').classList.add('open');
  return false;
}
function closeGivingModal(){
  document.getElementById('givingModal').classList.remove('open');
}

// FIRST TIMER MODAL + FORM SUBMIT
function showFirstTimerModal(e){
  e.preventDefault();
  document.getElementById('firstTimerModal').classList.add('open');
  return false;
}
function closeFirstTimerModal(){
  document.getElementById('firstTimerModal').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function(){
  var gm = document.getElementById('givingModal');
  if(gm){
    gm.addEventListener('click', function(e){ if(e.target === this){ closeGivingModal(); } });
  }
  var ftm = document.getElementById('firstTimerModal');
  if(ftm){
    ftm.addEventListener('click', function(e){ if(e.target === this){ closeFirstTimerModal(); } });
  }
  var form = document.getElementById('firstTimerForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const v = id => (document.getElementById(id)||{}).value || '-';
      const radio = name => (document.querySelector(`input[name="${name}"]:checked`)||{}).value || '-';
      const body = [
        'FIRST TIMERS MINISTRY - BLW RIVCOH',
        '',
        'Name: ' + v('ft_name'),
        'Phone: ' + v('ft_phone'),
        'Gender: ' + v('ft_gender'),
        'Birthday: ' + v('ft_birthday'),
        'Faculty: ' + v('ft_faculty'),
        'Department: ' + v('ft_dept'),
        'Level: ' + v('ft_level'),
        'Address: ' + v('ft_address'),
        'Occupation: ' + v('ft_occupation'),
        'Born again: ' + v('ft_bornagain') + ' (when: ' + v('ft_bornagain_when') + ')',
        'Invited by: ' + v('ft_invitedby'),
        'Preferred visit day: ' + v('ft_visitday'),
        'Wants to be a member: ' + radio('ft_member'),
        'Attended Foundation School: ' + radio('ft_fs_attended'),
        'Wants to attend Foundation School: ' + radio('ft_fs_wants'),
        'How was the service: ' + v('ft_feedback')
      ].join('\n');
      const subject = 'First Timer Card - ' + v('ft_name');
      window.location.href = 'mailto:blwrivcoh@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
});

// CAROUSEL — autorotate + dots + manual arrows/swipe
document.addEventListener('DOMContentLoaded', function(){
  const track = document.getElementById('carouselTrack');
  if(!track) return;
  const slides = track.children.length;
  const dotsWrap = document.getElementById('carouselDots');
  let index = 0;
  let timer;

  for(let i=0;i<slides;i++){
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i===0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.children;

  function update(){
    track.style.transform = `translateX(-${index * 100}%)`;
    for(let i=0;i<dots.length;i++){
      dots[i].classList.toggle('active', i===index);
    }
  }
  function goTo(i){
    index = (i + slides) % slides;
    update();
    resetTimer();
  }
  function next(){ goTo(index+1); }
  function prev(){ goTo(index-1); }
  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }

  document.getElementById('carouselNext').addEventListener('click', next);
  document.getElementById('carouselPrev').addEventListener('click', prev);

  // touch swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if(dx > 40) prev();
    else if(dx < -40) next();
  }, {passive:true});

  resetTimer();
});
