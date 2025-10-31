// Helper function for responsive BNPL messaging options on product pages
function getProductPageMessagingOptions() {
  const isMobile = window.innerWidth < 1024;
  return {
    alignment: isMobile ? 'center' : 'left',
    displayMode: isMobile ? 'flex' : 'grid',
    pageType: 'product'
  };
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preloader");
  let contactFields = document.querySelectorAll(".contact-form-group input, .contact-form-group textarea");
  contactFields.forEach(function (contactField) {
    contactField.removeAttribute("tabindex");
  });
});

if ($('.announcement-message-text').length) {
  var announcementMessage = $('.announcement-message-text').first().html();
  var hashedMessage = announcementMessage.hashCode();
  var cookieValue = getCookie('hide-announcement-message');
  var isScrolling = $('.announcement-message').hasClass('announcement-message--scrolling');

  // For scrolling announcements, always show them (bypass cookie check)
  // For non-scrolling announcements, check the cookie
  if (isScrolling) {
    $('body').addClass('has-announcement-message');
    if (!$('body').hasClass('has-header-message')) {
      $('body').addClass('has-header-message')
    }
  } else {
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
}

$('.announcement-message-close').on('click', function(e) {
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

$('.shrink-label').on('focus', function(){
  $(this).parents('.form-group').addClass('focused');
});

$('.shrink-label').on('blur', function(){
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

$('.category-nav-title').on('click', function() {
  $('.category-nav-items').slideToggle('fast');
  $(this).attr('aria-expanded', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
  $('.category-nav-items').attr('aria-hidden', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
})

$('.open-menu').on('click', function() {
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
  $('.cart-num-items').html(item_count);

  // Trigger mobile pulse animation
  $('.header-cart-count').addClass('cart-count-updated');
  setTimeout(function() {
    $('.header-cart-count').removeClass('cart-count-updated');
  }, 400);

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
    for (var itemIndex = 0; itemIndex < cart.items.length; itemIndex++) {
      if (cart.items[itemIndex].id == item_id) {
        var item_price = cart.items[itemIndex].price;
        var formatted_item_price = formatMoney(item_price, true, true);
        var priceElement = document.querySelector('.cart-item-details-price__update[data-item-id="'+item_id+'"]');
        if (priceElement) {
          priceElement.innerHTML = formatted_item_price;
        }
      }
    }
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
  $('.cart-num-items').html(item_count);

  // Trigger mobile pulse animation
  $('.header-cart-count').addClass('cart-count-updated');
  setTimeout(function() {
    $('.header-cart-count').removeClass('cart-count-updated');
  }, 400);

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
  const pageType = document.body.getAttribute('data-bc-page-type');
  if (pageType === 'cart') {
    showBnplMessaging(cart.total, { alignment: 'center', displayMode: 'flex', pageType: 'cart' });
  } else if (pageType === 'product') {
    const price = window.bigcartel?.product?.default_price || null;
    showBnplMessaging(price, getProductPageMessagingOptions());
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

// Track the reset timer to prevent conflicts when clicking rapidly
var addToCartResetTimer = null;

$('.product-form').on('submit', function(e) {
  e.preventDefault();
  var quantity = 1
  , itemID = $("#option").val()
  , addButton = $('.add-to-cart-button')
  , cartLinkContainer = $('.product-form-cart-link-container')
  if (addButton.length) {
    var addMethod = addButton;
    var updateElement = addButton;
    var addText = addButton.attr('data-add-title');
  }
  var addedText = addMethod.data('added-text')
  , addingText = addMethod.data('adding-text')
  if (!addMethod.hasClass('adding')) {
    if (quantity > 0 && itemID > 0) {
      // Clear any pending reset timer from previous click
      if (addToCartResetTimer) {
        clearTimeout(addToCartResetTimer);
        addToCartResetTimer = null;
      }

      addMethod.addClass('adding');
      addMethod.blur();
      Cart.addItem(itemID, quantity, function(cart) {
        setTimeout(function() {
          updateElement.html(addingText);
          setTimeout(function() {
            updateElement.html(addedText);
            // Only animate if the cart link hasn't been shown yet
            if (!cartLinkContainer.hasClass('cart-link-shown')) {
              cartLinkContainer.addClass('cart-link-shown');
              cartLinkContainer.slideDown('fast');
            }
            updateCart(cart);
            addMethod.removeClass('adding');
            addToCartResetTimer = setTimeout(function() {
              updateElement.html(addText);
              addToCartResetTimer = null;
            }, 1500)
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
  const product = window.bigcartel?.product;
  const messageElement = document.querySelector('[data-inventory-message]');

  if (
    !themeOptions?.showLowInventoryMessages ||
    !messageElement
  ) {
    return;
  }

  // Guard against race condition - product data may not be loaded yet
  if (!product) {
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
  // Only hide top border for single option case (not when product_option_groups exists)
  if ($('.product_option_groups').length === 0) {
    addButton.css("border-top-width","0");
  } else {
    addButton.css("border-top-width","");
  }
  if (updated_price) {
    priceTitle = ' - ' + formatMoney(updated_price, true, true);
  }
  else {
    priceTitle = '';
  }
  addButton.html(addButtonTitle + priceTitle);
  updateInventoryMessage($('#option').val());
  showBnplMessaging(updated_price, getProductPageMessagingOptions());
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
    if (themeOptions.showSoldOutOptions === false) {
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
      } else if (themeOptions.welcomeButtonBehavior === "navigate") {
        if (isExternalLink(welcomeButton.href)) {
          event.preventDefault();
          window.open(welcomeButton.href, '_blank', 'noopener,noreferrer');
        }
        // Let internal links use template's href naturally
      }
    });
  }

  // Handle separate button and image link functionality
  const isHomePage = document.body.getAttribute('data-bc-page-type') === 'home';
  const welcomeImageLink = themeOptions.welcomeImageLink && themeOptions.welcomeImageLink.trim() !== '' ? themeOptions.welcomeImageLink : null;

  // Make welcome image clickable if welcomeImageLink is configured and no button is shown
  if (isHomePage && !welcomeButton && welcomeImageLink) {
    const welcomeImage = document.querySelector(".welcome-image img");
    if (welcomeImage) {
      welcomeImage.classList.add("welcome-clickable");
      welcomeImage.setAttribute("role", "button");
      welcomeImage.setAttribute("aria-label", "Navigate to " + welcomeImageLink);
      welcomeImage.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isExternalLink(welcomeImageLink)) {
          window.open(welcomeImageLink, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = welcomeImageLink;
        }
      });
    }
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
    showBnplMessaging(price, getProductPageMessagingOptions());
  }
});

// Viewport resize handler for responsive BNPL messaging on product pages
(function() {
  let lastWidth = window.innerWidth;
  let resizeTimeout;
  const BREAKPOINT = 1024;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const currentWidth = window.innerWidth;
      const pageType = document.body.getAttribute('data-bc-page-type');

      // Only re-render on product pages when crossing the 1024px threshold
      if (pageType === 'product') {
        const crossedThreshold =
          (lastWidth < BREAKPOINT && currentWidth >= BREAKPOINT) ||
          (lastWidth >= BREAKPOINT && currentWidth < BREAKPOINT);

        if (crossedThreshold) {
          const price = window.bigcartel?.product?.default_price || null;
          if (price) {
            // Force re-render even though price hasn't changed (alignment is changing)
            const options = getProductPageMessagingOptions();
            options.forceRender = true;
            showBnplMessaging(price, options);
          }
          lastWidth = currentWidth;
        }
      }
    }, 250);
  });
})();

// Hybrid announcement pause: hover on desktop, tap-to-toggle on mobile, focus for keyboard
document.addEventListener('DOMContentLoaded', () => {
  const announcement = document.querySelector('.announcement-message--scrolling');

  if (!announcement) return;

  const scrollContent = announcement.querySelector('.announcement-message__scroll-content');
  const firstText = announcement.querySelector('.announcement-message-text');

  // Calculate exact scroll distance for seamless looping
  function updateScrollDistance() {
    if (scrollContent && firstText) {
      // Get the width of one text block including its spacing
      const textWidth = firstText.offsetWidth;

      // Set CSS variable with exact pixel distance to scroll
      // This ensures perfectly seamless looping regardless of content length
      scrollContent.style.setProperty('--scroll-distance', `-${textWidth}px`);
    }
  }

  // Initial calculation
  updateScrollDistance();

  // Recalculate on resize (debounced to avoid performance issues)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateScrollDistance, 150);
  });

  // Add tap-to-toggle for all devices (primarily for touch devices)
  // Desktop users can still use hover (handled by CSS), but click also works as backup
  let isPaused = false;

  announcement.addEventListener('click', (e) => {
    // Don't toggle if user clicked a link - let the link work normally
    if (e.target.closest('a')) return;

    // Toggle pause state
    isPaused = !isPaused;
    announcement.classList.toggle('is-paused', isPaused);
  });
});
