'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////
//Button scrolling
const btnScrollTo= document.querySelector('.btn--scroll-to');
const section1= document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function (e){
  const s1coords= section1.getBoundingClientRect();

  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log(window.pageXOffset, window.pageYOffset);

  // window.scrollTo(s1coords.left+ window.pageXOffset, s1coords.top +window.pageYOffset );

  section1.scrollIntoView({behavior:'smooth'})
});


// page navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   })
// })

//Event Delegation
// 1. Add addEventListener in parent elements.Add
// 2.Determine Which element Origanted events
// Bubbling event use for seecting all nav links to use to addevent smooth scroll instead using all nav link one by one we use callback functions 

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  })

  const h1 =document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children)


const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent= document.querySelectorAll('.operations__content');

// tabs.forEach( t=> t.addEventListener('click', () =>
//   console.log('TAB')));

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab') ; //event delegation by cl0osest methods
  console.log(clicked);
  if(!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));


  //activate tab
  clicked.classList.add('operations__tab--active');

// activate content Area 
console.log(clicked.dataset.tab)
document.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add('operations__content--active');
});

// /////////////////menu fade animations/////////////////////////////////

const handleHover= function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings= link.closest('.nav').querySelectorAll('.nav__link');
    const logo= link.closest('.nav').querySelector('img');

  siblings.forEach( el => {
    if(el !== link) el.style.opacity=this;
  })
  logo.style.opacity= this;
  }
}
/////// Passing "argument" into handler
const nav = document.querySelector('.nav')
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));
// ////////////////////////////////////////////////////////////////////////


///////////////Sticky Navigation : Interaction Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal Section 
const allSections= document.querySelectorAll('.section');
const revealSection= function(entries,observer){
  const [entry]= entries;
  console.log(entry)

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver= new IntersectionObserver(revealSection, {
root: null,
threshold: 0.14,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})

//LAZy LOADIng IMAGES

const imgTargets= document.querySelectorAll('img[data-src]');

const loadImg= function(entries, observer){
const [entry]= entries;
console.log(entry);
if(!entry.isIntersecting) return;

/////// REPLACE SRC WITH REAL DATA SRC
entry.target.src= entry.target.dataset.src;

entry.target.addEventListener('load', function (){
  entry.target.classList.remove('lazy-img');
});

observer.unobserve(entry.target);
}

const imgObserver= new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -200px 0px",
})

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();