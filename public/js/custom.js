$(document).ready(function (){
    siteHeaderFunction()
    $(document).scroll(function(){
        siteHeaderFunction()
    })
    $('.site-header .header-menu-btn').click(function(){
        $('.site-header .header-menu').toggleClass('active')
    })
    
    $('.circle-progress').each(function(){
        circle = $(this).find('circle').eq(1)[0]
        circle.style.strokeDashoffset = 630 - (630 * Number($(this).attr('data-percent')))/100
    })
})

function siteHeaderFunction(){
    var top = window.scrollY
    if(top > 0){
        $('.site-header').addClass('shadow')
    }else{
        $('.site-header').removeClass('shadow')
    }
}