
/**
 * SLIDE EFFECT ===
 */

class SlideEffect{

    /**
     * Constructor
     */
    constructor(data) {
        // select dom element
        let select = (param) => {
            // return dom element
            return document.querySelector(`*[${this.prefix}=${param}]`);
        }
        // mobile screen
        this.mobs = 767;
        // key mobile screen
        // 1 - desktop
        // 0 - mobile
        this.key = 1;
        // animation gsap 
        // scroll slide
        this.anim = '';
        // speed
        this.speed = data.speed;
        // prefix
        this.prefix = data.prefix;
        // navigation
        this.nav = data.nav;
        // main block
        this.main = select(data.main);
        // box
        this.box = select(data.box);
        // container slider
        this.contslide = select(data.contslide);
        // slider
        this.slider = select(data.slider);
        // run
        this.run();
    }

    /**
     * Init
     */
    run(){
        // check screen
        this.screen();
        // enable height 
        // main block
        this.mainHe();
        // calc scroll block
        this.scroll();
        // scroll event
        window.addEventListener('scroll', () => {
            this.scroll();
        });
        // resize event
        window.addEventListener('resize', () => {
            this.screen();
            this.mainHe();
            this.scroll();
        });
        // state navigation
        this.navstate();
        // click navigation
        this.navclick();
    }

    /**
     * Main block height
     */
    screen(){
        // mobile screen
        if(innerWidth < this.mobs){
            if( this.key !== 0 ){
                // key mobile
                this.key = 0;
                // reset transform in slider
                gsap.to(this.slider, 0.4, {
                    x: 0,
                });
                // reset height in main block
                this.main.style.height = '';
            }
        }
        // desktop screen
        else{
            if( this.key !== 1 ){
                // key desktop
                this.key = 1;
            }
        }
    }

    /**
     * Main block height
     */
    mainHe(){
        // check screen
        if(this.key == 0) return;
        // reset height
        this.main.style.height = '';
        // height main block
        let height = this.main.getBoundingClientRect().height;
        // add size work space slider
        height += this.sizes();
        // enable speed
        height *= this.speed;
        // enable size value in main block
        this.main.style.height = height + 'px'; 
    }

    /**
     * Scroll
     */
    scroll(){
        // check screen
        if(this.key == 0) return;
        // 
        let 
        // calc cord
        calc = this.rate() * this.sizes() / 100,
        // size cord
        size = calc * -1;
        // move slider
        gsap.to(this.slider, 0.4, {
            x: size,
        });
        // state navigation
        this.navstate();
    }

    /**
     * Rate main block
     * and box block
     */
    rate(){
        let 
        // main block height
        mainHeight = this.main.getBoundingClientRect().height,
        // box block height
        boxHeight = this.box.getBoundingClientRect().height,
        // main block coordinates bottom
        mainBottom = this.main.getBoundingClientRect().bottom,
        // box block coordinates bottom
        boxBottom = this.box.getBoundingClientRect().bottom,
        // difference cord main block and box block
        height = mainHeight - boxHeight,
        // difference cord main block and box block
        diff = mainBottom - boxBottom,
        // persent scroll block
        rate = diff * 100 / height;
        // rate inverse
        rate = Math.round( 100 - rate );
        // return rate size
        return rate;
    }

    /**
     * Size work 
     * space sldier
     */
    sizes(){
        let
        // container slide block width
        contWidth = this.contslide.getBoundingClientRect().width,
        // slide block width
        sliderWidth = this.slider.getBoundingClientRect().width,
        // difference cord slide block and container slide block
        diff = sliderWidth - contWidth;
        // return rate
        return diff;
    }

    /**
     * Navigation state
     */
    navstate(){
        if(this.nav !== undefined){
            let
            // select dom element
            select = (param) => {
                // return dom element
                return [...document.querySelectorAll(`*[${this.prefix}=${param}]`)];
            },
            // block
            obj = select(this.nav.object),
            // navigation
            nav = select(this.nav.navigation),
            // number
            num = [],
            // name attribute in active element
            name = '';
            // calc cord
            obj.map( obj => {
                // size left block
                let size = obj.getBoundingClientRect().left;
                // add 1/2 width block
                size += obj.getBoundingClientRect().width / 2;
                // minus 1/2 width screen
                size -= this.contslide.getBoundingClientRect().width/2;
                // size only positive values
                if(size < 0){
                    size *= -1;
                }
                // push
                num.push({
                    'size': Math.round( size ),
                    'elem': obj,
                });
            });
            // num sort
            num.sort((a, b) => a.size > b.size ? 1 : -1);
            // name attribute in active element
            name = num[0].elem.getAttribute(this.nav.object);
            // active state
            nav.map( obj => {
                // enable nav element
                if( obj.getAttribute(this.nav.navigation) == name){
                    obj.setAttribute('state', 'enable');
                }
                // disable nav element
                else{
                    obj.setAttribute('state', 'disable');
                }
            });
        }
    }

     /**
     * Navigation click
     */
    navclick(){
        if(this.nav !== undefined){
            let
            // select dom element
            select = (param) => {
                // return dom element
                return [...document.querySelectorAll(`*[${this.prefix}=${param}]`)];
            },
            // object navigation
            obj = select(this.nav.navigation);
            // 
            obj.map( obj => {
                obj.addEventListener('click', nclick.bind(this));
            });

            function nclick(event){
                let 
                // name click attribute element
                name = event.currentTarget.getAttribute(this.nav.navigation),
                // slide
                elem = document.querySelector(`*[${this.prefix}=${this.nav.object}][${this.nav.object}=${name}]`),
                // left slide cord
                left = elem.getBoundingClientRect().left, 
                // left slide cord
                leftb = this.slider.getBoundingClientRect().left - left,
                // main_block
                mainb = this.main.getBoundingClientRect().top + pageYOffset,
                // box_block
                boxb = this.box.getBoundingClientRect().height - innerHeight,
                // final cord
                val = boxb + mainb + leftb * -1;
                // move scroll
                gsap.to( document.querySelector('html'), 0.8, {ease: Power2.easeOut, scrollTop: val} );
            }
        }   
    }
}

new SlideEffect({
    "prefix": "sc1",
    "main": "main",
    "box": "box",
    "contslide": "contslide",
    "slider": "slide",
    "speed": 1
});

new SlideEffect({
    "prefix": "sc2",
    "main": "main",
    "box": "box",
    "contslide": "contslide",
    "slider": "slide",
    "speed": 1,
    "nav": {
        "navigation": "nav",
        "object": "obj"
    }
});

/**
 * === SLIDE EFFECT
 */





/**
 * INDISSOLUBLE SPACE ===
 */

class StringSpace {

    /**
     * Data
     */
    constructor() {
        // ===
        this._ru = ['а', 'без', 'безо', 'в', 'во', 'вне', 'да', 'для', 'до', 'ее', 'еще', 'и', 'или', 'из', 'изо', 'или', 'их', 'за', 'к', 'как', 'ко', 'меж', 'на', 'над', 'не', 'был', 'ни', 'но', 'о', 'об', 'обо', 'от', 'ото', 'по', 'под', 'при', 'про', 'с', 'со', 'то', 'там', 'у', 'уж', 'что', 'я', '🏆', '💬', '📱', '🤳', '❤️', '✌️', '🙈'];
        // ===
        this._elem = [...document.querySelectorAll('H2, H1, H3, H4, H5, H6, p')];
    }

    /**
     * Init
     */
    run() {
        // p dom element
        this._elem.map(obj => {
            this.translate(obj);
        });
    }

    /**
     * Translate
     */
    translate(obj) {
        // ru lang
        this._ru.map(dat => {
            let string = new RegExp(' ' + dat + ' ', 'g');
            obj.innerHTML = obj.innerHTML.replace(string, ` ${dat}&nbsp;`);
        });
    }
}

let sspace = new StringSpace;
sspace.run();

/**
 * === INDISSOLUBLE SPACE
 */


 /**
 * SCROLL TO ===
 */

class ScrollTo{

    /**
     * Constructor
     */
    constructor(data) {
        // point a
        this.pointa = document.querySelector(data.pointa);
        // point b
        this.pointb = document.querySelector(data.pointb);
        // speed
        this.speed = data.speed;
        // run
        this.run();
    }

    /**
     * Run
     */
    run(){
        this.pointa.addEventListener('click', () => {
            // move scroll
            gsap.to( document.querySelector('html'), this.speed, {
                ease: Power2.easeOut, 
                scrollTop: this.pointb.getBoundingClientRect().top + pageYOffset
            });
        });

        

    }
}

new ScrollTo({
    'pointa': '*[pointa="top"]',
    'pointb': '*[pointb="top"]',
    'speed': 0,
});

new ScrollTo({
    'pointa': '*[pointa="app"]',
    'pointb': '*[pointb="app"]',
    'speed': 2,
});

 /**
 * === SCROLL TO
 */


/**
 * ANIMATE ON SCROLL LIBRARY INIT ===
 */

AOS.init({
    duration: 400,
    easing: 'ease-out-quart',
    once: true,
});

/**
 * === ANIMATE ON SCROLL LIBRARY INIT
 */


 /**
 * SLIDERS ===
 */
class Slider {

    /**
     * Constructor
     */
    constructor(data) {
        // init var
        this.slider = '';
        // mobile screen
        this.mobs = 767;
        // key mobile screen
        // 1 - desktop
        // 0 - mobile
        this.key = 1;
        // container
        this.container = data.container;
        // wrapper
        this.wrapper = data.wrapper;
        // slides
        this.slides = data.slides;
        // pagination 
        this.pag = data.pagination;
        // init slider
        if (document.querySelector(this.container) != null) {
            this.init();
        }
    }

    /**
     * Init
     */
    init() {
        // resize event screen
        window.addEventListener('resize', () => {
            this.screen();
        });
        // screen check
        this.screen();
        // pagination
        this.pagination();
    }

    /**
     * Screen init
     */
    screen(){
        // mobile screen
        if(innerWidth < this.mobs){
            if(this.key == 1){
                // key mobile
                this.key = 0;
                // init slider
                this.swiper();
            }
        }
        // desktop screen
        else{
            if(this.key == 0){
                // key mobile
                this.key = 1;
                // remove slider
                this.slider.destroy();
            }
        }
    }

    /**
     * Swiper init
     */
    swiper() {
        // swiper init
        this.slider = new Swiper(this.container, {
            wrapperClass: this.wrapper,
            slideClass: this.slides,
            slidesPerView: "auto",
            on: {
                transitionEnd: (event) => {
                    this.change(event.snapIndex);
                }
            },
        });
        // add attribute 
        // state=enable in first slide
        this.slider.slides[0].setAttribute('state', 'enable');
    }

    /**
     * Pagination
     */
    pagination() {
        // create array
        let pagel = [];
        // parcing data
        this.pag.map(obj => {
            pagel.push([...document.querySelectorAll(obj)]);
        });
        // add data in main
        // pagination array
        this.pag = pagel;
        // init pagination event
        // and number attribute
        this.pag.map(obj => {
            obj.map((el, index) => {
                // add default state
                if (index == 0) {
                    el.setAttribute('state', 'enable');
                }
                // add number index
                el.setAttribute('num', index);
                // add event
                el.addEventListener('click', move.bind(this));
            });
        });
        // Move slider
        // when click pagination
        function move(event) {
            // click pagination element
            let result = event.currentTarget;
            // number attribute element
            result = result.getAttribute('num');
            // move slide
            this.change(result);
        }
    }

    /**
     * Change slide
     */
    change(num) {
        // active slide state enable 
        this.slider.slides.map((obj, index) => {
            if (index == num) {
                obj.setAttribute('state', 'enable');
            } else {
                obj.setAttribute('state', 'disable');
            }
        });
        // change state 
        // pagination element
        this.pag.map(obj => {
            obj.map(el => {
                // state disable
                if (el.getAttribute('num') != num) {
                    el.setAttribute('state', 'disable');
                }
                // state enable
                else {
                    el.setAttribute('state', 'enable');
                }
            });
        });
        // slider move
        this.slider.slideTo(num);
    }
}


new Slider({
    'container': '.chan__slide[slide_wrap="1"]',
    'wrapper': 'chan__slide_cont[slide_cont="1"]',
    'slides': 'chan__itm',
    'pagination': ['.slide_nav_itm[slide_nav="1"]'],
});

new Slider({
    'container': '.app__slide_wrap[slide_wrap="2"]',
    'wrapper': 'app__slide_conts[slide_cont="2"]',
    'slides': 'app__itm[slide_itm="2"]',
    'pagination': ['.slide_nav_itm[slide_nav="2"]'],
});

new Slider({
    'container': '.app__slide_wrap[slide_wrap="3"]',
    'wrapper': 'app__slide_conts[slide_cont="3"]',
    'slides': 'app__itm[slide_itm="3"]',
    'pagination': ['.slide_nav_itm[slide_nav="3"]'],
});

new Slider({
    'container': '.app__slide_wrap[slide_wrap="4"]',
    'wrapper': 'app__slide_conts[slide_cont="4"]',
    'slides': 'app__itm[slide_itm="4"]',
    'pagination': ['.slide_nav_itm[slide_nav="4"]'],
});

new Slider({
    'container': '.app__slide_wrap[slide_wrap="5"]',
    'wrapper': 'app__slide_conts[slide_cont="5"]',
    'slides': 'app__itm[slide_itm="5"]',
    'pagination': ['.slide_nav_itm[slide_nav="5"]'],
});


/**
 * === SLIDERS
 */