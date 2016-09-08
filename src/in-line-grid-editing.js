(function ($) {
    "use strict";
    var divClassButtonsEditDelete = "ilgeEditDelete";
    var divClassButtonsApplyCancel = "ilgeApplyCancel";
    var divClassButtonsCustom = "ilgeCustom";
    var inLineGridEditing = function (container, options) {
        options = options || {};
        container = $(container);
        var createElement = function (row) {
            var makeChanged = function (field, currentValue) {
                field.currentValue = currentValue;
                field.isChanged = true;
            }
            this.textField = function (field) {
                var textInput = $("<input>", { type: "text", name: field.name, id: field.name, "class": field.class });
                var td = row.find("td:nth-child(" + field.column + ")");
                makeChanged(field, td.html());
                textInput.val(field.currentValue);
                if (field.actionFormatter != undefined && typeof field.actionFormatter === "function")
                    field.actionFormatter(textInput);
                td.html(textInput);
            }
            this.numericField = function (field) {
                var numericInput = $("<input>", { type: "numeric", name: field.name, id: field.name, "class": field.class });
                var td = row.find("td:nth-child(" + field.column + ")");
                makeChanged(field, td.html());
                numericInput.val(field.currentValue);
                if (field.actionFormatter != undefined && typeof field.actionFormatter === "function")
                    field.actionFormatter(textInput);
                td.html(numericInput);
            }
            this.decimalField = function (field) {
                var textInput = $("<input>", { type: "numeric", name: field.name, id: field.name, "class": field.class });
                var td = row.find("td:nth-child(" + field.column + ")");
                makeChanged(field, td.html());
                textInput.val(field.currentValue);
                if (field.actionFormatter != undefined && typeof field.actionFormatter === "function")
                    field.actionFormatter(textInput);
                td.html(textInput);
            }
            this.boolField = function (field) {
                var checkInput = $("<input>", { type: "checkbox", name: field.name, id: field.name, "class": field.class });
                var td = row.find("td:nth-child(" + field.column + ")");
                var value = td.html().toLowerCase() === "true";
                makeChanged(field, value);
                checkInput.val(field.currentValue);
                checkInput.attr("checked", value);
                td.html(checkInput);
            }
            this.dateField = function (field) {
                var dateInput = $("<input>", { type: "date", name: field.name, id: field.name, "class": field.class });
                var td = row.find("td:nth-child(" + field.column + ")");
                makeChanged(field, td.html());
                dateInput.val(field.currentValue);
                if (field.actionFormatter != undefined && typeof field.actionFormatter === "function")
                    field.actionFormatter(dateInput);
                td.html(dateInput);
            }
            this.dateTimeField = function (field) {
                var textInput = $("<input>", { type: "datetime", name: field.name, id: field.name, "class": field.class });
                var td = row.find("td:nth-child(" + field.column + ")");
                makeChanged(field, td.html());
                textInput.val(field.currentValue);
                if (field.actionFormatter != undefined && typeof field.actionFormatter === "function")
                    field.actionFormatter(textInput);
                td.html(textInput);
            }

            this.selectField = function (field) {
                var selectInput = $("<select>", { type: "select", name: field.name, id: field.name, "class": field.class });
                var td = row.find("td:nth-child(" + field.column + ")");
                makeChanged(field, td.html());
                td.html(selectInput);
            }

        }
        var revertElement = function (row) {
            this.textField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? field.currentValue : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.numericField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? field.currentValue : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.decimalField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? field.currentValue : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.boolField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? field.currentValue : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue.toString());
            }
            this.dateField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? field.currentValue : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.dateTimeField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? field.currentValue : td.find("input[name=" + field.name + "]").val();
                td.html(htmlValue);
            }
            this.selectField = function (field, toOldValue) {
                var td = row.find("td:nth-child(" + field.column + ")");
                var htmlValue = (toOldValue) ? field.currentValue : td.find("select[name='" + field.name + "'] option:selected").html();
                td.html(htmlValue);
            }
        }
        var FieldElements = function (fields, row) {
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
                var paramns = [];
                console.log(row);
                field.paramns.loadBy.keys.forEach(function (current) {
                    var value = row.find("[name='" + current.from + "']option:selected");
                    console.log(value);
                    if (current.isInRow)
                        paramns.push(current.key + "=" + row.find("[name='" + current.from + "']").val());
                    else
                        paramns.push(current.key + "=" + row.closest("body").find("[name='" + current.from + "']").val());
                });

                var uri = setUrl(field.paramns.uri, paramns.join("&"));
                $.getJSON(uri, function (data) {
                    var result = fillDataFromResult(data, field);
                    callback(result);
                });
            }
            var getItemnsWithOutParameters = function (field, callback) {
                $.getJSON(field.paramns.uri, function (data) {
                    var result = fillDataFromResult(data, field);
                    callback(result);
                });
            }
            var fillDataFromResult = function (result, field) {
                var dataReturn = [];
                result.forEach(function (item) {
                    dataReturn.push({ value: item[field.paramns.valueField], html: item[field.paramns.textField] });
                });
                return dataReturn;
            }
            var getItemns = function (field, callback) {
                if (field.paramns.loadBy != undefined)
                    getItemnsWithParameters(field, callback);
                else
                    getItemnsWithOutParameters(field, callback);
            }
            var count = 0;
            var setUpFillSelectFields = function (selectFields, callback) {
                selectFields.forEach(function (currentField) {
                    getItemns(currentField, function (items) {
                        items.forEach(function (item) {
                            var isSelected = item.html == currentField.currentValue;
                            row.find("select[name='" + currentField.name + "']").append($("<option>", { value: item.value, html: item.html, selected: isSelected }));
                        });

                    });
                    count++;
                    console.log("Executing " + count + " getItem: " + " Field: " + currentField.name);
                });
                console.log("execute callback futions");
                if (typeof callback === "function")
                    callback();
            }
            this.setUpSelects = function () {
                var selectFields = fields.filter(function (field) { return field.type === fieldType.select; });
                var selectFieldsIndependents = selectFields.filter(function (field) { return field.paramns.loadBy === undefined; });
                var selectFieldsDependents = selectFields.filter(function (field) { return typeof field.paramns.loadBy === "object"; });
                selectFieldsIndependents.forEach(function (currentField) {
                    currentField.fieldsToLoad = selectFieldsDependents.filter(function (field) {
                        return field.paramns.loadBy.keys.filter(function (item) {
                            return item.from === currentField.name;
                        });
                    });
                });
                setUpFillSelectFields(selectFieldsIndependents, function () {
                    setUpFillSelectFields(selectFieldsDependents);
                });
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
                if (typeof callback === "function")
                    callback();
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
            this.EditItemInGrid = function (event) {
                var currentRow = $(this).closest("tr");
                showCancelApplyChangesButtons(currentRow);
                var editFields = getFields();
                var fieldElement = new FieldElements(editFields, currentRow);
                fieldElement.setUpInputsOnRow(fieldElement.setUpSelects);
            };
            this.removeItemFromGrid = function (event) {
                var currentRow = $(this).closest("tr");
                var keysToDelete = getKeyAsUrlParameter(currentRow);
                var url = setUrl(options.controller.uriDelete, keysToDelete);
                $.ajax({
                    method: "POST",
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
                var fieldElement = new FieldElements(editFields, currentRow);
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
                        divCustom.append($("<button>", { name: button.name, "class": button.class, type: "button" }).append($("<i>", { "class": button.icon })).append(button.text));
                    });
                    td.append(divCustom);
                });
            };
            var setUpEventButtons = function (buttons) {
                buttons.forEach(function (cur) {
                    switch (cur.type) {
                        case "apply":
                            container.find("[name='" + cur.name + "']").on("click", config.addItemInGrid);
                            break;
                        case "cancel":
                            container.find("[name='" + cur.name + "']").on("click", config.cancelEditOrAddInGrid);
                            break;
                        case "edit":
                            container.find("[name='" + cur.name + "']").on("click", config.EditItemInGrid);
                            break;
                        case "delete":
                            container.find("[name='" + cur.name + "']").on("click", config.removeItemFromGrid);
                            break;
                        case "custom":
                            container.find("[name='" + cur.name + "']").on("click", cur.onClick);
                            break;
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