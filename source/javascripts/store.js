document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preloader");
  let contactFields = document.querySelectorAll(".contact-form-group input, .contact-form-group textarea");
  contactFields.forEach(function (contactField) {
    contactField.removeAttribute("tabindex");
  });
});

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
    var elements = $('.all-similar-products').children();
    var num_to_display = 3;
    for (var i=0; i<num_to_display && i<elements.length; i++) {
      $('.similar-product-list').append(elements.eq(i));
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
      var leftGradient = themeColors.leftGradientColor;
      var rightGradient = themeColors.rightGradientColor;
      var gradientStyle = "linear-gradient(140deg,"+leftGradient+" 20%, "+rightGradient+" 70%)";
      element.css("background",gradientStyle);
    });
    return this;
  };
}( jQuery ));

$('.gradient').drawGradient();

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
  $(this).attr('aria-expanded', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
  $('.category-nav-items').attr('aria-hidden', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
})

$('.open-menu').click(function() {
  $(this).toggleClass('is-active');
  $('.sidebar').toggleClass('opened');
  $('body').toggleClass('no-scroll');
})

var processUpdate = function(input, item_id, new_val, cart) {
  var sub_total = formatMoney(cart.total, true, true);
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
    $('.open-mini-cart').attr("aria-expanded","false");
    $('.mini-cart-container').attr("aria-hidden","true");
  }
  if (hideOrShow == 'show') {
    if (window_width <= 1024) {
      $('body').addClass('no-scroll');
    }
    $('.mini-cart-container').addClass('opened');
    $('.open-mini-cart').attr("aria-expanded","true");
    $('.mini-cart-container').attr("aria-hidden","false");
    $('.cart-close').focus();
  }
}

$(window).on('load resize', function() {
  setSidebarPosition();
  $('.mini-cart-container').height(window.innerHeight+'px');
});

window.addEventListener("orientationchange", function() {
  setSidebarPosition();
  $('.mini-cart-container').height(window.innerHeight+'px');
}, false);

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
  var sub_total = formatMoney(cart.total, true, true);
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
  if (pageType === 'cart') {
    showBnplMessaging(cart.total, { alignment: 'center', displayMode: 'flex', pageType: 'cart' });
  } else if (pageType === 'product') {
    showBnplMessaging(price, { alignment: 'left', displayMode: 'grid', pageType: 'product' });
  }
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

function updateInventoryMessage(optionId = null) {
  const product = window.bigcartel.product;
  const messageElement = document.querySelector('[data-inventory-message]');

  if (
    !themeOptions?.showLowInventoryMessages ||
    !messageElement
  ) {
    return;
  }

  messageElement.textContent = '';
  const productOptions = product?.options || [];

  // If no option is selected (initial page load or reset) or product has no options
  if (!optionId) {
    const hasOptionWithStatus = (status) => 
      productOptions.length > 0 && 
      productOptions.some(option => 
        option && 
        !option.sold_out && 
        option[status]
      );

    // Single option product - check both statuses
    if (productOptions.length === 1) {
      const option = productOptions[0];
      if (option && !option.sold_out) {
        if (option.isAlmostSoldOut) {
          messageElement.textContent = themeOptions.almostSoldOutMessage;
        } else if (option.isLowInventory) {
          messageElement.textContent = themeOptions.lowInventoryMessage;
        }
      }
      return;
    }

    // Multiple options - only check for low inventory across all options
    if (productOptions.length > 1 && hasOptionWithStatus('isLowInventory')) {
      messageElement.textContent = themeOptions.lowInventoryMessage;
    }
    return;
  }

  // Handle selected option
  const selectedOption = product.options.find(option => option.id === parseInt(optionId));
  if (!selectedOption || selectedOption.sold_out) return;

  // For selected options:
  // - Single option products: check both almost sold out and low inventory
  // - Multiple option products: check both statuses when specific option selected
  if (selectedOption.isAlmostSoldOut) {
    messageElement.textContent = themeOptions.almostSoldOutMessage;
  } else if (selectedOption.isLowInventory) {
    messageElement.textContent = themeOptions.lowInventoryMessage;
  }
}

function enableAddButton(updated_price) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  addButton.attr("disabled",false);
  if (updated_price) {
    priceTitle = ' - ' + formatMoney(updated_price, true, true);
  }
  else {
    priceTitle = '';
  }
  addButton.html(addButtonTitle + priceTitle);
  updateInventoryMessage($('#option').val());
  showBnplMessaging(updated_price, { alignment: 'left', displayMode: 'grid', pageType: 'product' });
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

document.addEventListener("DOMContentLoaded", function () {
  const welcomeButton = document.querySelector(".welcome-messaging .button");
  if (welcomeButton) {
    welcomeButton.addEventListener("click", function (event) {
      console.log(themeOptions.welcomeButtonBehavior);
      if (themeOptions.welcomeButtonBehavior === "scroll") {
        event.preventDefault();
        const targetElement = document.querySelector("#main");
        if (targetElement) {
          smoothScroll(targetElement, 1000, 50);
        }
      }
    });
  }

  const pageType = document.body.getAttribute('data-bc-page-type');
  
  // Handle cart page
  if (pageType === 'cart') {
    Cart.refresh((cart) => {
      if (cart?.total) {
        showBnplMessaging(cart.total, { alignment: 'center', displayMode: 'flex', pageType: 'cart' });
      }
    });
  }

  // Handle product page
  if (pageType === 'product') {
    updateInventoryMessage();
    
    const price = window.bigcartel?.product?.default_price || null;    
    showBnplMessaging(price, { alignment: 'left', displayMode: 'grid', pageType: 'product' });
  }
});


