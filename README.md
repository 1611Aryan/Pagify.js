# Pagify.JS

To get started with using pagify.js
First add the cdn to js and css file

> ```HTML
> <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/1611Aryan/modularForm.github.io/CSS/pagify.css">
> <script src="https://cdn.jsdelivr.net/gh/1611Aryan/modularForm.github.io/JS/pagify.js"></script>
> ```

---

#### Now initialize Pagify.js by

> ```JAVASCRIPT
> const Pagify = new pagify();
> Pagify.init();
> ```

---

### Extra Features

- [Snappy](https://github.com/1611Aryan/modularForm.github.io/tree/master#snappy)
- [Input Check](https://github.com/1611Aryan/modularForm.github.io/tree/master#input-check)

##### Snappy

To remove all the transitions from the pages use

> ```JAVASCRIPT
> Pagify.snappy().init();
> ```

##### Input Check

To check if any input was left empty on a page and traverse back to that page

> ```JAVASCRIPT
> Pagify.inputCheck();
> ```

By default 'Please complete the Form' alert message will be displayed
To change the message pass your desired message as an argument

> ```JAVASCRIPT
> Pagify.inputCheck({},'Your Message');
> ```

To display your message in a HTML element on the empty page

> ```JAVASCRIPT
> //To hide the alert use displayAlert:0
> //Message is optional
> Pagify.inputCheck({displayAlert:1,displayMessage:1},"Message");
> ```
