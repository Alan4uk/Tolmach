$(document).ready(function(){
	// popup
	(function popup(){
		$("body").popup().popup({
			"opener":".reviews-list .text-content .img-holder a",
			"popup_holder":"#standard-popup",
			"beforeOpen":function(popup){
				$(popup).css("left",0).hide();
				var self = $(this),
					selfTitle = self.attr('title'),
					urlImg = self.attr('url-img'),
					urlContent = self.attr('url-content');
					popup.find('.popup-title').html(selfTitle);
					popup.find('p').eq(0).html(urlContent);
					popup.find('.shadow-img').attr('src',urlImg);
			},
			"close":function(){}
		}).popup({
			"opener":".promo-list > li > a",
			"popup_holder":"#order-popup"
		}).popup({
			"opener":".link-feedback",
			"popup_holder":"#callback-popup",
			"close_btn":".close, .link-order",
		}).popup({
			"opener":".link-order",
			"popup_holder":"#callback-popup-good"
		}).popup({
			"opener":".link-payment",
			"popup_holder":"#payment-popup"
		});
	})();
	// roatate language
	$('.translate-form .rotate').click(function(e){
		e.preventDefault();

		var self = $(this),
			selfHolder = self.closest('.translate-form'),
			row1 = selfHolder.find('.row').eq(0),
			row2 = selfHolder.find('.row').eq(1),
			row1Class = row1.find('select option:selected').attr('class'),
			row2Class = row2.find('select option:selected').attr('class');
		row1.find('select option').each(function(){
			if ($(this).hasClass(row2Class)) {
				$(this).click().attr('selected', 'selected');
			}
		});
		row2.find('select option').each(function(){
			if ($(this).hasClass(row1Class)) {
				$(this).click().attr('selected', 'selected');
			}
		});
		row1Class = row1.find('select option:selected').attr('class');
		row2Class = row2.find('select option:selected').attr('class');
		$('select').select('destroy').select();
		debugger;
	});
	// page nav
	setTimeout(function() {
		if ($('ul').is('.side-menu')) {
			$('.side-menu').onePageNav({
				currentClass: 'active',
				filter: ':not(.external)'
			});
		}
	}, 300);
	// sticky news
	setTimeout(function() {
		if ($('div').is('.stick-parent')) {
			$('.stick-parent .stick').stick_in_parent({
				parent: '.stick-parent',
				offset_top: 10
			});
		}
	}, 200);
	/* validation */
	if ($('div').is('.question-form-holder')) {
		$('.question-form-holder .answer.thanks').hide();
		(function validation(){
			var form=$('.custom-form');
			form.each(function(){
				var _inputName=$(this).find('[name=text-name]'),
				_inputEmail=$(this).find('[name=text-email]'),
				_inputText=$(this).find('[name=text-text]'),
				_this = $('.custom-form');
				_inputName.blur(function(){
					var val=$(this).val(),
					_this=$(this);
					if((/^.+$/ig).test(val) && val!=this.defaultValue){
						$(this).closest('label').removeClass('error');
					}else{
						$(this).closest('label').addClass('error');
					}
				});
				_inputEmail.blur(function(){
					var val=$(this).val();
					if((/^[-\._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/ig).test(val) && val!=this.defaultValue){
						$(this).closest('label').removeClass('error');
					}else{
						$(this).closest('label').addClass('error');
					}
				});
				_inputText.blur(function(){
					var val=$(this).val();
					if((/^.+$/ig).test(val) && val!=this.defaultValue){
						$(this).closest('label').removeClass('error');
					}else{
						$(this).closest('label').addClass('error');
					}
				});
				_this.submit(function(e){
					_this.find('input').trigger('blur');
					_this.find('textarea').trigger('blur');
					if(!form.find('.error').size()){
						_this.closest('.frame').slideUp();
						_this.closest('.frame').find('input').each(function(){
							$(this).val('');
						});
						_this.closest('.frame').find('textarea').val('');
						_this.closest('.question-form-holder').find('.answer.thanks').slideDown();
					}
					e.preventDefault();
				});
			});
		})();
		$('.question-form-holder .answer.thanks .btn').click(function(e){
			e.preventDefault();
			var _this = $(this);
			_this.closest('.question-form-holder').find('.question.question-form .frame').slideDown();
			_this.closest('.question-form-holder').find('.answer.thanks').slideUp();
		});
	}
	// dotted width bug height
	if ($('div').is('.sidebar-gallery-slide')) {
		$('.sidebar-gallery-slide').dotdotdot({
			ellipsis	: '',
			after		: '<span class="read-more" style="display: inline-block !important; position: relative; margin-right: -30px;"></span>'
		});
	}
	// open/close text fax
		// hide text
	$('.close-container .close-container-content').each(function(){
		var self = $(this);
		if (!self.is('.active')) {
			self.find('.hide-text').hide();
		}
	});
		// open hide text faq
	$('.close-container .read-more').click(function(e){
		e.preventDefault();
		var self = $(this),
			selfHolder = self.closest('.close-container-content'),
			selfSlider = selfHolder.find('.hide-text');
		selfSlider.slideDown(300);
		setTimeout(function() { selfHolder.addClass('active') }, 300);
	});
		// close hide text faq
	$('.close-container .close-container-content .turn').click(function(e){
		e.preventDefault();
		var self = $(this),
			selfHolder = self.closest('.close-container-content'),
			selfSlider = selfHolder.find('.hide-text');
		selfSlider.slideUp(300);
		setTimeout(function() { selfHolder.removeClass('active') }, 300);
	});

	// init select
	function init(){
		if($('select').size()) {
			var select=$('select').select();
		}
	};
	init();

	/****************************************************************/
	$(".tabset").tabset();
	$('input').not('.default').iCheck({
		checkboxClass: 'check',
		radioClass: 'radio',
		increaseArea: '20%' // optional
	});
	$('.checkbox-holder .checkbox').on('ifChecked', function(event) {
		$(this).closest('.checkbox-holder').addClass('active');
	});
	$('.checkbox-holder .checkbox').on('ifUnchecked', function(event) {
		$(this).closest('.checkbox-holder').removeClass('active');
	});
});




$.fn.tabset = function(o){
	var o = $.extend({
				"tab":".tab",
				"tab_control":".tab-control",
				"tab_control_parent":">div",
				"tab_control_item":">li",
				"a_class":"active",
				"t_a_class":"active",
				"style": {
					"forActive": {"display":"block"},
					"forInActive": {"display":"none"}
				}
			},o);
	return this.each(function(){
		var tabset=$(this),
			tab=$(o.tab,tabset),
			ctrl_pnt=$(o.tab_control_parent,tabset),
			ctrl=$(o.tab_control,tabset).size() ? $(o.tab_control,tabset):$(o.tab_control,ctrl_pnt),
			ctrl_item=$(o.tab_control_item,ctrl),
			a_class={"name":o.a_class,"selector":"."+o.a_class},
			t_a_class={"name":o.t_a_class,"selector":"."+o.t_a_class},
			style=o.style;
			ctrl_item.click(function(e){
				var index=$(this).index(),
					curTab=tab.filter(t_a_class.selector).size() ? tab.filter(t_a_class.selector):tab.filter(':visible'),
					nextTab=tab.eq(index);
				$(this).parent().find(o.tab_control_item+a_class.selector).removeClass(a_class.name);
				$(this).addClass(a_class.name);
				if(style){
					curTab.css(style.forInActive).removeClass(t_a_class.name);
					nextTab.css(style.forActive).addClass(t_a_class.name);
				}else{
					curTab.removeClass(t_a_class.name);
					nextTab.addClass(t_a_class.name);
				}
				e.preventDefault();
			});
	});
}

$(function(){
	initSlideShow();
	if ($('div').is('.tab-gallery')) {
		var selfText = $('.tab-gallery .slide-list .slide').eq(4).find('.hide-description').html();
		$('.sidebar-gallery-slide').html(selfText);
	};
});
function initSlideShow() {
	$('.brand-gallery').makeGallery();
}
jQuery.fn.makeGallery = function(o){
	o = $.extend( {
		interval : 1800, /* интервал вращения 1000 = 1секунда */
		speed : 800, /* скорость перемещения 1000 = 1секунда */
		gallery_frame : '.gallery-holder',
		gallery_holder : '.slide-list',
		gallery_item : '.slide'
	}, o || {});
	return this.each(
		function() {
			var _phase = true;
			var main_holder = $(this);
			var _gal_item = o.gallery_item;
			var btn_prev = $('.prev',main_holder);
			var btn_next = $('.next',main_holder);
			var _holder = $(o.gallery_holder,main_holder);
			var _speed = o.speed;
			btn_prev.click(function(){
				if (_phase) {
					_phase = false;
					oneStepMinus();
				}
				return false;
			});
			btn_next.click(function(){
				if (_phase) {
					_phase = false;
					oneStepPlus();
				}
				return false;
			});
			function oneStepPlus () {
				var step = (_holder.find(_gal_item+':first').outerWidth());
				_holder.animate({marginLeft:step*(-1)+'px'}, _speed, function(){
					$(this).append($(this).find(_gal_item+':first'));
					$(this).css('margin-left','0');
					_phase = true;
				});
				/**********************************************/
				var currentLi = 5;
				tabGallery(_speed, currentLi);
				/**********************************************/
			};
			function oneStepMinus () {
				var step = (_holder.find(_gal_item+':last').outerWidth());
				_holder.css('margin-left',-step).prepend(_holder.find(_gal_item+':last'));
				_holder.animate({marginLeft:0}, _speed, function(){
					$(this).css('margin-left','0');
					_phase = true;
				});
				/**********************************************/
				var currentLi = 4;
				tabGallery(_speed, currentLi);
				/**********************************************/
			};
		});
};

function tabGallery(_speed, currentLi) {
	if ($('div').is('.tab-gallery')) {
		//setTimeout(function() {
			var selfText = $('.tab-gallery .slide-list .slide').eq(currentLi).find('.hide-description').html();
			$('.sidebar-gallery-slide').fadeTo(0, 0);
			$('.sidebar-gallery-slide').html(selfText);
			$('.sidebar-gallery-slide').fadeTo(300, 1);
		//}, _speed+100);
	};
}

/*
 * Drop in replace functions for setTimeout() & setInterval() that
 * make use of requestAnimationFrame() for performance where available
 * http://www.joelambert.co.uk
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();
/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

window.requestTimeout = function(fn, delay) {
	if( !window.requestAnimationFrame      	&&
		!window.webkitRequestAnimationFrame &&
		!window.mozRequestAnimationFrame    &&
		!window.oRequestAnimationFrame      &&
		!window.msRequestAnimationFrame)
			return window.setTimeout(fn, delay);

	var start = new Date().getTime(),
		handle = new Object();

	function loop(){
		var current = new Date().getTime(),
			delta = current - start;

		delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
	};

	handle.value = requestAnimFrame(loop);
	return handle;
};

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestTimeout = function(handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)	:
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
    clearTimeout(handle);
};

//version 1.1.0
$.fn.select=function(o){
	var callMethod=$.fn.select.method,
		itemClick=jQuery.Event("itemClick"),
		selectReady=jQuery.Event("selectReady"),
		enabled=jQuery.Event("enabled"),
		disabled=jQuery.Event("disabled"),
		destroyed=jQuery.Event("destroyed");
	if(typeof o=="string" && o in $.fn.select.method){
		var select=$(this);
		callMethod[o](select,arguments[1]);
		return $(this);
	}
	if(!("method" in $.fn.select)){
		$.fn.select.method={
			"destroy":function(select){
				if(select.data('customized')){
					select.off('change'+o.namespace);
					select.each(function(){
						var instance=$(this);
						instance.data('customSelect').remove();
						$(document).off('mousedown',instance.data("mousedownHandler"));
						$(window).off('resize',instance.data("resizeHandler"));
					});
					select.removeData();
					select.trigger('destroyed');
				}else{
					throw new Error('объект не проинициализирован');
				}
			},
			"enable":function(select){
				if(select.data('disable')){
					select.attr('disabled',false);
					select.data('customSelect').first().on('click'+o.namespace,select.data('openerHandler')).removeClass('disabled');
					select.trigger('enabled');
				}
			},
			"disable":function(select){
				if(!select.data('disable')){
					select.data('disable',true);
					select.attr('disabled',true);
					select.data('openerHandler',$._data(select.data('customSelect').first().get(0),"events").click[0].handler);
					select.data('customSelect').first().off('click').addClass('disabled');
					select.trigger('disabled');
				}
			},
			"pick":function(select,index) {
				select.each(function(){
					this.selectedIndex=index;
				});
				select.trigger("change"+o.namespace);
			}
		};
		callMethod=$.fn.select.method;
	}
	o=$.extend({
			"list":"ul",
			"namespace":".select",
			"item":"li",
			"itemHTML":"li span",
			"openerClass":"selectmenu",
			"icoClass":"selectmenu-icon",
			"selectedClass":"selectmenu-status",
			"activeItemClass":"active",
			"activeOpenerClass":"active",
			"dropDownClass":"selectmenu-menu",
			"style":"dropdown", //popup,dropdown
			"transferClass":true,
			"dropdownHasBorder":true,
			"hasIcons":true,
			"resizable":false,
			"triggerEvents":true
		},o);
		var select=[],
			body=$('body'),
			openerHTML=$('<a class="'+o.openerClass+'"><span class="'+o.icoClass+'"></span><span class="'+o.selectedClass+'"></span></a>'),
			dropdownHTML=$('<div class='+o.dropDownClass+'>'+
								'<div class="select-top">'+
									'<div class="select-l"></div>'+
									'<div class="select-r"></div>'+
								'</div>'+
								'<div class="select-c">'+
									'<div class="c appendHere">'+
								'</div>'+
								'</div>'+
									'<div class="select-bottom">'+
									'<div class="select-l"></div>'+
									'<div class="select-r"></div>'+
								'</div>'+
							'</div>');
		$(this).each(function(i){
			if(!$(this).data('customized')){
				select.push(this);
			}
		});
		if(select.length){
			$(select).each(function(){
				var opener = openerHTML.clone(),
					nativeSelect = $(this),
					title=nativeSelect.find("option[title]").text(),
					options=nativeSelect.find("option[title]").attr('disabled',true).end().find('option'),
					optionSize = options.size() - 1,
					dropdown = dropdownHTML.clone(),
					itemTree=o.itemHTML.split(' '),
					hasChild=itemTree.length>=2,
					list = "<" + o.list + ">";
				nativeSelect.find('option').each(function(i, data){
					if($(this).attr('title')){
						list += "<" + o.item + " class='title' style='display:none;'>" + data.childNodes[0].nodeValue + "</" + o.item + ">";
					}else{
						if(!hasChild){
							list += "<" + o.item + ">" + data.childNodes[0].nodeValue + "</" + o.item + ">";
						}else{
							var buffer='';
							for(var k=itemTree.length-1;k!=0;k--){
								if(!buffer){
									buffer+="<" + itemTree[k] + ">"+ data.childNodes[0].nodeValue +"</" + itemTree[k] + ">";
								}else if(k!=0 && itemTree.length>2){
									buffer="<" + itemTree[k] + ">"+buffer+"</" + itemTree[k] + ">";
								}
							}
							buffer="<" + itemTree[0] + ">"+buffer+"</" + itemTree[0] + ">";
							list+=buffer;
						}
					}
					if (i == optionSize) {
						list += "</" + o.list + ">";
					}
				});
				list = $(list);
				dropdown = dropdown.find('.appendHere').removeClass('appendHere').append(list).end();
				opener.insertAfter(nativeSelect);
				opener.find('.'+o.selectedClass).text(nativeSelect.find('option:selected').text());
				body.append(dropdown);
				(o.dropdownHasBorder) ? dropdown.width(opener.width()) : dropdown.width(opener.outerWidth());
				if(o.transferClass){
					opener.addClass(opener.attr('class') + " " + nativeSelect.attr('class'));
					dropdown.addClass(dropdown.attr('class') + " " + nativeSelect.attr('class'));
				}
				$(this).data('customSelect', opener.add(dropdown));
				$(this).data('customized', true);
				var listItems = list.find(">" + o.item),
					dropdownWidth = dropdown.outerWidth(),
					dropdownHeight = dropdown.outerHeight();
					selectedByHover='',
					selected='';
				if(!o.resizable){
					opener.width(nativeSelect.outerWidth());
					(o.dropdownHasBorder) ? dropdownWidth=dropdown.width(opener.width()) : dropdownWidth=dropdown.width(opener.outerWidth());
				}else{
					$(window).on('resize.opener',function(){
						(o.dropdownHasBorder) ? dropdownWidth=dropdown.width(opener.width()) : dropdownWidth=dropdown.width(opener.outerWidth());
					}).trigger('resize.opener');
				}
				if(title){
					opener.find('.'+o.selectedClass).text(title);
					nativeSelect.trigger('change'+o.namespace,[options.filter(':selected').index()]);
				}
				nativeSelect.on("change"+o.namespace, function(e, selectedIndex,dontHide,dontTrigger){
					if (dontTrigger)return;
					if (!selectedIndex && selectedIndex !== 0) selectedIndex = this.selectedIndex;
					this.selectedIndex=selectedIndex;
					listItems.removeClass(o.activeItemClass).eq(selectedIndex).addClass(o.activeItemClass);
					selected=options.eq(selectedIndex);
					opener.find('.'+o.selectedClass).text(selected.text());
					if(!dontHide){
						dropdown.hide();
						opener.removeClass(o.activeOpenerClass);
					}
					nativeSelect.trigger("change",[null,null,true]);
				});
				if(o.hasIcons){
					options.each(function(i){
						listItems.eq(i).prepend('<span class="icon '+this.className+'"></span>');
					});
					nativeSelect.on("change"+o.namespace,function(e, selectedIndex,dontHide,dontTrigger){
						if (dontTrigger)return;
						opener.find('.'+o.selectedClass).prepend('<span class="'+selected.attr('class')+'"></span>');
					});
					opener.find('.'+o.selectedClass).prepend('<span class="'+options.filter(':selected').attr('class')+'"></span>');
				}
				nativeSelect.hide();
				listItems.click(function(e){
					if(!$(this).hasClass(o.activeItemClass)){
						nativeSelect.trigger("change"+o.namespace, [$(this).index()]);
					}
					dropdown.hide();
					opener.removeClass(o.activeOpenerClass);
				});
				opener.click(function(e){
					if(dropdown.is(':hidden')){
						dropdown.show();
						opener.addClass(o.activeOpenerClass);
						alignDropDown();
					}else{
						dropdown.hide();
						opener.removeClass(o.activeOpenerClass);
					}
				});
				nativeSelect.data("resizeHandler",function(){
					console.log("resizeHandler");
					if (dropdown.is(':visible')){
						alignDropDown();
					}
				});
				nativeSelect.data("mousedownHandler",function(e){
					console.log("mousedownHandler");
					if (!$(e.target).closest(dropdown).size() && !$(e.target).closest(opener).size()) {
						dropdown.hide();
						opener.removeClass(o.activeOpenerClass);
					}
				});
				$(window).on('resize',nativeSelect.data("resizeHandler"));
				$(document).on('mousedown',nativeSelect.data("mousedownHandler"));
				//event section
				if(o.triggerEvents){
					listItems.click(function(e){
						nativeSelect.trigger(itemClick, [$(this).text()]);
					});
					nativeSelect.trigger(selectReady,[dropdown]);
				}
				function alignDropDown(){
					if(o.style=="dropdown"){
						var top = opener.offset().top + opener.outerHeight(),
							left = opener.offset().left;
						/*
if(top + dropdownHeight > $(window).height() && top - dropdownHeight - opener.outerHeight() > 0){
							dropdown.css({
								'top': top - dropdownHeight - opener.outerHeight(),
								'left': left
							});
						}else{
*/
							dropdown.css({
								'top': top,
								'left': left
							});
						/*
}
*/
					}else{
						var activeEl=listItems.eq(nativeSelect.get(0).selectedIndex);
						activeEl=activeEl.hasClass('title') ? activeEl.next():activeEl;
						var top = opener.offset().top-activeEl.position().top,
							left = opener.offset().left;
						dropdown.css({
							'top': top,
							'left': left
						});
					}
				}
				if(nativeSelect.is(':disabled')) nativeSelect.select('disable');
			});
		}else{
			throw Error('селектор $("'+$(this).selector+'") ничего не возвратил');
		}
}

$.fn.popup = function(o){
	var o = $.extend({
				"opener":".btn-feedback",
				"popup_holder":"#callback",
				"popup":".popup",
				"close_btn":".close",
				"close":function(){},
				"beforeOpen":function(popup){$(popup).css("left",0).hide();}
			},o);
	return this.each(function(){
		var container=$(this),
			opener=$(o.opener,container),
			popup_holder=$(o.popup_holder,container),
			popup=$(o.popup,popup_holder),
			close=$(o.close_btn,popup),
			bg=$('.bg',popup_holder);
			popup.css('margin',0);
			opener.click(function(e){
				o.beforeOpen.apply(this,[popup_holder]);
				popup_holder.fadeIn(400);
				alignPopup();
				bgResize();
				e.preventDefault();
			});
		function alignPopup(){
				if((($(window).height() / 2) - (popup.outerHeight() / 2))+ $(window).scrollTop()<0){
					popup.css({'top':0,'left': (($(window).width() - popup.outerWidth())/2) + $(window).scrollLeft()});
					return false;
				}
				popup.css({
					'top': (($(window).height()-popup.outerHeight())/2) + $(window).scrollTop(),
					'left': (($(window).width() - popup.outerWidth())/2) + $(window).scrollLeft()
				});
		}
		function bgResize(){
			var _w=$(window).width(),
				_h=$(document).height();
			bg.css({"height":_h,"width":_w+$(window).scrollLeft()});
		}
		$(window).resize(function(){
			if(popup_holder.is(":visible")){
				bgResize();
				alignPopup();
			}
		});
		if(popup_holder.is(":visible")){
				bgResize();
				alignPopup();
		}
		close.add(bg).click(function(e){
			var closeEl=this;
			popup_holder.fadeOut(400,function(){
				o.close.apply(closeEl,[popup_holder]);
			});
			e.preventDefault();
		});
		$('body').keydown(function(e){
			if(e.keyCode=='27'){
				popup_holder.fadeOut(400);
			}
		})
	});
}