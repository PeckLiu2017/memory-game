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
  // 将牌的内容填充到页面的对应位置中,进行发牌
  function licensing() {
    cards = $('.card');
    $.each(cards,function (index,value) {
      $($('.card')[index]).find('i').attr('class',array[index]);
    });
  }
  licensing();

  var count = 0;
  var clicked_items = [];
  var matched_items = [];
  // set up the event listener for a card. If a card is clicked:
  $('.card').on('click',function () {
    $this = $(this);
    // 点击一次就增加一次点击次数
    increaseCount();
    // 显示总点击数
    total_click();
    // 防止第二次点击
    lockCard($this);
    // add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    clicked_items.push($this)

    if (clicked_items.length % 2 != 0) {
      // display the card's symbol (put this functionality in another function that you call from this one)
      displayCard($this);
    }else {
      checkMatch($this);
      // 如果匹配成功的数目达到 16 就显示游戏胜利
      if (matched_items.length == 2) {
        $('#total-click').text($('.moves').text())
        setTimeout(function (){
          $('#playing').css('display','none');
          $('#success').css('display','flex');
          // $('.checkmark').toggle();
          //
            $('.circle-loader').toggleClass('load-complete');
        }, 1000);
      }
    }
  })

  function displayCard($this) {
      $this.addClass('open').addClass('show')
  }

  // 点击一次就增加一次点击次数
  function increaseCount() {
      count += 1;
  }

  // 显示总点击数
  function total_click() {
    $('.moves').text(count);
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
        $(this).css({"background-color":"transparent",'font-size':'33px','transform':'rotateY(180deg)'})
        $(this).children().addClass('match');
      })
      // 如果匹配成功,就将匹配成功的数目加 2
      matched_items.push(clicked_items.pop());
      matched_items.push(clicked_items.pop());
    } else {
      // if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
      $.each(clicked_items,function () {
        $(this).removeClass('open').removeClass('show').removeClass('disable')
        //
        $(this).addClass('mismatch');
        setTimeout(function () {
          $.each(clicked_items,function (i,v) {
            $(this).removeClass('mismatch')
            clicked_items.splice(i,1);
            console.log(clicked_items);
          })
        },500);
      })
    }
  }

  // 重新洗牌并回到游戏界面再玩一次
  $('#play-again').on('click',function () {
    window.location.reload();
    $('#playing').css('display','flex');
    $('#success').css('display','none');
  })

})
