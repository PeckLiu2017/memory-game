$(document).ready(function () {
  var clicked_items = [];
  var matched_items = [];
  // set up the event listener for a card. If a card is clicked:
  $('.card').on('click',function () {
    $this = $(this);
    // 防止第二次点击
    lockCard($this);
    // add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    clicked_items.push($this)

    if (clicked_items.length % 2 != 0) {
      // display the card's symbol (put this functionality in another function that you call from this one)
      displayCard($this);
    }else {
      checkMatch($this);
    }


  })

  function displayCard($this) {
      $this.addClass('open').addClass('show')
  }

  // 防止第二次点击
  function lockCard($this) {
    $this.toggleClass( 'disable' );
  }

  // 查看是否匹配
  function checkMatch($this) {
    if ($this.children().attr('class') == clicked_items[clicked_items.length-2].children().attr('class')) {
      $.each(clicked_items,function () {
        // card 上去除 open 的背景色蓝色和 show的字体大小,然后重新设置背景为透明，以呈现 card 跟随 i 伸缩的效果
        $(this).removeClass('open')//.removeClass('show')
        $(this).css({"background-color":"transparent",'font-size':'33px'})
        $(this).children().addClass('match')
      })
    } else {
      // if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
      $.each(clicked_items,function () {
        $(this).removeClass('open').removeClass('show').removeClass('disable')
        //
        $(this).addClass('mismatch')
        // .queue(function(next) {
        //   $(this).removeClass('mismatch')
        //   next();
        // })
          // .animate({
          //   background: '#2e3d49',
          //   fontSize:'0px'
          // },'fast')
          // .removeClass('mismatch')
        // $(this).css({'font-size':'33px'})
        // $(this).css({'font-size':'33px'})
      })
    }
  }

})
