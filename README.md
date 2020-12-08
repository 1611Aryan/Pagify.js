# Pagify.JS

Pagify will transform your forms to a multi page format with just a few extra lines of code.

## Getting Started

###### NPM SETUP

> ```BASH
> Coming to a script near you very soon!!!
> ```

###### HTML SETUP

> ```HTML
> <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/1611Aryan/modularForm.github.io/CSS/pagify.css">
> <script src="https://cdn.jsdelivr.net/gh/1611Aryan/modularForm.github.io/JS/pagify.js"></script>
> ```

---

#### Setup

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
Your form has now successfully been ✨Pagified✨

---

### Tweaking the transitions

To speed up or change the transition curve of the page transitions
Pass an object defining the duration and curve of transitions as argument of the init function.

> ```JAVASCRIPT
> Pagify.init({time:"1s",curve:"ease-out"});
> ```

---

### Extra Features!!!

Not satisfied yet?
Don't worry we have some more tricks up our sleeve

- [Snappy](https://github.com/1611Aryan/modularForm.github.io/tree/master#snappy)
- [Input Check](https://github.com/1611Aryan/modularForm.github.io/tree/master#input-check)

#### Snappy

Not a fan of page transititions?

Use the snappy function and moving between pages hasn't been any faster!!

> ```JAVASCRIPT
> Pagify.snappy().init();
> ```

#### Input Check

There are two types of people:

- People who almost always forget to fill atleast one form input.
- Abnormal people.

For all the normal people we have the inputCheck function:

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
