!function(t,e){let n,i,o,a=0;function r(e){let n=100*(1-e);t(".process-top").css({transform:"translateX(-"+n+"%)"});let i=c(o*e);t(".curTime").text(i)}function c(t){t=Math.round(t);let e=Math.floor(t/60),n=t-60*e;return e<10&&(e="0"+e),n<10&&(n="0"+n),e+":"+n}e.pro={start:function(e){cancelAnimationFrame(n),a=void 0===e?a:e,i=(new Date).getTime(),function e(){let c=(new Date).getTime(),l=a+(c-i)/(1e3*o);l<1?(r(l),n=requestAnimationFrame(e)):(cancelAnimationFrame(n),t(".btn.next").click())}()},stop:function(){cancelAnimationFrame(n);let t=(new Date).getTime();a=(t-i)/(1e3*o)+a},update:r,renderAlltime:function(e){a=0,o=e,t(".totalTime").text(c(e))}}}(window.Zepto,window.player||(window.player={}));