const init = ({ time = '0.5s', curve = 'ease' } = {}) => {
    addEventListener('resize', () => {
        movePageBy = (<HTMLElement>document.querySelector('.pageContainer')).offsetWidth;
    })

    const prev = (<HTMLElement>document.querySelector('#previous_button'));
    const next = (<HTMLElement>document.querySelector('#next_button'));
    const submit = (<HTMLElement>document.querySelector('#submit_button'));
    const form = (<HTMLElement>document.querySelector('#pageContainer'));
    const noOfPage = document.getElementsByClassName('page').length;
    //?Sets the value of numOfPage in css variables
    const root = document.documentElement;
    root.style.setProperty('--numOfPages', noOfPage.toString());
    //?
    //?Sets the transition time (which is an optional parameter) in css variables
    root.style.setProperty('--pageTransitionTime', time);
    //?
    //?Sets the transition curve (which is an optional parameter) in css variables
    root.style.setProperty('--pageTransitionCurve', curve);
    //?
    let posCounter = 0;
    let movePageBy = (<HTMLElement>document.querySelector('.pageContainer')).offsetWidth;

    const pageChange = (posCounter: number) => {
        if (posCounter == 0) {
            prev.style.display = 'none';
        }
        else {
            prev.style.display = 'block';
        }
        if (posCounter == noOfPage - 1) {
            next.style.display = 'none';
            submit.style.display = 'block';
        }
        else {
            next.style.display = "block";
            submit.style.display = 'none';
        }
        let location = (posCounter * movePageBy / noOfPage);
        form.style.transform = `translateX(-${location}px)`
    }

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
        if (posCounter > noOfPage - 1) {
            posCounter = noOfPage - 1;
        }
        else {
            pageChange(posCounter);
        }
    });

}


//?Pass a object with property of time and beizer curve for page transition time and transition curve default value is 0.5s and ease

init();