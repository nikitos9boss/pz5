function Slide(index, title, background, link ) {
    this.title = title;
    this.background = background;
    this.link = link;
    this.id = index;
 }
 
 const Slider = {
    current: 0,
    slides: [],
    initSlider: function(slides){
        let index = 0;
        for (let slide of slides){
            this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
            index++;
        }
        this.buildSlider();
    },
    buildSlider: function() {

        let sliderHTML = "";
        for(let slide of this.slides) {
            sliderHTML +=
            `<div id='${slide.id}' class='singleSlide'style='background-image:url(${slide.background});'>
                <div class='slideOverlay'>
                    <h2>${slide.title}</h2>
                    <a class='link' href='${slide.link}' target='_blank'>Open hidden link</a>
                </div>
            </div>`;
        }

        for(let i = 0; i < this.slides.length; i++) {
            sliderHTML +=
            `<div class='pagination-${this.slides[i].id}'>
                <button class='btn' onclick='${this.pagination(this.slides[i].id)}'>${this.slides[i].id}</button>
            </div>`;
        }

        document.getElementById("slider").innerHTML = sliderHTML;
        document.getElementById(this.current).style.left = 0;
    },
    prevSlide: function() {
        let next;

        if (this.current === 0 ) {
            next = this.slides.length - 1;
        } else {
            next = this.current - 1;
        }
 
        document.getElementById(next).style.left = "-100%";
        document.getElementById(this.current).style.left = 0;
 
        document.getElementById(next).setAttribute("class", "singleSlide slideInLeft");
        document.getElementById(this.current).setAttribute("class", "singleSlide slideOutRight");
 
        this.current = next;
    },
    nextSlide: function(){
        let next;
        if (this.current === (this.slides.length - 1) ) {
            next = 0;
        } else {
            next = this.current + 1;
        }
 
        document.getElementById(next).style.left = "100%";
        document.getElementById(this.current).style.left = 0;
 
        document.getElementById(next).setAttribute("class", "singleSlide slideInRight");
        document.getElementById(this.current).setAttribute("class", "singleSlide slideOutLeft");
 
        this.current = next;
    },
    pagination: function(index) {
        this.current = index;
    }
} 

// added invent listeners instead of onclick attributes 
const leftControl = document.querySelector('.slider-control-left');
const rightControl = document.querySelector('.slider-control-right');

leftControl.addEventListener('click', () => {
    Slider.prevSlide();
})

rightControl.addEventListener('click', () => {
    Slider.nextSlide();
})

// hide/show slider
const hideContorol = document.querySelector('.hideBtn');
const showControl = document.querySelector('.showBtn');
const slider = document.querySelector('.slider');

hideContorol.addEventListener('click', () => {
    slider.classList.add('hide');
})

showControl.addEventListener('click', () => {
    slider.classList.remove('hide');
})

// slideshow
const slideShowBtn = document.querySelector('.slideShow');

slideShowBtn.addEventListener('click', (event)=>{
            if (event.target.classList.contains('start')){
                event.target.innerHTML = 'Start';
        clearInterval(interval)
    } else {
                event.target.innerHTML = 'Stop';
        interval = setInterval(()=>{
                    Slider.nextSlide();
        },1000)
    }
    event.target.classList.toggle('start')
})