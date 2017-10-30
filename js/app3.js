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

  function checkMatch($this) {
    console.log(clicked_items[clicked_items.length-2]);
    console.log($this.children().attr('class'));
    console.log(clicked_items[clicked_items.length-2].children().attr('class'));
    console.log($this.children().attr('class') == clicked_items[clicked_items.length-2].children().attr('class'));
    if ($this.children().attr('class') == clicked_items[clicked_items.length-2].children().attr('class')) {
      $.each(clicked_items,function () {
        $(this).removeClass('open').removeClass('show')
        $(this).css({"background-color":"transparent",'font-size':'33px'})
        $(this).children().addClass('match')
        console.log($(this));

      })
    }
  }

  var note_matched_items = function () {
    matched_items.push(clicked_items[clicked_items.length - 1])
    matched_items.push(clicked_items[clicked_items.length - 2])
    $.each(matched_items,function () {
      $(this).addClass('match')
    })
  }

  // $($('.card-wraper')[0]).addClass('match')
  //   .animate({ //1
  //   left: '-=10',
  //   top: '+=10',
  //   // bottom: '+=40',
  //   width: '+=20',
  //   height: '-=20'
  // }, 'fast', function() {
  //   // Animation complete.
  //   $($('.card-wraper')[0]).animate({ //2
  //     left: '+=10',
  //     top: '-=10',
  //     // bottom: '-=20',
  //     width: '-=20',
  //     height: '+=20'
  //   }, 'fast'); //2
  // }); // 1

})
