document.addEventListener('DOMContentLoaded', function() {

    var swiper = new Swiper(".swiper", {
        effect: "cards",
        cardsEffect: {
          perSlideOffset: 5,
          perSlideRotate: 3,
        },
        grabCursor: true,
        speed: 700,
        initialSlide: 1,
      });

    //TOGGLE MENU NAV VIA ADDING/REMOVING A DATA ATTRIBUTE
    const menubutton = document.querySelector('.menu-button');
    const menunav = document.querySelector('.toggle-nav');
    menubutton.addEventListener('click', function() {
        if (menunav.getAttribute('data-navstate') === 'open') {
            menunav.setAttribute('data-navstate', 'closed');
        } else {
            menunav.setAttribute('data-navstate', 'open');
        }
    });
    //console.log('JS is ready')   
});

