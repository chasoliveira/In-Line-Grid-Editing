!function(t){"use strict";var e="ilgeEditDelete",n="ilgeApplyCancel",i="ilgeCustom",a=function(a,c){c=c||{},a=t(a);var o=function(e){var n=function(t,e){t.currentValue=e,t.isChanged=!0};this.textField=function(i){var a=t("<input>",{type:"text",name:i.name,id:i.name,class:i.class}),c=e.find("td:nth-child("+i.column+")");n(i,c.html()),a.val(i.currentValue),void 0!=i.actionFormatter&&"function"==typeof i.actionFormatter&&i.actionFormatter(a),c.html(a)},this.numericField=function(i){var a=t("<input>",{type:"numeric",name:i.name,id:i.name,class:i.class}),c=e.find("td:nth-child("+i.column+")");n(i,c.html()),a.val(i.currentValue),void 0!=i.actionFormatter&&"function"==typeof i.actionFormatter&&i.actionFormatter(textInput),c.html(a)},this.decimalField=function(i){var a=t("<input>",{type:"numeric",name:i.name,id:i.name,class:i.class}),c=e.find("td:nth-child("+i.column+")");n(i,c.html()),a.val(i.currentValue),void 0!=i.actionFormatter&&"function"==typeof i.actionFormatter&&i.actionFormatter(a),c.html(a)},this.boolField=function(i){var a=t("<input>",{type:"checkbox",name:i.name,id:i.name,class:i.class}),c=e.find("td:nth-child("+i.column+")"),o="true"===c.html().toLowerCase();n(i,o),a.val(i.currentValue),a.attr("checked",o),c.html(a)},this.dateField=function(i){var a=t("<input>",{type:"date",name:i.name,id:i.name,class:i.class}),c=e.find("td:nth-child("+i.column+")");n(i,c.html()),a.val(i.currentValue),void 0!=i.actionFormatter&&"function"==typeof i.actionFormatter&&i.actionFormatter(a),c.html(a)},this.dateTimeField=function(i){var a=t("<input>",{type:"datetime",name:i.name,id:i.name,class:i.class}),c=e.find("td:nth-child("+i.column+")");n(i,c.html()),a.val(i.currentValue),void 0!=i.actionFormatter&&"function"==typeof i.actionFormatter&&i.actionFormatter(a),c.html(a)},this.selectField=function(i){var a=t("<select>",{type:"select",name:i.name,id:i.name,class:i.class}),c=e.find("td:nth-child("+i.column+")");n(i,c.html()),c.html(a)}},l=function(t){this.textField=function(e,n){var i=t.find("td:nth-child("+e.column+")"),a=n?e.currentValue:i.find("input[name="+e.name+"]").val();i.html(a)},this.numericField=function(e,n){var i=t.find("td:nth-child("+e.column+")"),a=n?e.currentValue:i.find("input[name="+e.name+"]").val();i.html(a)},this.decimalField=function(e,n){var i=t.find("td:nth-child("+e.column+")"),a=n?e.currentValue:i.find("input[name="+e.name+"]").val();i.html(a)},this.boolField=function(e,n){var i=t.find("td:nth-child("+e.column+")"),a=n?e.currentValue:i.find("input[name="+e.name+"]").val();i.html(a.toString())},this.dateField=function(e,n){var i=t.find("td:nth-child("+e.column+")"),a=n?e.currentValue:i.find("input[name="+e.name+"]").val();i.html(a)},this.dateTimeField=function(e,n){var i=t.find("td:nth-child("+e.column+")"),a=n?e.currentValue:i.find("input[name="+e.name+"]").val();i.html(a)},this.selectField=function(e,n){var i=t.find("td:nth-child("+e.column+")"),a=n?e.currentValue:i.find("select[name='"+e.name+"'] option:selected").html();i.html(a)}},r=function(e,n){var i={text:"text",numeric:"numeric",decimal:"decimal",bool:"bool",date:"date",datetime:"datetime",select:"select"},a=new o(n),c=new l(n),r=function(e,i){var a=[];console.log(n),e.paramns.loadBy.keys.forEach(function(t){var e=n.find("[name='"+t.from+"']option:selected");console.log(e),t.isInRow?a.push(t.key+"="+n.find("[name='"+t.from+"']").val()):a.push(t.key+"="+n.closest("body").find("[name='"+t.from+"']").val())});var c=u(e.paramns.uri,a.join("&"));t.getJSON(c,function(t){var n=s(t,e);i(n)})},d=function(e,n){t.getJSON(e.paramns.uri,function(t){var i=s(t,e);n(i)})},s=function(t,e){var n=[];return t.forEach(function(t){n.push({value:t[e.paramns.valueField],html:t[e.paramns.textField]})}),n},m=function(t,e){void 0!=t.paramns.loadBy?r(t,e):d(t,e)},f=0,h=function(e,i){e.forEach(function(e){m(e,function(i){i.forEach(function(i){var a=i.html==e.currentValue;n.find("select[name='"+e.name+"']").append(t("<option>",{value:i.value,html:i.html,selected:a}))})}),f++,console.log("Executing "+f+" getItem:  Field: "+e.name)}),console.log("execute callback futions"),"function"==typeof i&&i()};this.setUpSelects=function(){var t=e.filter(function(t){return t.type===i.select}),n=t.filter(function(t){return void 0===t.paramns.loadBy}),a=t.filter(function(t){return"object"==typeof t.paramns.loadBy});n.forEach(function(t){t.fieldsToLoad=a.filter(function(e){return e.paramns.loadBy.keys.filter(function(e){return e.from===t.name})})}),h(n,function(){h(a)})},this.setUpInputsOnRow=function(t){e.forEach(function(t){switch(t.type.toLowerCase()){case i.text:a.textField(t);break;case i.numeric:a.numericField(t);break;case i.decimal:a.decimalField(t);break;case i.bool:a.boolField(t);break;case i.date:a.dateField(t);break;case i.datetime:a.dateTimeField(t);break;case i.select:a.selectField(t)}}),"function"==typeof t&&t()},this.setDownInputsOnRow=function(t){e.forEach(function(e){switch(e.type.toLowerCase()){case i.text:c.textField(e,t);break;case i.numeric:c.numericField(e,t);break;case i.decimal:c.decimalField(e,t);break;case i.bool:c.boolField(e,t);break;case i.date:c.dateField(e,t);break;case i.datetime:c.dateTimeField(e,t);break;case i.select:c.selectField(e,t)}})}},u=function(t,e){return t.lastIndexOf("/")==t.length-1?t+"?"+e:t+"/?"+e},d=function(i,a){var c={controller:{uriSave:"",uriUpdate:"",uriDelete:"",messageReturn:function(){}},fields:[]},o=a.fields||c.fields,l=function(){return void 0===o?null:o.filter(function(t){return"buttons"!=t.type&&t.edit===!0})};this.GetFieldsButton=function(){return void 0===o?null:o.filter(function(t){return"buttons"==t.type})};var d=function(t){t.find("."+e).toggle(),t.find("."+n).toggle()},s=function(t){if(void 0===o)return null;var e=o.filter(function(t){return t.isKey===!0}),n="",i=0;return e.forEach(function(a){var c=t.find("td:nth-child("+a.column+")").html();n+=a.name+"="+c,i>0&&i<e.length&&(n+="&"),i++}),n};this.AddItemInGrid=function(e){t(this).closest("tr")},this.EditItemInGrid=function(e){var n=t(this).closest("tr");d(n);var i=l(),a=new r(i,n);a.setUpInputsOnRow(a.setUpSelects)},this.RemoveItemFromGrid=function(e){var n=t(this).closest("tr"),i=s(n),c=u(a.controller.uriDelete,i);t.ajax({method:"POST",url:c,cache:!1,error:function(t,e,n){a.controller.messageReturn(n)},success:function(t){t.result&&n.remove(),a.controller.messageReturn(t)}})},this.CancelEditOrAddInGrid=function(e){var n=t(this).closest("tr"),i=l(),a=new r(i,n);a.setDownInputsOnRow(!0),d(n)}};this.SetUpGrid=function(){var o=new d(a,c),l=o.GetFieldsButton(),r=function(c,o){var l=a.find("tbody tr");l.each(function(a){var l=t(this).find("td:nth-child("+o+")"),r=t("<div>",{class:e});c.editDelete.forEach(function(e){r.append(t("<button>",{name:e.name,class:e.class,type:"button"}).append(t("<i>",{class:e.icon})))}),l.append(r);var u=t("<div>",{class:n});c.cancelApply.forEach(function(e){u.append(t("<button>",{name:e.name,class:e.class,type:"button"}).append(t("<i>",{class:e.icon})))}),u.hide(),l.append(u);var d=t("<div>",{class:i});c.custom.forEach(function(e){d.append(t("<button>",{name:e.name,class:e.class,type:"button"}).append(t("<i>",{class:e.icon})).append(e.text))}),l.append(d)})},u=function(t){t.forEach(function(t){switch(t.type){case"apply":a.find("[name='"+t.name+"']").on("click",o.AddItemInGrid);break;case"cancel":a.find("[name='"+t.name+"']").on("click",o.CancelEditOrAddInGrid);break;case"edit":a.find("[name='"+t.name+"']").on("click",o.EditItemInGrid);break;case"delete":a.find("[name='"+t.name+"']").on("click",o.RemoveItemFromGrid);break;case"custom":a.find("[name='"+t.name+"']").on("click",t.onClick)}})};l.forEach(function(t){r(t.buttons,t.column),u(t.buttons.editDelete),u(t.buttons.cancelApply),u(t.buttons.custom)})}};t.fn.ilge=function(t){var e=new a(this,t);e.SetUpGrid()}}(jQuery);