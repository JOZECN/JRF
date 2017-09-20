$(function () {
  $('.product-sort').hover(function () {
    $(this).children('.product-sort-cover').animate({top: '50%'}, "slow");
    $(this).children('.product-sort-cover').children('.product-sort-description').animate({opacity: '1'}, 'slow');
  },function () {
    $(this).children('.product-sort-cover').animate({top: '80%'}, "slow");
    $(this).children('.product-sort-cover').children('.product-sort-description').animate({opacity: '0'}, 'slow');
  })
})