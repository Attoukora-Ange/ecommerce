const images = document.querySelectorAll('.menu_midlle img');
let etape = 0;
const nbre_image = images.length;


function enleveImage(){
    for (let i = 0; i < nbre_image; i++) {
        images[i].classList.remove('opacite')
    }
}

function suivante(){
    etape++;
    if (etape >= nbre_image) {
        etape = 0
    }
    enleveImage();
    images[etape].classList.add('opacite');
}

setInterval(suivante, 5000)
