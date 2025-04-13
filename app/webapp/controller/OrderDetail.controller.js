sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"
], function (Controller, JSONModel, formatter) {
    "use strict";
    return Controller.extend("project1.controller.OrderDetail", {
        formatter: formatter,
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("OrderDetail");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: async function () {
            let SelectedNum = window.location.href.slice(-10);
            const Request = await $.ajax({
                type: "get",
                url: "/request/Request?$filter=request_number eq " + SelectedNum
            });
            let RequestModel = new JSONModel(Request.value);
            this.getView().setModel(RequestModel, "RequestModel");
            console.log(RequestModel.oData[0]);
            let visibleMode = new JSONModel({ footer: false, reject: false });
            if (RequestModel.oData[0].request_state == 'B') {
                visibleMode.oData.footer = true;
            } else if (RequestModel.oData[0].request_state == 'C') {
                visibleMode.oData.reject = true;
            }
            this.getView().setModel(visibleMode, "visibleMode");
        },
        onApprove: async function () {
            let temp = new JSONModel(this.temp).oData;
            temp.request_number = parseInt(this.byId("ReqNum").getText());
            temp.request_state = "A";
            let url = "/request/Request/" + temp.request_number;
            await this.onUpdate(url, temp);
        },
        onUpdate: async function (url, data) {
            await fetch(url, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json;IEEE754Compatible=true",
                },
            })
            this.onBack();
        },
        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("Request");
        },
    });
});
