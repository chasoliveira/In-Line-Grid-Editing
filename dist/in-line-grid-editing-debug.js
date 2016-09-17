(function ($) {
    "use strict";
    var divClassButtonsEditDelete = "ilgeEditDelete";
    var divClassButtonsApplyCancel = "ilgeApplyCancel";
    var divClassButtonsCustom = "ilgeCustom";
    var inLineGridEditing = function (container, options) {
        options = options || {};
        container = $(container);
        var createElement = function (row) {
            function createHidden(td, name, value) {
                td.append($("<input>", { type: "hidden", name: name + "-hidden", id: name + "-hidden", value: value }));
            }
            function actionFormatter(field, target) {
                if (field.actionFormatter != undefined && typeof field.actionFormatter === "function")
                    field.actionFormatter(target);
            }
            function getCurrentTd(field) {
                return row.find("td:nth-child(" + field.column + ")");
            }
            function createInput(field) {
                if (field.type === 'select')
                    return $("<select>", { type: field.type, name: field.name, id: field.name, "class": field.class });
                return $("<input>", { type: field.type, name: field.name, id: field.name, "class": field.class });
            }
            this.textField = function (field) {
                var textInput = createInput(field);
                var td = getCurrentTd(field);
                var currentValue = td.html();
                textInput.val(currentValue);
                td.html(textInput);
                actionFormatter(field, textInput);
                createHidden(td, field.name, currentValue);
            }
            this.numericField = function (field) {
                var numericInput = createInput(field);
                var td = getCurrentTd(field);
                var currentValue = td.html();
                numericInput.val(currentValue);
                actionFormatter(field, numericInput);
                td.html(numericInput);
                createHidden(td, field.name, currentValue);
            }
            this.decimalField = function (field) {
                var textInput = createInput(field);
                var td = getCurrentTd(field);
                var currentValue = td.html();
                textInput.val(currentValue);
                actionFormatter(field, textInput);
                td.html(textInput);
                createHidden(td, field.name, currentValue);
            }
            this.boolField = function (field) {
                var checkInput = createInput(field);
                var td = getCurrentTd(field)
                var value = td.html().toLowerCase() === "true";
                checkInput.val(value);
                checkInput.attr("checked", value);
                td.html(checkInput);
                createHidden(td, field.name, value);
            }
            this.dateField = function (field) {
                var dateInput = createInput(field);
                var td = getCurrentTd(field);
                var currentValue = td.html();
                dateInput.val(currentValue);
                actionFormatter(field, dateInput);
                td.html(dateInput);
                createHidden(td, field.name, currentValue);
            }
            this.dateTimeField = function (field) {
                var textInput = createInput(field);
                var td = getCurrentTd(field);
                var currentValue = td.html();
                textInput.val(currentValue);
                actionFormatter(field, textInput);
                td.html(textInput);
                createHidden(td, field.name, currentValue);
            }

            this.selectField = function (field) {
                var selectInput = createInput(field);
                var td = getCurrentTd(field);
                var currentValue = td.html();
                td.html(selectInput);
                createHidden(td, field.name, currentValue);
            }

        }
        var revertElement = function (row) {
            this.textField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? td.find("input[name='" + field.name + "-hidden']").val() : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.numericField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? td.find("input[name='" + field.name + "-hidden']").val() : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.decimalField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? td.find("input[name='" + field.name + "-hidden']").val() : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.boolField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? td.find("input[name='" + field.name + "-hidden']").val() : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue.toString());
            }
            this.dateField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? td.find("input[name='" + field.name + "-hidden']").val() : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.dateTimeField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? td.find("input[name='" + field.name + "-hidden']").val() : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.selectField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? td.find("input[name='" + field.name + "-hidden']").val() : td.find("select[name='" + field.name + "'] option:selected").html();
                td.html(htmlValue);
            }
        }
        var fieldElements = function (fields, row) {
            var fieldType = {
                text: "text",
                numeric: "numeric",
                decimal: "decimal",
                bool: "bool",
                date: "date",
                datetime: "datetime",
                select: "select"
            }
            var create = new createElement(row);
            var revert = new revertElement(row);

            var getItemnsWithParameters = function (field, callback) {
                var parameter = [];
                field.parameter.loadBy.keys.forEach(function (current) {
                    var value = row.find("[name='" + current.from + "']option:selected");
                    if (current.isInRow)
                        parameter.push(current.key + "=" + row.find("[name='" + current.from + "']").val());
                    else
                        parameter.push(current.key + "=" + row.closest("body").find("[name='" + current.from + "']").val());
                });

                var uri = setUrl(field.parameter.uri, parameter.join("&"));
                $.getJSON(uri, function (data) {
                    var result = fillDataFromResult(data, field);
                    callback(result);
                });
            }
            var getItemnsWithOutParameters = function (field, callback) {
                $.getJSON(field.parameter.uri, function (data) {
                    var result = fillDataFromResult(data, field);
                    callback(result);
                });
            }
            var fillDataFromResult = function (result, field) {
                var dataReturn = [];
                result.forEach(function (item) {
                    dataReturn.push({ value: item[field.parameter.valueField], html: item[field.parameter.textField] });
                });
                return dataReturn;
            }
            var getItemns = function (field, callback) {
                if (field.parameter.loadBy != undefined)
                    getItemnsWithParameters(field, callback);
                else
                    getItemnsWithOutParameters(field, callback);
            }
            var count = 0;
            var setUpFillSelectFields = function (selectFields) {
                selectFields.forEach(function (currentField) {
                    var td = row.find("td:nth-child(" + currentField.column + ")");
                    var currentValue = td.find("input[name='" + currentField.name + "-hidden']").val();
                    var currentSelect = row.find("select[name='" + currentField.name + "']");
                    console.log("currentField: " + currentField.name);
                    getItemns(currentField, function (items) {
                        console.log("currentField: " + currentField.name + " items: " + items.length);
                        items.forEach(function (item) {
                            var isSelected = item.html == currentValue;
                            currentSelect.append($("<option>", { value: item.value, html: item.html, selected: isSelected }));
                        });
                    });
                    count++;
                });
            }
            var setUpSelects = function () {
                var selectFields = fields.filter(function (field) { return field.type === fieldType.select; });
                var selectFieldsIndependents = selectFields.filter(function (field) { return field.parameter.loadBy === undefined; });
                var selectFieldsDependents = selectFields.filter(function (field) { return typeof field.parameter.loadBy === "object"; });
                selectFieldsIndependents.forEach(function (currentField) {
                    currentField.fieldsToLoad = selectFieldsDependents.filter(function (field) {
                        return field.parameter.loadBy.keys.filter(function (item) {
                            return item.from === currentField.name;
                        });
                    });
                });
                setUpFillSelectFields(selectFieldsIndependents);
               // independents.promise.then(setUpFillSelectFields(selectFieldsDependents));
            }

            this.setUpInputsOnRow = function (callback) {
                fields.forEach(function (currentField) {
                    switch (currentField.type.toLowerCase()) {
                        case fieldType.text: create.textField(currentField); break;
                        case fieldType.numeric: create.numericField(currentField); break;
                        case fieldType.decimal: create.decimalField(currentField); break;
                        case fieldType.bool: create.boolField(currentField); break;
                        case fieldType.date: create.dateField(currentField); break;
                        case fieldType.datetime: create.dateTimeField(currentField); break;
                        case fieldType.select: create.selectField(currentField); break;
                        default: break;
                    }
                });
                setUpSelects();
            }
            this.setDownInputsOnRow = function (toOldValue) {
                fields.forEach(function (currentField) {
                    switch (currentField.type.toLowerCase()) {
                        case fieldType.text: revert.textField(currentField, toOldValue); break;
                        case fieldType.numeric: revert.numericField(currentField, toOldValue); break;
                        case fieldType.decimal: revert.decimalField(currentField, toOldValue); break;
                        case fieldType.bool: revert.boolField(currentField, toOldValue); break;
                        case fieldType.date: revert.dateField(currentField, toOldValue); break;
                        case fieldType.datetime: revert.dateTimeField(currentField, toOldValue); break;
                        case fieldType.select: revert.selectField(currentField, toOldValue); break;
                        default: break;
                    }
                });
            }
        }

        var setUrl = function (urls, parameters) {
            if (urls.lastIndexOf("/") == urls.length - 1)
                return urls + "?" + parameters;
            else
                return urls + "/?" + parameters;
        }

        var inLineGridConfig = function (container, options) {
            var defaultOptions = {
                controller: {
                    uriSave: "",
                    uriUpdate: "",
                    uriDelete: "",
                    messageReturn: function () { }
                },
                fields: []
            }
            var fields = options.fields || defaultOptions.fields;

            var getFields = function () {
                if (fields === undefined) return null;
                return fields.filter(function (field) { return field.type != "buttons" && field.edit === true; });
            }
            this.getFieldsButton = function () {
                if (fields === undefined) return null;
                return fields.filter(function (field) { return field.type == "buttons"; });
            }

            var showCancelApplyChangesButtons = function (tr) {
                tr.find("." + divClassButtonsEditDelete).toggle();
                tr.find("." + divClassButtonsApplyCancel).toggle();
            }
            var getKeyAsUrlParameter = function (currentRow) {
                if (fields === undefined) return null;
                var keys = fields.filter(function (field) { return field.isKey === true });
                var keyAsUrl = "";
                var count = 0;
                keys.forEach(function (current) {
                    var value = currentRow.find("td:nth-child(" + current.column + ")").html();
                    keyAsUrl += current.name + "=" + value;
                    if (count > 0 && count < keys.length)
                        keyAsUrl += "&";
                    count++;
                });
                return keyAsUrl;
            };

            this.addItemInGrid = function (event) {
                var currentRow = $(this).closest("tr");
            };
            this.editItemInGrid = function (event) {
                var currentRow = $(this).closest("tr");
                showCancelApplyChangesButtons(currentRow);
                var editFields = getFields();
                var fieldElement = new fieldElements(editFields, currentRow);
                fieldElement.setUpInputsOnRow();
            };
            this.removeItemFromGrid = function (event) {
                var currentRow = $(this).closest("tr");
                var keysToDelete = getKeyAsUrlParameter(currentRow);
                var url = setUrl(options.controller.uriDelete.url, keysToDelete);
                $.ajax({
                    method: options.controller.uriDelete.verb,
                    url: url,
                    cache: false,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        options.controller.messageReturn(errorThrown);
                    },
                    success: function (data) {
                        if (data.result) {
                            currentRow.remove();
                        }
                        options.controller.messageReturn(data);
                    }
                });
            }
            this.cancelEditOrAddInGrid = function (event) {
                var currentRow = $(this).closest("tr");
                var editFields = getFields();
                var fieldElement = new fieldElements(editFields, currentRow);
                fieldElement.setDownInputsOnRow(true);
                showCancelApplyChangesButtons(currentRow);
            }
        };

        this.setUpGrid = function () {
            var config = new inLineGridConfig(container, options);
            var buttons = config.getFieldsButton();
            var addButtonOnGrid = function (buttons, tdIdx) {
                var rows = container.find("tbody tr");
                rows.each(function (idx) {
                    var td = $(this).find("td:nth-child(" + tdIdx + ")");
                    var divEditDelete = $("<div>", { "class": divClassButtonsEditDelete });
                    buttons.editDelete.forEach(function (button) {
                        divEditDelete.append($("<button>", { name: button.name, "class": button.class, type: "button" }).append($("<i>", { "class": button.icon })));
                    });
                    td.append(divEditDelete);

                    var divCancelApply = $("<div>", { "class": divClassButtonsApplyCancel, });
                    buttons.cancelApply.forEach(function (button) {
                        divCancelApply.append($("<button>", { name: button.name, "class": button.class, type: "button" }).append($("<i>", { "class": button.icon })));
                    });
                    divCancelApply.hide();
                    td.append(divCancelApply);

                    var divCustom = $("<div>", { "class": divClassButtonsCustom, });
                    buttons.custom.forEach(function (button) {
                        var btn = $("<button>", { name: button.name, "class": button.class, type: "button" });
                        var icon = $("<i>", { "class": button.icon });
                        btn.append(icon);
                        btn.append(button.text);
                        divCustom.append(btn);
                        if (!button.showcheck)
                            btn.addClass("hide");
                    });
                    td.append(divCustom);
                });
            };
            var setUpEventButtons = function (buttons) {
                var typeBtn = {
                    apply: "apply",
                    cancel: "cancel",
                    edit: "edit",
                    remove: "remove",
                    custom: "custom",
                }
                buttons.forEach(function (currentBtn) {
                    var actionButton = container.find("[name='" + currentBtn.name + "']");
                    switch (currentBtn.type) {
                        case typeBtn.apply: actionButton.on("click", config.addItemInGrid); break;
                        case typeBtn.cancel: actionButton.on("click", config.cancelEditOrAddInGrid); break;
                        case typeBtn.edit: actionButton.on("click", config.editItemInGrid); break;
                        case typeBtn.remove: actionButton.on("click", config.removeItemFromGrid); break;
                        case typeBtn.custom: actionButton.on("click", currentBtn.onClick); break;
                        default: break;
                    }
                });
            };

            buttons.forEach(function (current) {
                addButtonOnGrid(current.buttons, current.column);
                setUpEventButtons(current.buttons.editDelete);
                setUpEventButtons(current.buttons.cancelApply);
                setUpEventButtons(current.buttons.custom);
            });
        };
    }
    $.fn.ilge = function (options) {
        var inlineGrigEditing = new inLineGridEditing(this, options);
        inlineGrigEditing.setUpGrid();
    }
})(jQuery);