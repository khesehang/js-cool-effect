document.addEventListener('DOMContentLoaded', () => {

    const parallax_el = document.querySelectorAll('.parallax')
    const main = document.querySelector("main")

    let xValue = 0,
        yValue = 0;

    let rotateDegree = 0;

    function update(cursorPosition) {
        parallax_el.forEach((el) => {
            let speedX = el.dataset.speedx;
            let speedY = el.dataset.speedy;
            let speedZ = el.dataset.speedz;
            let rotateSpeed = el.dataset.rotation

            let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
            let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;


            el.style.transform = `translateX(calc(-50% + ${-xValue * speedX}px)) translateY(calc(-50% + ${yValue * speedY}px)) perspective(2300px) translateZ(${zValue * speedZ}px) rotateY(${rotateDegree * rotateSpeed}deg)`;
        })
    }

    update(0)
    window.addEventListener('mousemove', (e) => {

        if (timeline.isActive()) return;

        xValue = e.clientX - window.innerWidth / 2;
        yValue = e.clientY - window.innerHeight / 2;

        rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

        update(e.clientX)

        // console.log(xValue, yValue)
    })

    if(window.innerWidth >= 725) {
        console.log('hello')
        main.style.maxHeight = `${window.innerWidth * 0.6}px`
    } else {
        console.log('woeld hello')
        main.style.maxHeight = `${window.innerWidth * 1.6}px`
    }

    // GSAP Animation

    let timeline = gsap.timeline();

    // console.log(parallax_el)
    // Array.from(parallax_el)
    //     .filter((el) => !el.classList.contains("text"))
    //     .forEach((el) => {
    //         console.log(el,el.offsetHeight,`${el.offsetHeight / 2 + +parseFloat(el.dataset.distance)}px`)
    //         timeline.from(
    //             el,
    //             {
    //                 top: `${el.offsetHeight / 2 + +parseFloat(el.dataset.distance)}px`,
    //                 duration: 1,
    //             },
    //             "1"
    //         )
    //     })

    timeline.from(
        '.text h1',
        {
            y: window.innerHeight - document.querySelector('.text h1').getBoundingClientRect().top + 200,
            duration: 2,
        },
        "2"
    ).from('.text h2', {
        y: -150,
        opacity: 0,
        duration: 1.5,
    }, '3')
        .from('.hide', {
            opacity: 0,
            duration: 1.5,
        }, "3")

})