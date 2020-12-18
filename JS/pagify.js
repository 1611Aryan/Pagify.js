class pagify {
    constructor(formClass = '') {
        //?Voila Magic
        this.init = ({ time = '0.5s', curve = 'ease' } = {}) => {
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
        };
        //?The page and button changing mechanism
        //?The wiring
        this.pageChange = (posCounter) => {
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
            this.form.style.transform = `translateX(-${this.location}px)`;
        };
        //?Pages still change perfectly even if the window size is changed
        //?Don't Change
        this.resize = () => {
            addEventListener('resize', () => {
                this.movePageBy = document.querySelector(`${this.formClass} .pageContainer`).offsetWidth;
            });
        };
        //*Extra Functions
        //?Outputs the passed message to the passed pageNumber 
        //?Message can be displayed in form of alert and innerHTML of an element with class ".pagifyMessage"
        this.display = (displayAlert, displayMessage, pageNumber, message) => {
            if (displayAlert === 1) {
                window.alert(message);
            }
            if (displayMessage === 1) {
                if (this.pages[pageNumber].querySelector(":scope .pagifyMessage")) {
                    this.pages[pageNumber].querySelector(":scope .pagifyMessage").innerHTML = message;
                }
                ;
            }
        };
        //?This function prevents the form from submitting displays the error message and changes the page's location
        this.whateverItTakes = (i) => {
            this.posCounter = i;
            this.pageChange(this.posCounter);
            this.display(this.displayAlert, this.displayMessage, i, this.outputMessage);
        };
        //?Removes the transition
        this.snappy = () => {
            this.time = '0s';
            this.root.style.setProperty('--pageTransitionTime', this.time);
            console.log();
            //?returns the same object so that it can be chained with init()
            //return this;
        };
        //?Checks if any form element is empty or not selected
        this.inputCheck = ({ displayAlert = 1, displayMessage = 0 } = {}, message = "Please complete the Form") => {
            this.displayAlert = displayAlert;
            this.displayMessage = displayMessage;
            this.outputMessage = message;
            //TODO check for other types of form elements
            //TODO Make the code faster rn it is O(N^2)
            //TODO Along with alert give option of displaying an error message instead ✔✔
            this.submit.addEventListener('click', (e) => {
                this.inputEmptyCounter = 1;
                this.textAreaEmptyCounter = 1;
                this.selectEmptyCounter = 1;
                //?Selects all the pages
                this.pages = document.querySelectorAll(`${this.formClass} .page`);
                for (let i = 0; i < this.pages.length; i++) {
                    //?Loops through all the pages
                    //?Finds any input  or textarea and if it is empty returns to that page and alerts an error message
                    //*Selects all inputs
                    this.inputs = this.pages[i].querySelectorAll(':scope input:not([type="reset"]):not([type="submit"]):not([type="radio"]):not([type="checkbox"])');
                    for (let j = 0; j < this.inputs.length; j++) {
                        if (this.inputs[j].value == '') {
                            e.preventDefault();
                            this.inputEmptyCounter = 0;
                            this.whateverItTakes(i);
                            return false;
                        }
                    }
                    ////////////////////////////////////*
                    //*Selects all radios
                    //*Warning complicated code ahead
                    //?First it finds all the radios on the page being looped through
                    this.radios = this.pages[i].querySelectorAll(':scope input[type="radio"]');
                    //?Next it finds all the name of radios and removes the duplicates
                    this.radiosNames = [];
                    this.radioCheckedCounter = 0;
                    for (let j = 0; j < this.radios.length; j++) {
                        this.radiosNames.push(this.radios[j].getAttribute('name'));
                        this.radiosNames = [...new Set(this.radiosNames)];
                    }
                    //?Now we loop through all the names on that page and for each page check if any radio is true and for each unchecked radio the radiochecked counter is incremented and if it becomes equal to length of radios by that name it means all radios were false so it returns out of the loop
                    for (let j = 0; j < this.radiosNames.length; j++) {
                        this.radioCheckedCounter = 0;
                        this.radiosSorted = this.pages[i].querySelectorAll(`:scope  input[name="${this.radiosNames[j]}"]`);
                        for (let k = 0; k < this.radiosSorted.length; k++) {
                            if (this.radiosSorted[k].checked === true) {
                                this.radioCheckedCounter = 0;
                                break;
                            }
                            else {
                                this.radioCheckedCounter++;
                            }
                        }
                        if (this.radioCheckedCounter === this.radiosSorted.length) {
                            e.preventDefault();
                            this.radioCheckedCounter = 1;
                            this.whateverItTakes(i);
                            return false;
                        }
                    }
                    ////////////////////////////////////*
                    //*Selects all TextAreas
                    this.textAreas = this.pages[i].querySelectorAll(":scope textarea");
                    for (let j = 0; j < this.textAreas.length; j++) {
                        //?Checks if any input on the same page is already identified to be empty
                        if (this.inputEmptyCounter == 0 || this.radioCheckedCounter == 1) {
                            return false;
                        }
                        if (this.textAreas[j].value == "") {
                            e.preventDefault();
                            this.textAreaEmptyCounter = 0;
                            this.whateverItTakes(i);
                            return false;
                        }
                    }
                    ////////////////////////////////////*
                    //*Selects all selectOptions
                    this.selects = this.pages[i].querySelectorAll(":scope select");
                    for (let j = 0; j < this.selects.length; j++) {
                        if (this.inputEmptyCounter == 0 || this.textAreaEmptyCounter == 0 || this.radioCheckedCounter == 1) {
                            return false;
                        }
                        if (this.selects[j].options[this.selects[j].selectedIndex].text === "Please Select an Option") {
                            e.preventDefault();
                            this.selectEmptyCounter = 0;
                            this.whateverItTakes(i);
                            return false;
                        }
                    }
                    ////////////////////////////////////*
                    if (this.inputEmptyCounter == 0 || this.textAreaEmptyCounter == 0 || this.selectEmptyCounter == 0 || this.radioCheckedCounter == 1) {
                        e.preventDefault();
                        return false;
                    }
                }
            });
        };
        this.formClass = formClass;
        this.prev = document.querySelector(`${this.formClass} #previous_button`);
        this.prev.style.display = 'none';
        this.next = document.querySelector(`${this.formClass} #next_button`);
        this.submit = document.querySelector(`${this.formClass} #submit_button`);
        this.submit.style.display = 'none';
        this.form = document.querySelector(`${this.formClass} .pageContainer`);
        this.noOfPage = document.querySelectorAll(`${this.formClass} .page`).length;
        //?Sets the value of numOfPage in css variables
        this.root = this.form;
        this.root.style.setProperty(`--numOfPages`, this.noOfPage.toString());
        //?
        this.posCounter = 0;
        this.movePageBy = document.querySelector(`${this.formClass} .pageContainer`).offsetWidth;
    }
}
//?Pass a object with property of time and beizer curve for page transition time and transition curve default value is 0.5s and ease
