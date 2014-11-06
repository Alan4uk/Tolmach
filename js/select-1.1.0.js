$(function init(){
	if($('select').size()) {
		var select=$('select').select();
	}
});
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