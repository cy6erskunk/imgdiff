/* global DropZone:false */
(function () {
    var _checkbox = document.querySelector('#click-me'),
        rightImageTopOffset = 0,
        rightImageLeftOffset = 0;

    function _updateRightImageOffset() {
        var rightImage = document.querySelector('.drop-zone_right .dropped-image');
        if (rightImage) {
            rightImage.style.top = (rightImageTopOffset|0) + 'px';
            rightImage.style.left = (rightImageLeftOffset|0) + 'px';
        }
    }

    function initRightImageOffset() {
        rightImageTopOffset = rightImageLeftOffset = 0;
        _updateRightImageOffset();
    }

    function moveRightImage(moveArray) {
        var [x, y] = moveArray;
        rightImageLeftOffset += x;
        rightImageTopOffset += y;
        _updateRightImageOffset();
    }

    new DropZone('.drop-zone_left', '#left-file');
    new DropZone('.drop-zone_right', '#right-file');

    var toggle = document.querySelector('.click-me');
    var wrapper = document.querySelector('.diff-wrapper');

    function toggleDiff() {
        _checkbox.checked = !_checkbox.checked;
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('change', false, true);
        _checkbox.dispatchEvent(evt);
    }
    function toggleDiffHandler() {
        if (_checkbox.checked) {
            wrapper.classList.add('diff-wrapper_active');
            initRightImageOffset();
        } else {
            wrapper.classList.remove('diff-wrapper_active');
        }
    }

    toggle.addEventListener('change', toggleDiffHandler);

    document.documentElement.addEventListener('keyup', e => {
        var shift = e.shiftKey ? 10 : 1;
        switch (e.code) {
        case 'ArrowUp':
            moveRightImage([0, -shift]);
            break;
        case 'ArrowDown':
            moveRightImage([0, shift]);
            break;
        case 'ArrowLeft':
            moveRightImage([-shift, 0]);
            break;
        case 'ArrowRight':
            moveRightImage([shift, 0]);
            break;
        case 'Escape':
            initRightImageOffset();
            break;
        case 'Enter':
            toggleDiff();
            break;
        }
    });
})();
