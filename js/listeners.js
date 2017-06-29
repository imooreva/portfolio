//remove focus on buttons and icons when clicked
var buttons = document.getElementsByClassName('pure-button');
Array.from(buttons).forEach((x) => x.addEventListener('click', () => x.blur()));

var faIcons = document.getElementsByName('fa-link');
Array.from(faIcons).forEach((x) => x.addEventListener('click', () => x.blur()));