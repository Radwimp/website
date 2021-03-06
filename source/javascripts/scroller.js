import $ from 'jquery'

let scrollTimeout
let isScrolling = false
let sections = []
let currentSection = 0

$(document).ready(function() {
  if($(window).width() > 992){
    $('.js-scrollTo').on('click', function(e) {
      e.preventDefault()

      let page = $(this).attr('href')
      $('html, body').animate({
        scrollTop: page ? $(page).offset().top : 0
      }, 500)

      if (page) {
        window.location.hash = page
      }
    })

    $('section').each(function (i) {
      sections.push({
        id: $(this).attr('id'),
        offset: $(this).offset().top
      })

      if ($(this).attr('id') === window.location.hash) {
        currentSection = i
        setNavColor()
      }
    })

    $(window).on('wheel', function (event) {
      event.preventDefault()

      if (isScrolling) {
        clearTimeout(scrollTimeout)
      } else {
        isScrolling = true

        if (event.originalEvent.deltaY < 0) {
          prevSection()
        } else if (event.originalEvent.deltaY > 0) {
          nextSection()
        }

        $('html, body').animate({ scrollTop: sections[currentSection].offset }, 500)
        window.location.hash = `#${sections[currentSection].id}`

        setNavColor()
      }

      scrollTimeout = setTimeout(function () { isScrolling = false }, 100)
    })
  } else if ($(window).width() <= 992) {
    $(window).scroll(function(){
      let currentclass
      $('section').each(function(){
         if($(this).offset().top<$(window).scrollTop()+20){
            currentclass =$(this).attr('id')
         }
      })

      if($('#sideNav').offset().top < 80) {
        $('#sideNav').addClass('red')
      } else {
        $('#sideNav').removeClass('red')
      }

      $('#sideNav').removeClass('about components features team followus')
      $('#sideNav').addClass(currentclass)
    })
  }
})

function prevSection() {
  if (currentSection > 0) {
    currentSection -= 1
  }
}

function nextSection() {
  if (currentSection < sections.length - 1) {
    currentSection += 1
  }
}

function setNavColor () {
  let color = $(`#${sections[currentSection].id}`).attr('data-nav-color')
  $('#sideNav').removeClass('red yellow green blue')
  $('#sideNav').addClass(color)
}

