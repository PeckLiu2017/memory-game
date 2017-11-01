$(document).ready(function () {
  // 所有的牌
  array = [
    'fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt',
    'fa fa-cube','fa fa-anchor','fa fa-leaf','fa fa-bicycle',
    'fa fa-diamond','fa fa-bomb','fa fa-leaf','fa fa-bomb',
    'fa fa-bolt','fa fa-bicycle','fa fa-paper-plane-o','fa fa-cube'
  ]
  // 洗牌函数,每一次将数组中的随机数与 array[currentIndex] 交换以打乱牌的顺序
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
  // 进行洗牌
  shuffle(array);
  // 将牌的内容填充到页面的对应位置中
  cards = $('.card');
  $.each(cards,function (index,value) {
    $($('.card')[index]).find('i').attr('class',array[index]);
  });

  var clicked_items = [];
  var matched_items = 0;
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
      console.log('-----------');
      console.log(matched_items);
      // 如果匹配成功的数目达到 16 就显示游戏胜利
      if (matched_items == 16) {
        setTimeout(function (){
          $('#playing').css('display','none')
          $('#success').css('display','block')
        }, 1000);
      }
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
      // 如果匹配成功,就将匹配成功的数目加 2
      matched_items += 2;
    } else {
      // if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
      $.each(clicked_items,function () {
        $(this).removeClass('open').removeClass('show').removeClass('disable')
        //
        $(this).addClass('mismatch')
        clicked_items.pop($(this));
        console.log(clicked_items);
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
