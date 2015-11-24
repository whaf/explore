/*! http://mths.be/placeholder v2.0.8 by @mathias */
;(function(window, document, $) {

	// Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (exception) {}
	}

}(this, document, jQuery));

// auto resize text to fit in element

(function ($) {
  $.fn.getTextWidth = function() {
    var spanText = $("BODY #spanCalculateTextWidth");

    if (spanText.size() <= 0) {
      spanText = $("<span id='spanCalculateTextWidth' style='filter: alpha(0);'></span>");
      spanText.appendTo("BODY");
    }

    var valu = this.val();
    if (!valu) valu = this.text();

    spanText.text(valu);

    spanText.css({
      "fontSize": this.css('fontSize'),
      "fontWeight": this.css('fontWeight'),
      "fontFamily": this.css('fontFamily'),
      "position": "absolute",
      "top": 0,
      "opacity": 0,
      "left": -2000
    });

    return spanText.outerWidth() + parseInt(this.css('paddingLeft')) + 'px';
  };

  $.fn.getTextHeight = function(width) {
    var spanText = $("BODY #spanCalculateTextHeight");

    if (spanText.size() <= 0) {
      spanText = $("<span id='spanCalculateTextHeight'></span>");
      spanText.appendTo("BODY");
    }

    var valu = this.val();
    if (!valu) valu = this.text();

    spanText.text(valu);

    spanText.css({
      "fontSize": this.css('fontSize'),
      "fontWeight": this.css('fontWeight'),
      "fontFamily": this.css('fontFamily'),
      "top": 0,
      "left": -1 * parseInt(width) + 'px',
      "position": 'absolute',
      "display": "inline-block",
      "width": width
    });

    return spanText.innerHeight() + 'px';
  };

  /**
   * Adjust the font-size of the text so it fits the container.
   *
   * @param minSize     Minimum font size?
   * @param maxSize     Maximum font size?
   * @param truncate    Truncate text after sizing to make sure it fits?
   */
  $.fn.autoTextSize = function(minSize, maxSize, sourceElem, targetElem, truncate) {
    var _source, _target;
    // if(!sourceElem&& sourceElem===undefined){
    // 	_source=this
    // } else{
    // 	_source=sourceElem
    // }

    // if(!targetElem&& targetElem===undefined){
    // 	_target=this
    // } else{
    // 	_target=targetElem
    // }

    var _self = this,

    _target=this,
    _source=this,
        _width = _source.innerWidth(),
        _textWidth = parseInt(_source.getTextWidth()),
        _fontSize = parseInt(_target.css('font-size'));

    while (_width < _textWidth || (maxSize && _fontSize > parseInt(maxSize))) {
      if (minSize && _fontSize <= parseInt(minSize)) break;

      _fontSize--;
      _target.css('font-size', _fontSize + 'px');

      _textWidth = parseInt(_source.getTextWidth());
    }

    if (truncate) _self.autoTruncateText();
  };

  /**
   * Function that truncates the text inside a container according to the
   * width and height of that container. In other words, makes it fit by chopping
   * off characters and adding '...'.
   */
  $.fn.autoTruncateText = function() {
    var _self = this,
        _width = _self.outerWidth(),
        _textHeight = parseInt(_self.getTextHeight(_width)),
        _text = _self.text();

    // As long as the height of the text is higher than that
    // of the container, we'll keep removing a character.
    while (_textHeight > _self.outerHeight()) {
      _text = _text.slice(0,-1);
      _self.text(_text);
      _textHeight = parseInt(_self.getTextHeight(_width));
      _truncated = true;
    }

    // When we actually truncated the text, we'll remove the last
    // 3 characters and replace it with '...'.
    if (!_truncated) return;
    _text = _text.slice(0, -3);

    // Make sure there is no dot or space right in front of '...'.
    var lastChar = _text[_text.length - 1];
    if (lastChar == ' ' || lastChar == '.') _text = _text.slice(0, -1);
    _self.text(_text + '...');
  };
})(jQuery);
