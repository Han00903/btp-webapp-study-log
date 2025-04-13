sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/Device",
    "project1/model/models"
], function (UIComponent, JSONModel, ResourceModel, Device, models) {
    "use strict";
    return UIComponent.extend("project1.Component", {
        metadata: {
            manifest: "json", // <- 여기로 옮겨야 함
            interfaces: ["sap.ui.core.IAsyncContentCreation"],
            rootView: {
                viewName: "project1.view.App",
                type: "XML",
                id: "app"
            }
        },

        init: function () {
            // 부모 init 먼저 호출
            UIComponent.prototype.init.apply(this, arguments);

            // OData 라우터 초기화
            this.getRouter().initialize();

            // 디바이스 모델
            this.setModel(models.createDeviceModel(), "device");

            // JSON 테스트 모델
            var oData = {
                recipient: {
                    name: "World"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            // i18n 모델
            var i18nModel = new ResourceModel({
                bundleName: "project1.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
        }
    });
});
