# Pagify.JS

Pagify will transform your forms to a multi page format with just a few extra lines of code.

![Screenshot](https://1611aryan.github.io/Pagify.js/Media/excited.gif)

---

## Contents

- [Getting Started](https://github.com/1611Aryan/Pagify.js#getting-started)
- [Setup](https://github.com/1611Aryan/Pagify.js#setup)
- [Multiple Form Setup](https://github.com/1611Aryan/Pagify.js#multiple-form-setup)
- [Transitions](https://github.com/1611Aryan/Pagify.js#tweaking-the-transitions)
- [Extra Features](https://github.com/1611Aryan/Pagify.js#extra-features)
  - [Snappy](https://github.com/1611Aryan/modularForm.github.io/tree/master#snappy)
  - [Input Check](https://github.com/1611Aryan/modularForm.github.io/tree/master#input-check)
- [Samples](https://github.com/1611Aryan/modularForm.github.io/tree/master#Samples)
  - [Sample 1](https://github.com/1611Aryan/modularForm.github.io/tree/master#Samples)

---

## Getting Started

###### NPM SETUP

> ```BASH
> Coming to a script near you very soon!!!
> ```

###### HTML SETUP

> ```HTML
> <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/1611Aryan/modularForm.github.io/CSS/pagify.css">
> <script src="https://cdn.jsdelivr.net/gh/1611Aryan/modularForm.github.io/JS/pagify.js"></script>
> <!--Minified CSS and Script ⤵ -->
> <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/1611Aryan/modularForm.github.io/CSS/pagify.min.css">
> <script src="https://cdn.jsdelivr.net/gh/1611Aryan/modularForm.github.io/JS/pagify.min.js"></script>
> ```

---

## Setup

It is super easy to get pagify up and performing wonders

> ```HTML
> <form>
>   <div class="pageContainer">
>       <div class="page">
>           ...
>       </div>
>       <div class="page">
>           ...
>       </div>
>   </div>
> <div class="btnContainer">
>   <button id="previous_button">Previous</button>
>   <button id="next_button">Next</button>
>   <button id="submit_button">Submit</button>
> </div>
> </form>
> ```

> ```JAVASCRIPT
> const Pagify = new pagify();
> Pagify.init();
> ```

Yupp that was it.
<br>
Your form has now successfully been ✨Pagified✨

---

### Multiple Page Setup

To use pagify on multiple forms just pass the class of the forms to be pagified as the argument of the constructor function

> ```JAVASCRIPT
> //For a single form passing the class of the form is optional
> const Pagify1= new pagify('.form1');
> Pagify1.init();
> //Use the other functions as usual
> const Pagify2= new pagify('.form2');
> Pagify2.init();
> ```

Now Both the forms have been pagified✨<br>
Use this to pagify any number of forms

---

### Tweaking the transitions

To speed up or change the transition curve of the page transitions
Pass an object defining the duration and curve of transitions as argument of the init function.

> ```JAVASCRIPT
> Pagify.init({time:"1s",curve:"ease-out"});
> ```

---

## Extra Features!!!

Not satisfied yet?
<br>
Don't worry we have some more tricks up our sleeve

- [Snappy](https://github.com/1611Aryan/modularForm.github.io/tree/master#snappy)
- [Input Check](https://github.com/1611Aryan/modularForm.github.io/tree/master#input-check)

### Snappy

Not a fan of page transititions?
<br>
Use the snappy function and moving between pages hasn't been any faster!!

> ```JAVASCRIPT
> Pagify.snappy().init();
> ```

### Input Check

There are two types of people:

- People who almost always forget to fill atleast one form input
- Psychopaths

For all the normal people out there we have the inputCheck function:

> ```JAVASCRIPT
> Pagify.inputCheck();
> ```

By default 'Please complete the Form' alert message will be displayed.

To change the message pass your desired message as an argument.

> ```JAVASCRIPT
> Pagify.inputCheck({},'Your Message');
> ```

To display your message in a HTML element on the empty page:

> ```JAVASCRIPT
> //To hide the alert use displayAlert:0
> //Message is optional
> Pagify.inputCheck({displayAlert:1,displayMessage:1},"Message");
> ```

#### Supported Elements

Currently _inputCheck_ supports:

- > ```JAVASCRIPT
  > <textarea name="pagify" ></textarea>
  > ```

- > ```JAVASCRIPT
  > <select  name="pagify">
  > <option value="default">Please Select an Option</option>
  > <option value="option1">Option 1</option>
  > <option value="option2">Option 2</option>
  > <option value="option3">Option 3</option>
  > <option value="option3">Option 4</option>
  > </select>
  > ```

* > ```JAVASCRIPT
  > <!--Any Input which require you to type/email/password/tel..-->
  > <input name="pagify"  type="text" placeholder="Supported">
  > ```

* > ```JAVASCRIPT
  > <input name="pagify"  type="radio" placeholder="Supported">
  > ```
* > ```JAVASCRIPT
  > console.log('More Coming Soon')
  > ```

---

## Samples

> [Sample1](https://1611aryan.github.io/Pagify.js/Samples/sample1/)
>
> ![Screenshot](https://1611aryan.github.io/Pagify.js/Media/sample1.png)
