/* 
 * To change self license header, choose License Headers in Project Properties.
 * To change self template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

define(['services/BaseRestService','ojs/ojcore' ,'knockout'],
    function(BaseRestService) {
        var RestService = function() {
            var self = this;
            self.countryService = function(){
                return new BaseRestService("country","countryId","MdCountry");
            };
            self.stateService = function(){
                return new BaseRestService("state","stateId","MdState");
            };
            self.rateTypeService = function(){
                return new BaseRestService("rateType","rateTypeId","MdRateType");
            };
            self.productTypeService = function(){
                return new BaseRestService("productType","prodTypeId","MdProdType");
            };
            self.productGroupService = function(){
                return new BaseRestService("productGroup","prodGrpId","MdProdGrp");
            };
            self.agreementTypeService = function(){
                return new BaseRestService("agreementType","agreementTypId","MdAgreementTyp");
            };
            self.assetTypeService = function(){
                return new BaseRestService("assetType","assetTypeId","MdAssetType");
            };
            self.assetGroupService = function(){
                return new BaseRestService("assetGroup","assetGrpId","MdAssetGrp");
            };
            self.consumerTypeService = function(){
                return new BaseRestService("consumerType","consmrTypeId","MdConsumerType");
            };
            self.purchaseModeService = function(){
                return new BaseRestService("purchaseMode","prchsModeId","MdPrchsMode");
            };
            self.purchaseConsTypeService = function(){
                return new BaseRestService("purchaseConsType","consTypeId","MdConsType");
            };
        };
        return new RestService();
});
