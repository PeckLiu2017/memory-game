/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/* get card change its background and show it */
var count = 0;
var first_click = '';
var second_click = '';
var clicked_items = [];
var matched_items = 0;

// 第一次点击
$('.card').click(function() {
  $this = $(this)
  open_card($this)
  increase_count()
  total_click()
  clicked_items.push($this.children().attr('class'))
  if (clicked_items.length % 2 == 0) {
    if ($this.children().attr('class') == clicked_items[clicked_items.length - 2]) {
      matched_items += 2
      note_matched_items()
    } else {
      $('.show').addClass('wrong')
      restart_from_zero()
    }
  }
  game_victory()
})

function open_card($this) {
  // 还要lock以避免重复点击
  $this.addClass('open').addClass('rotate').addClass('show')
  $this.toggleClass( 'disable' );
}

// 第二次点击
function increase_count() {
  return count += 1;
}

function judge_click_times() {
  return count % 2 == 1 ? 'first_click' : 'second_click'
}
// 为已经匹配的元素增加 match 样式
function note_matched_items() {
  $('.show').addClass('match')
  // $this = $('.show')
  // $this.each(function () {
  //   $(this).animate({ //1
  //     left: '-=10',
  //     width: '+=20',
  //     height: '-=20'
  //   }, 'fast', function() {
  //     console.log('111');
  //     // Animation complete.
  //     $(this).animate({ //2
  //       left: '+=10',
  //       width: '-=20',
  //       height: '+=20'
  //     }, 'fast', function() {
  //       console.log('1211');
  //       $(this).animate({ //3
  //         left: '-=10',
  //         width: '+=20',
  //         height: '-=20'
  //       }, 'fast', function() {
  //         console.log('1131');
  //         $(this).animate({
  //           left: '+=10',
  //           width: '-=20',
  //           height: '+=20'
  //         }, 'fast')
  //       }); //3
  //     }); //2
  //   }); // 1
  // })

  $this1 = $($('.fa-diamond')[0]).parent()
  console.log($('.fa-diamond')[0]);
  $this2 = $($('.fa-diamond')[1]).parent()
  $this1.animate({ //1
    left: '-=20',
    width: '+=50',
    height: '-=50'
  }, 'fast', function() {
    // Animation complete.
    $this1.animate({ //2
      left: '+=20',
      width: '-=50',
      height: '+=50'
    }, 'fast', function() {
      $this1.animate({ //3
        left: '-=20',
        width: '+=50',
        height: '-=50'
      }, 'fast', function() {
        $this1.animate({
          left: '+=20',
          width: '-=50',
          height: '+=50'
        }, 'fast')
      }); //3
    }); //2
  }); // 1

  $this2.animate({ //1
    left: '-=20',
    width: '+=50',
    height: '-=50'
  }, 'fast', function() {
    // Animation complete.
    $this2.animate({ //2
      left: '+=20',
      width: '-=50',
      height: '+=50'
    }, 'fast', function() {
      $this2.animate({ //3
        left: '-=20',
        width: '+=50',
        height: '-=50'
      }, 'fast', function() {
        $this2.animate({
          left: '+=20',
          width: '-=50',
          height: '+=50'
        }, 'fast')
      }); //3
    }); //2
  }); // 1

}

// 猜错了就从零重新开始
function restart_from_zero() {


  // $('.show').removeClass('rotate_left').addClass('rotate_right')
  // $('.show').addClass('rotate_left')
  // $('.show').removeClass('rotate_left').addClass('rotate_right')
  // $('.show').removeClass('rotate_right')
  $('.show').removeClass('open').removeClass('rotate').removeClass('match').removeClass('show')
  matched_items = 0
  console.log(matched_items);
}

// 显示点击次数
function total_click() {
  $('.moves').text(count);
}

function game_victory() {
  if ($('.match').size() == 4) {
    // $('.show').addClass('match')
    setTimeout("game_victory()", 1000);
  }
}
