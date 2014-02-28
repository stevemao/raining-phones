Raining-phones
==============
Have you seen the movie 'Cloudy with a Chance of Meatballs'?

Ever wonder if there is a raining phones so that every one can get a free phone? ***You heard right, folks...* FREE!!!** 

Don't wanna line up at Apple store?

There we go. I made this jQuery plugin for you :)

How to use it
==============
*Lucky for you, implementation is really simple.*

1. Load jQuery
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

2. Load rainingPhones.js
<script src="scripts/rainingPhones.js"></script>

3. Call rainingPhones() on jQuery object
$('body').rainingPhones();

That's basically it :)

Settings
==============
Setup an array of object as follow structure

var settings = {
  maxPhones: 20,
  // In sec
  spawingGap: 0.1,
  // In pixel
  height: 700,
  // In sec
  appearTime: 2
}

Then pass it as an argument

$('body').rainingPhones(settings);

# What're you waiting for??? It's time to get your favourite phone!!!
