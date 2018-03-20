!function () {
    "use strict";
    window.addEventListener("load", bindEvent);

    function bindEvent() {
        var editors = document.querySelectorAll(".color-edit");
        editors.forEach(function (t, number, ts) {
            var alphaNode = t.querySelector(".color-edit-alpha");
            var colorNode = t.querySelector("input[type=color]");
            colorNode.addEventListener("input", function (event) {
                var color = toRgba(this.value, 1);
                var selector = t.dataset.target;
                if (!selector) {
                    return;
                }
                var attr = t.dataset.targetAttr;
                var e = document.querySelector(selector);
                alphaNode.style.background = "transparent linear-gradient(90deg, transparent," + color + " 97%)";
                if (e && attr) {
                    setElementColor(e, getCurrentColor(t), attr.split(/,/g));
                }
            });
            alphaNode.addEventListener("click", function (event) {
                if (this === event.target) {
                    colorNode.click();
                }
            });
        });
        document.addEventListener("mousemove", function (event) {
            var editor = document.querySelector(".color-edit:hover");
            if (!editor || !editor.querySelector(".color-edit-handle.moving:active")) {
                return;
            }
            var selector = editor.dataset.target;
            var attr = editor.dataset.targetAttr;
            var e = document.querySelector(selector);
            if (e && attr) {
                var attrs = attr.split(/,/g);
                setElementColor(e, getCurrentColor(editor), attrs);
            }
        });
    }

    function setElementColor(e, color, attrs) {
        for (var i = 0; i < attrs.length; i++) {
            var command = "e." + attrs[i] + "='" + color + "';";
            eval(command);
        }
    }

    function getCurrentColor(editor) {
        var color = editor ? editor.querySelector("input[type=color]").value : document.querySelector(".color-edit > input[type=color]").value;
        var alphaMatcher = /[^%]*(?=%)/.exec((editor || document).querySelector(".color-edit-handle").style.left) || [100];
        return toRgba(color, alphaMatcher[0] / 97 + 0.019);
    }

    function toRgba(color, alpha, defaultColor) {
        if (alpha <= 0) return "transparent";
        if (/rgba\((?:\s*\d{1,3}\s*,){3}(?:[01]|0?\.\d+)\s*\)/.test(color)) {
            return color;
        }
        if (isNaN(alpha) || alpha > 0.99) alpha = 1;
        return color.replace(/rgb\(([0-9,\s]{5,})\)/, "rgba($1," + alpha + ")")
            .replace(/#([0-9a-f])([0-9a-f])([0-9a-f])$/i, "#$1$1$2$2$3$3")
            .replace(/(#)([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i, function (str, p0, p1, p2, p3) {
                return "rgba(" + parseInt("0x" + p1) + "," + parseInt("0x" + p2) + "," + parseInt("0x" + p3) + "," + alpha + ")";
            });
    }
}();

