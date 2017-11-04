$(document).ready(function() {
  /**
   * @description 这是将要用到的全局变量
   * @param {number} count 用来记录玩家一共走了多少步或者说点击了多少次卡片
   * @param {array} clickedItems 上两次点击的卡片
   * @param {array} matchedItems 如果上两次点击的卡片相匹配,就把它们从 clickedItems 中取出来存进这里
   * @param {string} timer 这个 timer 在接下来的开始计时函数 startTimer
   * 和结束计时函数 stopTimer 中会作为 setInterval 返回的ID重新赋值和使用
   */
  let globeVariables = {
    count : 0,
    clickedItems : [],
    matchedItems : [],
    timer : ''
  };

  /**
   *  @description 每次创建或者重启游戏重新初始化全局变量,以防止上一局的游戏变量污染
   */
  function initialize() {
    globeVariables.count = 0;
    globeVariables.clickedItems = [];
    globeVariables.matchedItems = [];
    globeVariables.timer = '';
  }

  /**
   *  @description 创建游戏，调用 shuffle(array) 对卡片洗牌,调用 licensing(array) 将卡片发到游戏面板的相应 html 位置上
   */
  function buildGame() {
    initialize();

    let array = [
      'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt',
      'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle',
      'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb',
      'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'
    ]

    shuffle(array);
    licensing(array);
  }

  /**
   *  @description 洗牌函数,每一次运行都会将以随机数为索引的卡片与  array[currentIndex] 交换以将一组卡片的顺序打乱
   *  @param {array} array 一组卡片的内容组成的数组
   */
  function shuffle(array) {
    let currentIndex = array.length,
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

  /**
   * @description 将卡片的内容填充到页面的对应 html 位置中,以随机分配卡片的位置
   */
  function licensing(array) {
    cards = $('.card');
    $.each(cards, function(index, value) {
      $($('.card')[index]).find('i').attr('class', array[index]);
    });
  }

  buildGame();

  /**
   * @description 玩家点击第一张牌游戏就开始，然后计时器计时
   * setInterval 函数使每一秒使计时器的结果都增加一秒
   * 如果秒数够 60 秒,就把它转换成分钟数,并把秒数清零
   * 出于显示目的,如果用了 9 分钟,分钟数就显示 '09',而不是 '9'
   * 出于显示目的,如果用了 9 秒钟,秒数也显示 '09',而不是 '9'
   * 最后在游戏面板上显示游戏用时,并根据用时计算得到多少星
   */
  function startTimer() {
    let minute = 0,
        second = 1,
        timerDisplay = '';

    globeVariables.timer = setInterval(function() {
      if (second % 60 == 0) {
        minute += 1;
        second = 0;
      }
      if (minute < 10) {
        second < 10 ? timerDisplay = ('0' + minute + ':' + '0' + second) : timerDisplay = ('0' + minute + ':' + second);
      } else {
        second < 10 ? timerDisplay = (minute + ':' + '0' + second) : timerDisplay = (minute + ':' + second);
      }
      second += 1;
      showTime(timerDisplay);
      getStar(second);
    }, 1000);
  }

  /**
   * @description 在游戏面板上显示游戏用时
   */
  function showTime(timerDisplay) {
    $('#timer').text(timerDisplay);
  }

  /**
   * @description 游戏结束根据游戏用时计算星级成绩
   * 用时低于 15 秒得 3 星,记分板显示三颗实心星
   * 大于 15 秒小于等于 30 秒得 2 星,记分板第三颗实心星被替换为空心星
   * 大于 30 秒得一星,记分板第三颗和第二颗实心星都被替换为空心星
   */
  function getStar(second) {
    if (second > 0 && second <= 15) {
      $('#final-stars').text('3');
    } else if (second > 15 && second <= 30) {
      $('#final-stars').text('2');
      $('.stars').children('li').eq(2).children('i').attr('class', 'fa fa-star-o');
    } else if (second > 30) {
      $('#final-stars').text('1');
      $('.stars').children('li').eq(2).children('i').attr('class', 'fa fa-star-o');
      $('.stars').children('li').eq(1).children('i').attr('class', 'fa fa-star-o');
    }
  }

  /**
   * @description 停止计时
   */
  function stopTimer() {
    clearInterval(globeVariables.timer);
  }

  /**
   * @description 重置计时器
   */
  function resetTimer() {
    stopTimer();
    $('#timer').text('00:00');
  }

  /**
   * @description 监听卡片的单击事件
   * 如果在一盘游戏中第一次点击卡片,就调用 startTimer 函数开始计时,否则直接往下执行代码
   * increaseCount 函数点击卡片一次就增加一次点击 moves 总次数
   * totalClick 函数显示点击 moves 总次数
   * 如果卡片被翻过来,就用 lockCard 函数将它锁起来防止被第二次点击从而二次触发 JS 代码效果
   * 并将它加入已打开卡片列表
   * 然后将已经翻转过来的卡片加入 globeVariables.clickedItems 数组
   * 如果 globeVariables.clickedItems 数组元素个数为奇数,调用 displayCard 函数直接将卡片翻转过来
   * 如果 globeVariables.clickedItems 数组元素个数为偶数,调用 checkMatch 函数查看这次翻转的卡片与上一张卡片是否匹配
   */
  $('.card').on('click', function() {
    if ($('.moves').text() == '0') {
      startTimer();
    }
    $this = $(this);
    increaseCount();
    totalClick();
    lockCard($this);
    storeOpenedCards($this);
    if (globeVariables.clickedItems.length % 2 != 0) {
      displayCard($this);
    } else {
      checkMatch($this);
    }
  })

  /**
   * @description 函数点击卡片一次就增加一次点击 moves 总次数
   */
  function increaseCount() {
    globeVariables.count += 1;
  }

  /**
   * @description 显示点击 moves 总次数
   */
  function totalClick() {
    $('.moves').text(globeVariables.count);
  }

  /**
   * @description 如果卡片被翻过来,就将它锁起来防止被第二次点击从而二次触发 JS 代码效果
   */
  function lockCard($this) {
    $this.toggleClass('disable');
  }

  /**
   * @description 如果卡片被翻过来,就将它加入已打开卡片列表
   */
  function storeOpenedCards($this) {
    globeVariables.clickedItems.push($this);
  }

  /**
   * @description 将卡片翻转过来并增加动画效果
   */
  function displayCard($this) {
    $this.addClass('open').addClass('show')
  }

  /**
   * @description 查看这次翻转的卡片与上一张卡片是否匹配
   * 在检查卡片期间先把屏幕锁住,不再接受单击事件
   * 检查规则:如果两张卡片匹配, matchProcess() 触发匹配的动画效果
   * 并将匹配卡片加入 globeVariables.matchedItems 数组中
   * 调用 checkGameWin 查看游戏是否胜利
   * 否则触发不匹配的动画效果并将两张卡重新盖住
   * 否则 mismatchProcess() 触发不匹配的动画效果并将两张卡重新盖住
   * 匹配检查完成后 500ms 解锁屏幕,接受单击事件
   */
  function checkMatch($this) {
    $('.deck').toggleClass('disable');
    if ($this.children().attr('class') == globeVariables.clickedItems[globeVariables.clickedItems.length - 2].children().attr('class')) {
      matchProcess();
      storeMatchedItems();
      checkGameWin();
    } else {
      mismatchProcess();
    }
    setTimeout(function() {
        $('.deck').toggleClass('disable');
    }, 500);
  }

  /**
   * @description 卡片匹配的动画效果
   */
  function matchProcess() {
    $.each(globeVariables.clickedItems, function() {
      $(this).removeClass('open').addClass('li-match');
      $(this).children().addClass('i-match');
    })
  }

  /**
   * @description 卡片不匹配的动画效果
   */
  function mismatchProcess() {
    $.each(globeVariables.clickedItems, function() {
      $(this).removeClass('open').removeClass('show').removeClass('disable')
      $(this).addClass('mismatch');
      setTimeout(function() {
        $.each(globeVariables.clickedItems, function(i, v) {
          $(this).removeClass('mismatch')
          globeVariables.clickedItems.splice(i, 1);
        })
      }, 500);
    })
  }

  /**
   * @description 将互相匹配的卡片加入 globeVariables.matchedItems 数组中
   */
  function storeMatchedItems() {
    globeVariables.matchedItems.push(globeVariables.clickedItems.pop());
    globeVariables.matchedItems.push(globeVariables.clickedItems.pop());
  }

  /**
   * @description 如果 matchedItems 数组中匹配成功的数目达到 16 就表示游戏胜利
   * 游戏面板隐藏,胜利面板出现
   * 调用 stopTimer 停止游戏计时
   * 显示胜利的动画效果
   * 显示游戏步数用时和游戏成绩星级
   */
   function checkGameWin() {
     if (globeVariables.matchedItems.length == 16) {
       setTimeout(function() {
         $('#playing').css('display', 'none');
         $('#success').css('display', 'flex');
         $('#final-moves').text(globeVariables.count);
         $('#final-time').text($('#timer').text());
         stopTimer();
         setTimeout(function() {
           $('.circle-loader').toggleClass('load-complete');
           $('.checkmark').toggle();
         }, 500);
       }, 1000);
     }
   }

  /**
   * @description 再玩一次游戏
   * 隐藏游戏胜利面板,显示游戏面板
   */
  $('#play-again').on('click', function() {
    window.location.reload();
    $('#playing').css('display', 'flex');
    $('#success').css('display', 'none');
  })

  /**
   * @description 重新开始一次游戏
   * 先重置计时器
   * 再把所有卡片重新盖起来,去除因打开卡片而增加的样式
   * 清空游戏步数 moves
   * 最后重新建立游戏
   */
  $('.restart').on('click', function() {
    resetTimer();
    $('.card').removeClass().addClass('card').removeAttr('style');
    $('.moves').text(0);
    buildGame();
  })

})
