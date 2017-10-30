$(document).ready(function () {
  var clicked_items = [];
  var matched_items = [];
  // set up the event listener for a card. If a card is clicked:
  $('.card').on('click',function () {
    // display the card's symbol (put this functionality in another function that you call from this one)
    displayCard($this)
  })
  $('.card').click(function() {
    $this = $(this)
    displayCard($this)

    clicked_items.push($this.children())
    // console.log(clicked_items);
    if (clicked_items.length % 2 == 0) {
      if ($this.children().attr('class') === clicked_items[clicked_items.length - 2].attr('class')) {
        note_matched_items.call($(document))

      } else {
        $('.show').addClass('wrong')
        // restart_from_zero()
      }
    }
  })

  function displayCard($this) {
    clicked_items.push($this)
    $this.children().addClass('open').addClass('rotate').addClass('show')
    // 还要lock以避免重复点击
    $this.toggleClass( 'disable' );
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
