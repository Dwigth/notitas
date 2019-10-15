import anime from 'animejs';

export class SplashScreen {
    constructor() {
        this.init();
        let loopCompleted = 0;
        const splashAnimation = anime({
            targets: '.wrapper .elem',
            easing: 'linear',
            scale: [
                { value: .1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1200 }
            ],
            delay: anime.stagger(200, { grid: [14, 5], from: 'center' }),
            loop: true,
            loopComplete: function (anim) {
                loopCompleted++;
                if (loopCompleted == 1) {
                    anim.pause();
                    anime({
                        targets: '.wrapper',
                        opacity: '.1',
                        loopComplete(anim: any) {
                            const splashScreen = (<HTMLElement>document.getElementById('splash')).style.zIndex = '0';
                        }
                    })
                }
            }
        });
    }
    private init(): void {
        const w = window.innerWidth,
            h = window.innerHeight,
            splash = document.getElementById('splash'),
            wrapper = document.createElement('div'),
            shadows = document.createElement('div'),
            rows = 15,
            columns = 15;
        //Ej: Ancho 1538 / 10 = 153.8px
        //Ej: Alto 798  / 10 = 79.8px 
        let i,
            boxHeight = h / 15,
            boxWidth = w / 15;

        wrapper.classList.add('wrapper', 'flex', 'flex-wrap')
        for (i = 0; i < rows * columns; i++) {
            const child = document.createElement('div');
            child.classList.add('elem');
            child.style.width = boxWidth + 'px';
            child.style.height = boxHeight + 'px';
            wrapper.appendChild(child);
        }

        if (splash != null)
            splash.appendChild(wrapper);
    }
}