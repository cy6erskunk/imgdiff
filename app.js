/* global DropZone:false */
new DropZone('.drop-zone_left', '#left-file');
new DropZone('.drop-zone_right', '#right-file');

var toggle = document.querySelector('.click-me');
var wrapper = document.querySelector('.diff-wrapper');

toggle.addEventListener('change', function () {
    if (this.checked) {
        wrapper.classList.add('diff-wrapper_active');
    } else {
        wrapper.classList.remove('diff-wrapper_active');
    }
});
