!function(){var t,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}e.addEventListener("click",(function(){e.disabled=!0,n.disabled=!1,t=setInterval(a,1e3)})),n.addEventListener("click",(function(){e.disabled=!1,n.disabled=!0,clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.c2f3a475.js.map
