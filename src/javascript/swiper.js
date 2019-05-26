let Swiper = (function(){
    let root = document
    let eventHub = {"swipeRight":[],"swipeLeft":[]}
    function bind(node){
        root = node
    }
    function on(type,fn){
        if(eventHub[type]){
            eventHub[type].push(fn)
        }
    }
    var initX
    var newX
    var clock
    root.ontouchstart = function(e){
        initX = e.changedTouches[0].pageX
    }  
    root.ontouchmove = function(e){
        if(clock){clearInterval(clock)}
        clock = setTimeout(()=>{
            newX = e.changedTouches[0].pageX
            if(newX - initX >10){
                eventHub['swipeRight'].forEach(fn => fn())
            }else if(initX - newX > 10){
                eventHub['swipeLeft'].forEach(fn => fn())
            }
        },100)
    }
    return {
        bind:bind,
        on:on
    }
})()

Swiper.bind(document.querySelector('.panel'))
Swiper.on('swipeLeft', function() {
    document.querySelector('.panel').classList.remove("panel1")
    document.querySelector('.panel').classList.add("panel2")
})
Swiper.on('swipeRight', function() {
    document.querySelector('.panel').classList.remove("panel2")
    document.querySelector('.panel').classList.add("panel1")
})