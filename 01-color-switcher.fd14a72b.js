!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire7bc7;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequire7bc7=o);var r=o("h6c0i");function a(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}var d=document.querySelector("[data-start]"),i=document.querySelector("[data-stop]"),l=null;d.addEventListener("click",(function(){d.disabled=!0,document.body.style.backgroundColor=a(),l=setInterval((function(){document.body.style.backgroundColor=a()}),1e3)})),i.addEventListener("click",(function(){d.disabled&&l?(d.disabled=!1,clearInterval(l)):r.Notify.failure('Press "Start" button first!')}))}();
//# sourceMappingURL=01-color-switcher.fd14a72b.js.map