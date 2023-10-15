document.addEventListener('DOMContentLoaded', function () {
    // why me
    const whyMeNav = document.querySelectorAll('.nav__link-why-me');
    const whyMeNavTarget = document.getElementById('why-me');

    //portfolio
    const portfolioNav = document.querySelectorAll('.nav__link-portfolio');
    const portfolioTarget = document.getElementById('portfolio');

    //price
    const priceNav = document.querySelectorAll('.nav__link-price');
    const priceNavTarget = document.getElementById('price-services');

    // questions
    const questionNav = document.querySelectorAll('.nav__link-questions');
    const questionNavTarget = document.getElementById('questions');

    // start work
    const startWorkNav = document.querySelectorAll('.nav__link-contacts');
    const startWorkNavTarget = document.getElementById('start-work');

    let yOffset;

    const scrollToSection = (nav, navTarget, margin1, margin2) => {
        nav.forEach((nav) => {
            nav.addEventListener('click', function (e) {
                e.preventDefault();
                if (window.innerWidth < 1190) {
                    yOffset = margin1;
                }
                if (window.innerWidth >= 1190) {
                    yOffset = margin2;
                }
                let sectionTargetPosition =
                    navTarget.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;

                window.scrollTo({
                    top: sectionTargetPosition,
                    behavior: 'smooth',
                });
            });
        });
    };

    const callOfAllFunctionsNav = () => {
        // scroll why me
        scrollToSection(whyMeNav, whyMeNavTarget, 15, 20);

        // scroll portfolio
        scrollToSection(portfolioNav, portfolioTarget, -90, -50);

        // scroll price
        scrollToSection(priceNav, priceNavTarget, 45, 45);

        // scroll question
        scrollToSection(questionNav, questionNavTarget, 145, 145);

        // scroll start work
        scrollToSection(startWorkNav, startWorkNavTarget, -43, -40);
    };

    window.addEventListener('load', callOfAllFunctionsNav);
    window.addEventListener('resize', callOfAllFunctionsNav);
});
