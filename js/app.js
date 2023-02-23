require('@uswds/uswds');

/* 
  scroll down by 100px on a deep link
  to accommodate for our sticky header
*/
function scrollDownCheck() {
    if (window.location?.hash) {
        window.scrollBy(0, -100);
    }
}

window.onload = scrollDownCheck;
