var pagify = /** @class */ (function () {
    function pagify() {
        var _this = this;
        //?Voila Magic
        this.init = function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.time, time = _c === void 0 ? '0.5s' : _c, _d = _b.curve, curve = _d === void 0 ? 'ease' : _d;
            _this.time = time;
            _this.curve = curve;
            _this.root.style.setProperty('--pageTransitionTime', _this.time);
            //?
            //?Sets the transition curve (which is an optional parameter) in css variables
            _this.root.style.setProperty('--pageTransitionCurve', _this.curve);
            //?
            _this.prev.addEventListener('click', function (e) {
                e.preventDefault();
                _this.posCounter--;
                if (_this.posCounter < 0) {
                    _this.posCounter = 0;
                }
                else {
                    _this.pageChange(_this.posCounter);
                }
            });
            _this.next.addEventListener('click', function (e) {
                e.preventDefault();
                _this.posCounter++;
                if (_this.posCounter > _this.noOfPage - 1) {
                    _this.posCounter = _this.noOfPage - 1;
                }
                else {
                    _this.pageChange(_this.posCounter);
                }
            });
            _this.resize();
        };
        //?The page and button changing mechanism
        //?The wiring
        this.pageChange = function (posCounter) {
            if (posCounter == 0) {
                _this.prev.style.display = 'none';
            }
            else {
                _this.prev.style.display = 'block';
            }
            if (posCounter == _this.noOfPage - 1) {
                _this.next.style.display = 'none';
                _this.submit.style.display = 'block';
            }
            else {
                _this.next.style.display = "block";
                _this.submit.style.display = 'none';
            }
            _this.location = (posCounter * _this.movePageBy / _this.noOfPage);
            _this.form.style.transform = "translateX(-" + _this.location + "px)";
        };
        //?Pages still change perfectly even if the window size is changed
        //?Don't Change
        this.resize = function () {
            addEventListener('resize', function () {
                _this.movePageBy = document.querySelector('.pageContainer').offsetWidth;
            });
        };
        //*Extra Functions
        //?Outputs the passed message to the passed pageNumber 
        //?Message can be displayed in form of alert and innerHTML of an element with class ".pagifyMessage"
        this.display = function (displayAlert, displayMessage, pageNumber, message) {
            if (displayAlert === 1) {
                window.alert(message);
            }
            if (displayMessage === 1) {
                if (_this.pages[pageNumber].querySelector(":scope .pagifyMessage")) {
                    _this.pages[pageNumber].querySelector(":scope .pagifyMessage").innerHTML = message;
                }
                ;
            }
        };
        //?
        //?Removes the transition
        this.snappy = function () {
            _this.time = '0s';
            _this.root.style.setProperty('--pageTransitionTime', _this.time);
            //?returns the same object so that it can be chained with init()
            return _this;
        };
        //?
        //?Checks if any form element is empty or not selected
        this.inputCheck = function (_a, message) {
            var _b = _a === void 0 ? {} : _a, _c = _b.displayAlert, displayAlert = _c === void 0 ? 1 : _c, _d = _b.displayMessage, displayMessage = _d === void 0 ? 0 : _d;
            if (message === void 0) { message = "Please complete the Form"; }
            _this.displayAlert = displayAlert;
            _this.displayMessage = displayMessage;
            _this.outputMessage = message;
            //TODO check for other types of form elements
            //TODO Make the code faster rn it is O(N^2)
            //TODO Along with alert give option of displaying an error message instead ✔✔
            _this.submit.addEventListener('click', function (e) {
                e.preventDefault();
                _this.inputEmptyCounter = 1;
                _this.textAreaEmptyCounter = 1;
                _this.selectEmptyCounter = 1;
                //?Selects all the pages
                _this.pages = document.querySelectorAll('.page');
                for (var i = 0; i < _this.pages.length; i++) {
                    //?Loops through all the pages
                    //?Finds any input  or textarea and if it is empty returns to that page and alerts an error message
                    //*Selects all inputs
                    _this.inputs = _this.pages[i].querySelectorAll(':scope input:not([type="reset"]):not([type="submit"]):not([type="radio"]):not([type="checkbox"])');
                    for (var j = 0; j < _this.inputs.length; j++) {
                        if (_this.inputs[j].value == '') {
                            e.preventDefault();
                            _this.posCounter = i;
                            _this.pageChange(_this.posCounter);
                            _this.inputEmptyCounter = 0;
                            _this.display(_this.displayAlert, _this.displayMessage, i, _this.outputMessage);
                            return false;
                        }
                    }
                    //*Selects all TextAreas
                    _this.textAreas = _this.pages[i].querySelectorAll(":scope textarea");
                    for (var j = 0; j < _this.textAreas.length; j++) {
                        //?Checks if any input on the same page is already identified to be empty
                        if (_this.inputEmptyCounter == 0) {
                            return false;
                        }
                        if (_this.textAreas[j].value == "") {
                            e.preventDefault();
                            _this.posCounter = i;
                            _this.pageChange(_this.posCounter);
                            _this.textAreaEmptyCounter = 0;
                            _this.display(_this.displayAlert, _this.displayMessage, i, _this.outputMessage);
                            return false;
                        }
                    }
                    //*Selects all selectOptions
                    _this.selects = _this.pages[i].querySelectorAll(":scope select");
                    for (var j = 0; j < _this.selects.length; j++) {
                        if (_this.selects[j].options[_this.selects[j].selectedIndex].text === "Please Select an Option") {
                            if (_this.inputEmptyCounter == 0 || _this.textAreaEmptyCounter == 0) {
                                return false;
                            }
                            e.preventDefault();
                            _this.posCounter = i;
                            _this.pageChange(_this.posCounter);
                            _this.selectEmptyCounter = 0;
                            _this.display(_this.displayAlert, _this.displayMessage, i, _this.outputMessage);
                            return false;
                        }
                    }
                    if (_this.inputEmptyCounter == 0 || _this.textAreaEmptyCounter == 0 || _this.selectEmptyCounter == 0) {
                        return false;
                    }
                }
            });
        };
        this.prev = document.querySelector('#previous_button');
        this.next = document.querySelector('#next_button');
        this.submit = document.querySelector('#submit_button');
        this.form = document.querySelector('.pageContainer');
        this.noOfPage = document.getElementsByClassName('page').length;
        //?Sets the value of numOfPage in css variables
        this.root = document.documentElement;
        this.root.style.setProperty('--numOfPages', this.noOfPage.toString());
        //?
        this.posCounter = 0;
        this.movePageBy = document.querySelector('.pageContainer').offsetWidth;
    }
    return pagify;
}());
//?Pass a object with property of time and beizer curve for page transition time and transition curve default value is 0.5s and ease
