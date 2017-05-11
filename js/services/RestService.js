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
            self.districtService = function(){
                return new BaseRestService("district","districtId","MdDistrict");
            };
            self.stateService = function(){
                return new BaseRestService("state","stateId","MdState");
            };
            self.branchService = function(){
                return new BaseRestService("branch","branchId","MdBranch");
            };
            self.rateTypeService = function(){
                return new BaseRestService("rateType","rateTypeId","MdRateType");
            };
            self.productTypeService = function(){
                return new BaseRestService("/MD_ProductType/ProductTypeRestPS","prodTypeId","MdProdType");
            };
            self.productGroupService = function(){
                return new BaseRestService("/MD_Product_Group/ProductGroupRestPS","prodGrpId","MdProdGrp");
            };
            self.counterpartyContactService = function(){
                return new BaseRestService("/MD_CounterpartyContacts/CPTContactRestPS","cptContId","MdCptContacts");
            };
            self.counterpartyService = function(){
                return new BaseRestService("MD_Counterparty/CPTRestPS","cptId","MdCpt");
            };
            self.counterpartySectorService = function(){
                return new BaseRestService("/MD_CounterpartySector/CPTSCTRRestPS","cptSctrId","MdCptSctr");
            };
            self.counterpartyTypeService = function(){
                return new BaseRestService("/MD_CounterPartyType/CPTTypeRestPS","cptTypeId","MdCptType");
            };
            self.counterpartyGroupService = function(){
                return new BaseRestService("cptyGroup","cptGrpId","MdCptGroup");
            };
            self.counterpartyGroupTypeService = function(){
                return new BaseRestService("cptyGroupType","cptGrpTypeId","MdCptGroupType");
            };
            self.agreementTypeService = function(){
                return new BaseRestService("agreementType","agreementTypId","MdAgreementTyp");
            };
            self.assetTypeService = function(){
                return new BaseRestService("/MD_AssetType/AssetTypeRestPS","assetTypeId","MdAssetType");
            };
            self.assetGroupService = function(){
                return new BaseRestService("/MD_Asset_Group/AssetGrpRestPS","assetGrpId","MdAssetGrp");
            };
            self.consumerTypeService = function(){
                return new BaseRestService("/MD_ConsumerTypeService/ConsmrTypeRestPS","consmrTypeId","MdConsmrType");
            };
            self.purchaseModeService = function(){
                return new BaseRestService("/MD_PurchaseMode/PurchaseModeRestPS","prchsModeId","MdPrchsMode");
            };
            self.purchaseConsSubTypeService = function(){
                return new BaseRestService("/MD_PurchaseConsSubType/PurConsSubTypeRestPS","consSubtypeId","MdConsSubType");
            };
            self.purchaseConsTypeService = function(){
                return new BaseRestService("/MD_PurchaseConType/PurConsTypeRestPS","consTypeId","MdConsType");
            };
            self.priceFactorService = function(){
                return new BaseRestService("/MD_PriceFactor/PriceFactorRestPS","priceFctrId","MdPriceFctr");
            };
            self.organizationTypeService = function(){
                return new BaseRestService("/organizationType","orgTypeId","MDOrganizationType");
            };
            self.organizationService = function(){
                return new BaseRestService("/organization","orgId","MDOrganization");
            };
            self.organizationHierarchyService = function(){
                return new BaseRestService("/MD_OrgHierarchy/OrgHierRestPS","orgHierId","MdOrgHier");
            };
            self.gstOrganizationService = function(){
                return new BaseRestService("/MD_GSTOrgCode/GSTOrgCodeRestPS","gstOrgId","MdGstOrgCode");
            };
            self.gstChargeTypeService = function(){
                return new BaseRestService("/MD_GST_ChargeType/GSTCrgTypeRestPS","gstCrgtypeId","MdGstcrgType");
            };
            self.gstFeeTypeService = function(){
                return new BaseRestService("/MD_GSTFeeType/GSTFeeTypeRestPS","gstFeetypeId","MdGstfeeType");
            };
            self.gstCodeService = function(){
                return new BaseRestService("gstCode","gstCodeId","MdGstCode");
            };
            self.gstTypeService = function(){
                return new BaseRestService("gstType","gstTypeId","MdGstType");
            };
            self.gstGLCodeService = function(){
                return new BaseRestService("gstGl","gstglId","MdGstglCode");
            };
            self.paymentFrequencyService = function(){
                return new BaseRestService("/MD_PaymentFrequency/PaymentFreqRestPS","pymtFreqId","MdPymtFreq");
            };
            self.paymentTypeService = function(){
                return new BaseRestService("/MD_PaymentType/PaymentTypeRestPS","pymtTypeId","MdPymtType");
            };
            self.exchangeRateTypeService = function(){
                return new BaseRestService("/MD_RateType/RateTypeRestPS","exRateTypeId","MdExchangeRateType");
            };
            self.exchangeRateService = function(){
                return new BaseRestService("exchangeRate","exRateId","MdExchangeRate");
            };
            self.currencyService = function(){
                return new BaseRestService("MD_CurrencyService/CurrencyRestPS","crncyId","MdCrncy");
            };
            self.exchangeRateDataEntryService = function(){
                return new BaseRestService("exchangeratedataentry","ExRateCd","MDExchangeRateDataEntry");
            };
            self.fundingSourceService = function(){
                return new BaseRestService("fundingsource","FundSrcId","MdFundingSource");
            };
            self.dayCountConventionService  = function(){
                return new BaseRestService("daycountconvention","DCConvId","MdDayCountConvention");
            };
            self.NBDConventionService  = function(){
                return new BaseRestService("nbdayconvention","NDBConvId","MdNonBusinessDayConvention");
            };
            self.productService = function(){
                return new BaseRestService("/MD_Product/ProductRestPS","prodCd","MdProd");
            };
            self.companyService = function(){
                return new BaseRestService("company","CompanyId","MdCompany");
            };
            self.accountService = function(){
                return new BaseRestService("account","AccountId","MdGLAccount");
            };
            self.dbCodeService = function(){
                return new BaseRestService("databasecode","CompanyId","MdDatabaseCode");
            };
        };
        return new RestService();
});
