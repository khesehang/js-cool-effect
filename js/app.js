const parallax_el = document.querySelectorAll('.parallax')

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
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX)

    console.log(xValue, yValue)
})
