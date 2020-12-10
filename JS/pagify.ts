class pagify {
    time: string
    curve: string
    prev: HTMLElement
    next: HTMLElement
    submit: HTMLElement
    form: HTMLElement
    root: HTMLElement
    noOfPage: number
    posCounter: number
    movePageBy: number
    location: number
    displayAlert: number
    displayMessage: number
    outputMessage: string
    pages: NodeList
    inputs: NodeList
    selects: NodeList
    textAreas: NodeList
    inputEmptyCounter: number
    textAreaEmptyCounter: number
    selectEmptyCounter: number

    constructor() {
        this.prev = (<HTMLElement>document.querySelector('#previous_button'));
        this.next = (<HTMLElement>document.querySelector('#next_button'));
        this.submit = (<HTMLElement>document.querySelector('#submit_button'));
        this.form = (<HTMLElement>document.querySelector('.pageContainer'));
        this.noOfPage = document.getElementsByClassName('page').length;
        //?Sets the value of numOfPage in css variables
        this.root = document.documentElement;
        this.root.style.setProperty('--numOfPages', this.noOfPage.toString());
        //?
        this.posCounter = 0;
        this.movePageBy = (<HTMLElement>document.querySelector('.pageContainer')).offsetWidth;
    }
    //?Voila Magic

    init = ({ time = '0.5s', curve = 'ease' } = {}) => {
        this.time = time;
        this.curve = curve;
        this.root.style.setProperty('--pageTransitionTime', this.time);
        //?
        //?Sets the transition curve (which is an optional parameter) in css variables
        this.root.style.setProperty('--pageTransitionCurve', this.curve);
        //?
        this.prev.addEventListener('click', e => {
            e.preventDefault();
            this.posCounter--;
            if (this.posCounter < 0) {
                this.posCounter = 0;
            }
            else {
                this.pageChange(this.posCounter);
            }
        });

        this.next.addEventListener('click', e => {
            e.preventDefault();
            this.posCounter++;
            if (this.posCounter > this.noOfPage - 1) {
                this.posCounter = this.noOfPage - 1;
            }
            else {
                this.pageChange(this.posCounter);
            }
        });
        this.resize();
    }

    //?The page and button changing mechanism

    //?The wiring

    pageChange = (posCounter: number) => {

        if (posCounter == 0) {
            this.prev.style.display = 'none';
        }
        else {
            this.prev.style.display = 'block';
        }
        if (posCounter == this.noOfPage - 1) {
            this.next.style.display = 'none';
            this.submit.style.display = 'block';
        }
        else {
            this.next.style.display = "block";
            this.submit.style.display = 'none';
        }
        this.location = (posCounter * this.movePageBy / this.noOfPage);
        this.form.style.transform = `translateX(-${this.location}px)`
    }

    //?Pages still change perfectly even if the window size is changed

    //?Don't Change

    resize = () => {
        addEventListener('resize', () => {
            this.movePageBy = (<HTMLElement>document.querySelector('.pageContainer')).offsetWidth;
        })
    }

    //*Extra Functions

    //?Outputs the passed message to the passed pageNumber 

    //?Message can be displayed in form of alert and innerHTML of an element with class ".pagifyMessage"

    display = (displayAlert: number, displayMessage: number, pageNumber: number, message: string) => {
        if (displayAlert === 1) {
            window.alert(message);
        }
        if (displayMessage === 1) {
            if ((<Element>this.pages[pageNumber]).querySelector(":scope .pagifyMessage")) {
                (<Element>this.pages[pageNumber]).querySelector(":scope .pagifyMessage").innerHTML = message
            };
        }
    }

    //?

    //?Removes the transition

    snappy = () => {
        this.time = '0s';
        this.root.style.setProperty('--pageTransitionTime', this.time);
        //?returns the same object so that it can be chained with init()
        return this;
    }

    //?

    //?Checks if any form element is empty or not selected

    inputCheck = ({ displayAlert = 1, displayMessage = 0 } = {}, message = "Please complete the Form") => {

        this.displayAlert = displayAlert;
        this.displayMessage = displayMessage;
        this.outputMessage = message;
        //TODO check for other types of form elements
        //TODO Make the code faster rn it is O(N^2)
        //TODO Along with alert give option of displaying an error message instead ✔✔
        this.submit.addEventListener('click', (e) => {
            e.preventDefault();
            this.inputEmptyCounter = 1;
            this.textAreaEmptyCounter = 1;
            this.selectEmptyCounter = 1;
            //?Selects all the pages
            this.pages = document.querySelectorAll('.page');
            for (let i = 0; i < this.pages.length; i++) {
                //?Loops through all the pages

                //?Finds any input  or textarea and if it is empty returns to that page and alerts an error message

                //*Selects all inputs

                this.inputs = (<Element>this.pages[i]).querySelectorAll(':scope input:not([type="reset"]):not([type="submit"]):not([type="radio"]):not([type="checkbox"])');
                for (let j = 0; j < this.inputs.length; j++) {
                    if ((<HTMLInputElement>this.inputs[j]).value == '') {
                        e.preventDefault();
                        this.posCounter = i;
                        this.pageChange(this.posCounter);
                        this.inputEmptyCounter = 0;
                        this.display(this.displayAlert, this.displayMessage, i, this.outputMessage);
                        return false;
                    }
                }

                //*Selects all TextAreas

                this.textAreas = (<Element>this.pages[i]).querySelectorAll(":scope textarea");
                for (let j = 0; j < this.textAreas.length; j++) {
                    //?Checks if any input on the same page is already identified to be empty
                    if (this.inputEmptyCounter == 0) {
                        return false;
                    }
                    if ((<HTMLTextAreaElement>this.textAreas[j]).value == "") {
                        e.preventDefault();
                        this.posCounter = i;
                        this.pageChange(this.posCounter);
                        this.textAreaEmptyCounter = 0;
                        this.display(this.displayAlert, this.displayMessage, i, this.outputMessage);
                        return false;
                    }
                }

                //*Selects all selectOptions

                this.selects = (<Element>this.pages[i]).querySelectorAll(":scope select");
                for (let j = 0; j < this.selects.length; j++) {
                    if ((<HTMLSelectElement>this.selects[j]).options[(<HTMLSelectElement>this.selects[j]).selectedIndex].text === "Please Select an Option") {
                        if (this.inputEmptyCounter == 0 || this.textAreaEmptyCounter == 0) {
                            return false;
                        }
                        e.preventDefault();
                        this.posCounter = i;
                        this.pageChange(this.posCounter);
                        this.selectEmptyCounter = 0;
                        this.display(this.displayAlert, this.displayMessage, i, this.outputMessage);
                        return false;
                    }
                }

                if (this.inputEmptyCounter == 0 || this.textAreaEmptyCounter == 0 || this.selectEmptyCounter == 0) {
                    return false;
                }
            }
        })
    }

    //?

    //*
}

//?Pass a object with property of time and beizer curve for page transition time and transition curve default value is 0.5s and ease

