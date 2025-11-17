// 햄버거메뉴
let hamburger = document.querySelector('.hamburger');
let mobileMenu = document.querySelector('.mobileMenu');

    hamburger.addEventListener('click', () => {
            mobileMenu.classList.contains('open') ? mobileMenu.classList.remove('open') : mobileMenu.classList.add('open');
    });

//***********PAGE01*/
//강제스크롤
document.addEventListener("scroll", () => {
    const half = window.innerHeight * 0.5;
    const scrollY = window.scrollY;

    if (!window.__scrolledUp && scrollY > half) {
        window.__scrolledUp = true;

        const target = document.querySelector(".container01").offsetTop;

        smoothScrollTo(target, 500);
    }

    if (scrollY < 50) {
        window.__scrolledUp = false;
    }
});

    // ease-in-out 함수
    function easeInOutQuad(t) {
        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    // 부드럽게
    function smoothScrollTo(targetY, duration = 800) {
        const startY = window.scrollY;
        const diff = targetY - startY;
        let startTime = null;

        function animate(time) {
            if (!startTime) startTime = time;
            const t = (time - startTime) / duration;

            if (t < 1) {
                const eased = easeInOutQuad(t);
                window.scrollTo(0, startY + diff * eased);
                requestAnimationFrame(animate);
            } else {
                window.scrollTo(0, targetY); // 보정
            }
        }

        requestAnimationFrame(animate);
    }

//메인이미지스크롤이벤트
document.addEventListener('DOMContentLoaded', () => {

    let scroll=new IntersectionObserver((item) => {
        item.forEach((el) => {
            if(el.isIntersecting) {
            el.target.classList.add('onMainImg')
            }
        })
    }, {
        root : null,
        rootMargin : '0px 0px 20% 0px',
        threshold : 0.8
    })

    document.querySelectorAll('.mainImg').forEach((item)=>{
        scroll.observe(item)
    })  
});

//***********PAGE02-about*/
//프로필박스
document.querySelectorAll('.flipCard').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.toggle('touch-active');
    });
});

//***********PAGE03-photo*/
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".mainImg").forEach(imgBox => {
        imgBox.addEventListener("click", () => {
            let id = imgBox.dataset.id;  // HTML data-id 속성 값 읽기
            // 클릭한 이미지의 id를 쿼리 파라미터로 전달하며 photo.html로 이동
            window.location.href = `photo.html?img=${id}`;
        });
    });
});

    // 슬라이드에서 사용할 이미지 경로 배열
    let images2 = [
        './image/img01.JPG','./image/img02.JPG','./image/img03.JPG','./image/img04.JPG','./image/img05.JPG',
        './image/img06.JPG','./image/img07.JPG','./image/img08.JPG','./image/img09.JPG','./image/img10.JPG',
        './image/img11.JPG','./image/img12.JPG','./image/img13.JPG','./image/img14.JPG'
    ];

    // 이미지와 연동할 이름 배열
    let names = [
        "Bathed in Light","Wet","Whispers of Autumn","Under the Sky","Walking Into Dreams",
        "Sunset Garden","Trip to The Moon","Zen","Vinyl Theater","Sitting with the Sea",
        "Sunlit Veil","Silent Steps","The Homebound Sprite","Wanderer’s Pause"
    ];

    let mainSlide = document.getElementById('mainSlide'); // 중앙 이미지
    let prevSlide = document.getElementById('prevSlide'); // 이전 이미지
    let nextSlide = document.getElementById('nextSlide'); // 다음 이미지
    let prevName = document.getElementById('prevName');   // 이전 이미지 이름
    let nextName = document.getElementById('nextName');   // 다음 이미지 이름

    // URL 파라미터에서 시작 이미지 번호 추출 (없으면 1번 이미지)
    let params = new URLSearchParams(window.location.search);
    let currentIndex = parseInt(params.get('img') || 1) - 1; // 배열 인덱스용 0부터 시작

    // 이미지와 이름을 화면에 업데이트하는 함수
    function updateSlides() {
        // 이전/다음 이미지 인덱스 계산 (배열 순환)
        let prevIndex = (currentIndex - 1 + images2.length) % images2.length;
        let nextIndex = (currentIndex + 1) % images2.length;

        // 페이드 효과를 위해 중앙 이미지는 잠시 숨기고, 좌우는 반투명
        mainSlide.style.opacity = 0;
        prevSlide.style.opacity = 0.3;
        nextSlide.style.opacity = 0.3;

        setTimeout(() => {
            // 이미지 변경
            prevSlide.src = images2[prevIndex];
            mainSlide.src = images2[currentIndex];
            nextSlide.src = images2[nextIndex];

            // 이름 변경
            prevName.innerText = names[prevIndex];
            nextName.innerText = names[nextIndex];

            // 중앙 이미지를 점점 보이게, 좌우 이미지는 반투명
            mainSlide.style.opacity = 1;
            prevSlide.style.opacity = 0.4;
            nextSlide.style.opacity = 0.4;
        }, 200); // 200ms 후 이미지 전환 (부드러운 페이드)
    }

    // 초기 슬라이드 업데이트
    updateSlides();

    // 이전 이미지 클릭 시
    prevSlide.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images2.length) % images2.length; // 배열 순환
        updateSlides();
    });

    // 다음 이미지 클릭 시
    nextSlide.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images2.length; // 배열 순환
        updateSlides();
    });