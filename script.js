// Navbar: transparent on top, solid after scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 60);
onScroll(); addEventListener('scroll', onScroll);
// Mobile menu
const burger = document.querySelector('.burger'), menu = document.querySelector('.menu');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o) });
// Hero slider
const slides = document.querySelectorAll('.slide');
if (slides.length) {
   const dots = document.querySelector('.dots'); let i = 0, t;
   slides.forEach((_, n) => { const b = document.createElement('button'); b.ariaLabel = 'Slide ' + (n + 1); b.onclick = () => go(n); dots.appendChild(b) });
   function go(n) {
      i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('on', k === i));
      dots.querySelectorAll('button').forEach((b, k) => b.classList.toggle('on', k === i)); clearInterval(t); t = setInterval(() => go(i + 1), 5000)
   }
   document.querySelector('.prev').onclick = () => go(i - 1);
   document.querySelector('.next').onclick = () => go(i + 1);
   go(0);
}

// Product picker
const picker = document.getElementById('picker');
if (picker) {
   const D = {
      two: [
         { n: 'Voltra FH Pro', img: 'bike.webp', r: '80-100 km', s: '25 km/h', a: '10.4 sec', p: '₹60,000', c: [['Pearl', '#e5e7e8'], ['Blue', '#2457F5'], ['Red', '#c8321f'], ['Graphite', '#3c4144'], ['Black', '#111']] },
         { n: 'Voltra Metro', img: 'cycle.webp', r: '60 km', s: '55 km/h', a: '5.0 sec', p: '₹48,000', c: [['White', '#e5e7e8'], ['Teal', '#1aa37a'], ['Black', '#111']] },
         { n: 'Voltra Max', img: 'scoter.webp', r: '110 km', s: '75 km/h', a: '4.1 sec', p: '₹82,000', c: [['Silver', '#b8bec2'], ['Blue', '#2457F5'], ['Black', '#111']] },
         { n: 'Voltra Rush', img: 'cycle.webp', r: '120 km', s: '95 km/h', a: '3.0 sec', p: '₹1,10,000', c: [['Blue', '#2457F5'], ['Red', '#c8321f'], ['Black', '#111']] }
      ],
      three: [
         { n: 'Voltra Rickshaw', img: 'three.webp', r: '110 km', s: '25 km/h', a: '6.5 sec', p: '₹1,20,000', c: [['Yellow', '#e8b923'], ['Green', '#1aa37a'], ['Blue', '#2457F5']] },
         { n: 'Voltra Cargo 3W', img: 'three.webp', r: '100 km', s: '45 km/h', a: '6.0 sec', p: '₹1,35,000', c: [['White', '#e5e7e8'], ['Blue', '#2457F5']] }
      ]
   };
   let set = 'two', idx = 0;
   const $ = s => picker.querySelector(s);
   function render() {
      const p = D[set][idx];
      $('.pname').textContent = p.n;
      const img = $('.stage-img img'); img.style.opacity = 1; img.alt = p.n; img.src = 'images/' + p.img;
      $('.miss').hidden = true;
      $('#pr').textContent = p.r; $('#ps').textContent = p.s; $('#pa').textContent = p.a; $('#pp').textContent = p.p;
      const col = $('.colors'); col.innerHTML = '<span>Available colours</span>';
      p.c.forEach((c, k) => {
         const b = document.createElement('button'); b.style.background = c[1]; b.title = c[0]; b.ariaLabel = c[0];
         b.onclick = () => { col.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); $('.stage-img').style.setProperty('--tint', c[1]) };
         if (!k) { b.classList.add('on'); $('.stage-img').style.setProperty('--tint', c[1]) } col.appendChild(b)
      });
      const bars = $('.bars'); bars.innerHTML = '';
      D[set].forEach((_, k) => { const b = document.createElement('button'); b.ariaLabel = 'Model ' + (k + 1); b.className = k === idx ? 'on' : ''; b.onclick = () => { idx = k; render() }; bars.appendChild(b) });
   }
   $('.stage-img img').onerror = function () { this.style.opacity = 0; $('.miss').hidden = false; $('.miss').textContent = 'Add ' + this.getAttribute('src') };
   $('#pprev').onclick = () => { idx = (idx - 1 + D[set].length) % D[set].length; render() };
   $('#pnext').onclick = () => { idx = (idx + 1) % D[set].length; render() };
   picker.querySelectorAll('.tabs button').forEach(b => b.onclick = () => {
      set = b.dataset.set; idx = 0;
      picker.querySelectorAll('.tabs button').forEach(x => x.classList.toggle('on', x === b)); render()
   });
   render();
}
