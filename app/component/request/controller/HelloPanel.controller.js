sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";
    return Controller.extend("project1.controller.HelloPanel", {
        onShowHello: function () {
            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },
        onOpenDialog: function () {
            // create dialog lazily
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "project1.view.fragment.HelloDialog"
                });
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },
        onCloseDialog: function () {
            // note: We don't need to chain to the pDialog promise, since this event-handler
            // is only called from within the loaded dialog itself.
            this.byId("helloDialog").close();
            this.pDialog = null;
        }
    });
});
