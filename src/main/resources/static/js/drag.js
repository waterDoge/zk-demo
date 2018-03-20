(function () {
    "use strict";
    window.addEventListener("load", init);
    function init() {
        bindEvent();
        bindEventX();
    }

    function bindEvent() {
        var elements = document.querySelectorAll(".movable");
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mousedown", onMouseDown);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("drop", onMouseUp);
    }

    function onMouseDown(event) {
        var target = event.target;
        target.classList.add("moving");
        target.dataset.startX = event.clientX;
        target.dataset.startY = event.clientY;
        target.dataset.offsetX = target.offsetLeft - parseInt(getComputedStyle(target).marginLeft);
        target.dataset.offsetY = target.offsetTop - parseInt(getComputedStyle(target).marginTop);
        event.stopPropagation();
    }

    function onMouseUp() {
        var elements = document.querySelectorAll(".moving");
        for (var i = 0; i < elements.length; i++) {
            var target = elements[i];
            target.classList.remove("moving");
            delete target.dataset.startX;
            delete target.dataset.startY;
            delete target.dataset.offsetX;
            delete target.dataset.offsetY;
        }
    }

    function onMouseMove(event) {
        var elements = document.querySelectorAll(".moving");
        for (var i = 0; i < elements.length; i++) {
            var target = elements[i];
            var currentStyle = getComputedStyle(target);
            target.style.width = currentStyle.width;
            var parentStyles = getComputedStyle(target.parentNode);
            var left = (target.dataset.offsetX - (target.dataset.startX - event.clientX)) / parseInt(parentStyles.width);
            if (target.dataset.boundLeft && left < target.dataset.boundLeft) {
                left = target.dataset.boundLeft;
            }
            var widthRatio = parseInt(currentStyle.width) / parseInt(parentStyles.width);
            if (target.dataset.boundRight && left > target.dataset.boundRight - widthRatio) {
                left = target.dataset.boundRight >= widthRatio + parseFloat(target.dataset.boundLeft) || 0 ? target.dataset.boundRight - widthRatio : 0;
            }
            var top = (target.dataset.offsetY - (target.dataset.startY - event.clientY)) / parseInt(parentStyles.height);
            if (target.dataset.boundTop && left < target.dataset.boundTop) {
                top = target.dataset.boundTop;
            }
            var heightRatio = parseInt(currentStyle.height) / parseInt(parentStyles.height);
            if (target.dataset.boundBottom && left > target.dataset.boundBottom - heightRatio) {
                top = target.dataset.boundBottom - heightRatio > parseFloat(target.dataset.boundTop) ? target.dataset.boundBottom - heightRatio : target.dataset.boundTop;
            }
            target.style.left = left * 100 + "%";
            target.style.top = top * 100 + "%";
        }
    }

    function bindEventX() {
        var elements = document.querySelectorAll(".movable-x");
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mousedown", onMouseDownX);
        }

        document.addEventListener("mousemove", onMouseMoveX);
        document.addEventListener("mouseup", onMouseUpX);
        document.addEventListener("drop", onMouseUpX);
    }

    function onMouseDownX(event) {
        var target = event.target;
        target.classList.add("moving");
        target.dataset.startX = event.clientX;
        target.dataset.offsetX = target.offsetLeft - parseInt(getComputedStyle(target).marginLeft);
    }

    function onMouseMoveX(event) {
        var elements = document.querySelectorAll(".movable-x.moving");
        for (var i = 0; i < elements.length; i++) {
            var target = elements[i];
            var currentStyle = getComputedStyle(target);
            target.style.width = currentStyle.width;
            var parentStyles = getComputedStyle(target.parentNode);
            var left = (target.dataset.offsetX - (target.dataset.startX - event.clientX)) / parseInt(parentStyles.width);
            if (target.dataset.boundLeft && left < target.dataset.boundLeft) {
                left = target.dataset.boundLeft;
            }
            var widthRatio = parseInt(currentStyle.width) / parseInt(parentStyles.width);
            if (target.dataset.boundRight && left > target.dataset.boundRight - widthRatio) {
                left = target.dataset.boundRight >= widthRatio + parseFloat(target.dataset.boundLeft) || 0 ? target.dataset.boundRight - widthRatio : 0;
            }
            target.style.left = left * 100 + "%";
        }
    }

    function onMouseUpX() {
        var elements = document.querySelectorAll(".movable-x.moving");
        for (var i = 0; i < elements.length; i++) {
            var target = elements[i];
            target.classList.remove("moving");
            delete target.dataset.startX;
            delete target.dataset.offsetX;
        }
    }
})();