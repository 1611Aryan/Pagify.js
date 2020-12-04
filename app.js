const $ = (element) => {
    return document.querySelector(element);
};
const prev = $('#previous_button');
const next = $('#next_button');
const submit = $('#submit_button');
const form = $('#pageContainer');
const noOfPage = document.getElementsByClassName('page').length;
let posCounter = 0;
const movePageBy = $('.pageContainer').offsetWidth;
const pageChange = (posCounter) => {
    if (posCounter == 0) {
        prev.style.display = 'none';
    }
    else {
        prev.style.display = 'block';
    }
    if (posCounter == noOfPage - 1) {
        next.style.display = "none";
        submit.style.display = 'block';
    }
    else {
        next.style.display = "block";
        submit.style.display = 'none';
    }
    let location = (posCounter * movePageBy / noOfPage);
    form.style.transform = `translateX(-${location}px)`;
};
prev.addEventListener('click', e => {
    e.preventDefault();
    posCounter--;
    if (posCounter < 0) {
        posCounter = 0;
    }
    else {
        pageChange(posCounter);
    }
});
next.addEventListener('click', e => {
    e.preventDefault();
    posCounter++;
    let location = (posCounter * movePageBy / noOfPage);
    if (posCounter > noOfPage - 1) {
        posCounter = noOfPage - 1;
    }
    else {
        pageChange(posCounter);
    }
});
