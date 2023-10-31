document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preloader");
  let contactFields = document.querySelectorAll(".contact-form-group input, .contact-form-group textarea");
  contactFields.forEach(function (contactField) {
    contactField.removeAttribute("tabindex");
  });
});

var isGreaterThanZero = function(currentValue) {
  return currentValue > 0;
}

function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

function unique(item, index, array) {
  return array.indexOf(item) == index;
}

function cartesianProduct(a) {
  var i, j, l, m, a1, o = [];
  if (!a || a.length == 0) return a;
  a1 = a.splice(0, 1)[0];
  a = cartesianProduct(a);
  for (i = 0, l = a1.length; i < l; i++) {
    if (a && a.length) for (j = 0, m = a.length; j < m; j++)
      o.push([a1[i]].concat(a[j]));
    else
      o.push([a1[i]]);
  }
  return o;
}

Array.prototype.equals = function (array) {
  if (!array)
    return false;
  if (this.length != array.length)
    return false;
  for (var i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
}

// From https://github.com/kevlatus/polyfill-array-includes/blob/master/array-includes.js
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

Array.prototype.count = function (filterMethod) {
  return this.reduce(function (count, item) {
    return filterMethod(item) ? count + 1 : count;
  }, 0);
};

/* Announcement Message */

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name+'=; Max-Age=-99999999;';
}
function getRandomIndex(elements) {
  return Math.floor(Math.random() * elements.length);
}

if ($('.announcement-message-text').length) {
  var announcementMessage = $('.announcement-message-text').html();
  var hashedMessage = announcementMessage.hashCode();
  var cookieValue = getCookie('hide-announcement-message');
  if (cookieValue) {
    if (cookieValue != hashedMessage) {
      $('body').addClass('has-announcement-message');
      if (!$('body').hasClass('has-header-message')) {
        $('body').addClass('has-header-message')
      }
    }
  }
  else {
    $('body').addClass('has-announcement-message');
    if (!$('body').hasClass('has-header-message')) {
      $('body').addClass('has-header-message')
    }
  }
}

$('.announcement-message-close').click(function(e) {
  $('.announcement-message').slideUp('fast', function() {
    $('body').removeClass('has-announcement-message');
    if ($('body').hasClass('has-header-message')) {
      if ($('.errors').length == 0) {
        $('body').removeClass('has-header-message')
      }
    }
    setCookie('hide-announcement-message',hashedMessage,7);
  });
})

$(document).ready(function() {
  if ($('.all-similar-products').length) {
    var num_products = $('.all-similar-products > a').length;
    var elements = $('.all-similar-products').children().toArray();
    var num_to_display = 3;
    for (var i=1; i<=num_to_display; i++) {
      var randomIndex = getRandomIndex(elements);
      $('.similar-product-list').append($('.all-similar-products').children().eq(randomIndex));
      elements.splice(randomIndex, 1);
      $('.similar-product-list .similar-product-list-image').each(function() {
        $(this).attr("src",$(this).data("src"));
      })
    }
    $('.all-similar-products').remove();
  }
});



/* Gradients */

(function( $ ) {
  $.fn.drawGradient = function() {
    this.filter( ".gradient" ).each(function() {
      var element = $(this);
      var primaryGradient = themeOptions.primaryGradientColor;
      var secondaryGradient = themeOptions.secondaryGradientColor;
      var gradientStyle = "linear-gradient(140deg,"+primaryGradient+" 20%, "+secondaryGradient+" 70%)";
      element.css("background",gradientStyle);
    });
    return this;
  };
}( jQuery ));

$('.gradient').drawGradient();

function hexToRGB(h) {
  let r = 0, g = 0, b = 0;
  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return "rgb("+ +r + "," + +g + "," + +b + ")";
}

/* Shrinking labels */

$('.contact-form input, .contact-form textarea').addClass('shrink-label');

$('.shrink-label').focus(function(){
  $(this).parents('.form-group').addClass('focused');
});

$('.shrink-label').blur(function(){
  var inputValue = $(this).val();
  if (inputValue.length == 0) {
    $(this).removeClass('filled');
    $(this).parents('.form-group').removeClass('focused');
  } else {
    $(this).addClass('filled');
  }
})

$(document).ready(function() {
  if ($('.shrink-label').length) {
    $('.shrink-label').each(function(){
      var inputValue = $(this).val();
      if (inputValue) {
        $(this).addClass('filled');
        $(this).parents('.form-group').addClass('focused');
      }
    });
    autoExpand($('textarea')[0]);
  }
});
document.addEventListener('input', function (event) {
  if (event.target.tagName.toLowerCase() !== 'textarea') return;
  autoExpand(event.target);
}, false);

function autoExpand(textarea) {
  if (textarea) {
    if (textarea.value) {
      textarea.style.height = 'inherit';
      var height = textarea.scrollHeight;
      textarea.style.height = height + 'px';
    }
  }
};

/* Sticky features */

$(document).ready(function(){
  $(".desktop-cart").sticky({
    topSpacing: '0',
    getWidthFrom: '.wrap',
    zIndex: '200',
    wrapperClassName: 'sticky-cart',
    responsiveWidth: true
  });
  $(".mobile-header").sticky({
    topSpacing: '0',
    getWidthFrom: 'body',
    zIndex: '200',
    wrapperClassName: 'sticky-mobile-header',
    responsiveWidth: true
  });
  $(".desktop-header-store-name").sticky({
    topSpacing: '0',
    getWidthFrom: '.wrap',
    zIndex: '200',
    wrapperClassName: 'sticky-store-name',
    responsiveWidth: true
  });

});

$('.category-nav-title').click(function() {
  $('.category-nav-items').slideToggle('fast');
})

$('.open-menu').click(function() {
  $(this).toggleClass('is-active');
  $('.sidebar').toggleClass('opened');
  $('body').toggleClass('no-scroll');
})

var processUpdate = function(input, item_id, new_val, cart) {
  var sub_total = Format.money(cart.total, true, true);
  var item_count = cart.item_count;
  $('.header-cart-total').html(sub_total);
  $('.cart-subtotal-amount-value').html(sub_total);
  $('.header-cart-count').html(item_count);
  if (item_count == 0) {
    $('.cart-form').slideUp('fast',function() {
      toggleMiniCart('hide');
      $('.cart-empty-message').fadeIn('fast');
      $('.cart-container h1').remove();
      $('.cart-value').html('0');
      $('.cart-container').addClass('empty-cart');
      $("html, body").animate({ scrollTop: 0 }, "fast");
    });
    $('.mini-cart-container').addClass('empty-cart');
  }
  else {
    $('.errors').hide();
    $('.mini-cart-container').removeClass('empty-cart');
    input.val(new_val);
  }
  if (new_val > 0) {

  }
  else {
    $('.cart-item[data-item-id="'+item_id+'"]').slideUp('fast');
  }
  return false;
}
grid = document.querySelector('.masonry');
var $grid = $('.masonry').masonry({
  transitionDuration: '0.4s',
  percentPosition: true
});

$grid.imagesLoaded().progress( function() {
  $grid.masonry('layout');
});

function toggleMiniCart(hideOrShow) {
  window_width = $(window).width();
  if (hideOrShow == 'hide') {
    if (window_width <= 1024) {
      $('body').removeClass('no-scroll');
    }
    $('.mini-cart-container').removeClass('opened');
  }
  if (hideOrShow == 'show') {
    if (window_width <= 1024) {
      $('body').addClass('no-scroll');
    }
    $('.mini-cart-container').addClass('opened');
  }
}

setupFeaturedCategories();

$(window).on('load resize', function() {
  setSidebarPosition();
  setupFeaturedCategories();
  $('.mini-cart-container').height(window.innerHeight+'px');
});

window.addEventListener("orientationchange", function() {
  setSidebarPosition();
  setupFeaturedCategories();
  $('.mini-cart-container').height(window.innerHeight+'px');
}, false);

function setupFeaturedCategories() {
  if ($('.featured').length) {
    var featured_image_height = $('.featured-image').height();
    var featured_images_width = $('.featured-images').width();
    var featured_image_container_width = $('.featured-image-container').width();

    if ($(window).width() <= 768) {
      $('.featured-image').css('height',featured_images_width+'px');
      $('.featured-image').css('width',featured_images_width+'px');
      $('.featured-image-container').css('height',featured_image_container_width -40+'px');
      $('.feature-text').css('margin-top',featured_image_container_width+20+'px')
    }
    else {
      $('.featured-image').css('height','calc(100% + 4px)');
      $('.featured-image').css('width',featured_image_height+'px');
      $('.featured-image-container').css('height','auto');
      $('.feature-text').css('margin-top','0')
    }

    if ($('.featured-item-2').length && $('.product-list').length) {
      featured_element = $('.featured-item-2');
      num_insert_after = 0;
      if ($(window).width() > 1024) {
        num_products_per_row = $('.product-list').attr("data-per-row");
        if (num_products_per_row == 1) { num_insert_after = 1; }
        if (num_products_per_row == 2) { num_insert_after = 4; }
        if (num_products_per_row == 3) { num_insert_after = 9; }
      }
      else {
        num_products_per_row = $('.product-list').attr("data-per-row-mobile")
        if (num_products_per_row == 1) { num_insert_after = 2; }
        if (num_products_per_row == 2) { num_insert_after = 4; }
      }
      if (num_insert_after > 0 && $('.product-list-item-'+num_insert_after).length) {
        insert_after_element = $('.product-list-item-'+num_insert_after)
        featured_element.insertAfter(insert_after_element)
      }
      else {
        featured_element.insertAfter('.product-list');
      }

      if ($('.product-list').hasClass('masonry')) {
        $grid.masonry('reloadItems')
      }
    }

  }
}

function setSidebarPosition() {
  var offset = $('.mobile-header').position().top + $('.mobile-header').outerHeight(true);
  if ($(window).width() <= 1024) {
    $('.sidebar').css('top',offset+'px');
  }
  else {
    $('.sidebar').css('top',0);
  }
}

$('body')
  .on( 'click','.cart-close', function(e) {
    e.preventDefault();
    toggleMiniCart('hide');
  })
  .on( 'click','.open-mini-cart', function(e) {
    e.preventDefault();
    toggleMiniCart('show');
  })
  .on( 'click','.qty-button', function(e) {
    e.preventDefault();
    var $t = $(this)
    , input = $(this).parent().find('input')
    , val = parseInt(input.val())
    , valMin = 1
    , item_id = $(this).parent().data("item-id");
    if (isNaN(val) || val < valMin) {
      var new_val = valMin;
    }
    if ($t.data('func') == 'plus') {
      var new_val = val + 1;
    }
    else {
      if (val > valMin) {
        var new_val = val - 1;
      }
    }
    if (new_val > 0) {
      Cart.updateItem(item_id, new_val, function(cart) {
        processUpdate(input, item_id, new_val, cart);
      });
    }
    else {
      Cart.removeItem(item_id, function(cart) {
        processUpdate(input, item_id, 0, cart);
      });
    }
  })
  .on( 'blur','.option-quantity', function(e) {
    var item_id = $(this).parent().data("item-id");
    var new_val = $(this).val();
    var input = $(this);
    Cart.updateItem(item_id, new_val, function(cart) {
      processUpdate(input, item_id, new_val, cart);
    });
  })

var updateCart = function(cart) {
  var sub_total = Format.money(cart.total, true, true);
  var item_count = cart.item_count;
  $('.header-cart-total').html(sub_total);
  $('.cart-subtotal-amount-value').html(sub_total);
  $('.header-cart-count').html(item_count);
  $('.cart-container').removeClass('empty-cart');
  var $container = $('.mini-cart-container');
  var window_width = $(window).width();
  $container.load("/cart?" + $.now() + " .cart-container > *", function() {
    if (window_width > 800) {
      if (!$('.mini-cart').is(':visible')) {
        toggleMiniCart('show')
      }
    }
  });
}

$('.main-carousel').flickity({
  cellAlign: 'left',
  contain: true,
  imagesLoaded: true,
  freeScroll: true,
  prevNextButtons: false,
  resize: true,
  adaptiveHeight: true,
});

$('.product-form').submit(function(e) {
  e.preventDefault();
  var quantity = 1
  , itemID = $("#option").val()
  , addButton = $('.add-to-cart-button')
  if (addButton.length) {
    var addMethod = addButton;
    var updateElement = addButton;
    var addText = addButton.html();
  }
  var addedText = addMethod.data('added-text')
  , addingText = addMethod.data('adding-text')
  if (!addMethod.hasClass('adding')) {
    if (quantity > 0 && itemID > 0) {
      addMethod.addClass('adding');
      addMethod.blur();
      Cart.addItem(itemID, quantity, function(cart) {
        setTimeout(function() {
          updateElement.html(addingText);
          setTimeout(function() {
            updateElement.html(addedText);
            updateCart(cart);
            addMethod.removeClass('adding');
            setTimeout(function() {
              updateElement.html(addText);
            }, 900)
          }, 600);
        }, 300);
      });
    }
  }
});

$('.product_option_select').on('change',function() {
  var option_price = $(this).find("option:selected").attr("data-price");
  enableAddButton(option_price);
});

function enableAddButton(updated_price) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  addButton.attr("disabled",false);
  if (updated_price) {
    priceTitle = ' - ' + Format.money(updated_price, true, true);
  }
  else {
    priceTitle = '';
  }
  addButton.html(addButtonTitle + priceTitle);
}

function disableAddButton(type) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  if (type == "sold-out") {
    var addButtonTitle = addButton.attr('data-sold-title');
  }
  if (!addButton.is(":disabled")) {
    addButton.attr("disabled","disabled");
  }
  addButton.html(addButtonTitle);
}

function enableSelectOption(select_option) {
  select_option.removeAttr("disabled");
  select_option.text(select_option.attr("data-name"));
  select_option.removeAttr("disabled-type");
  if ((select_option.parent().is('span'))) {
    select_option.unwrap();
  }
}
function disableSelectOption(select_option, type) {
  if (type === "sold-out") {
    disabled_text = select_option.parent().attr("data-sold-text");
    disabled_type = "sold-out";
    if (show_sold_out_product_options === 'false') {
      hide_option = true;
    }
    else {
      hide_option = false;
    }
  }
  if (type === "unavailable") {
    disabled_text = select_option.parent().attr("data-unavailable-text");
    disabled_type = "unavailable";
    hide_option = true;
  }
  if (select_option.val() > 0) {
    var name = select_option.attr("data-name");
    select_option.attr("disabled",true);
    select_option.text(name + ' ' + disabled_text);
    select_option.attr("disabled-type",disabled_type);
    if (hide_option === true) {
      if (!(select_option.parent().is('span'))) {
        select_option.wrap('<span>');
      }
    }
  }
}