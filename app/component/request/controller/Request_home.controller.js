sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller) {
    "use strict";
    return Controller.extend("project1.component.request.controller.Request_home", {
        onRequest_list: function () {
            this.getOwnerComponent().getRouter().navTo("Request");
        }
    });
});
