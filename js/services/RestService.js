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
                return new BaseRestService("Country","countryId","MdCountry");
            };
            self.districtService = function(){
                return new BaseRestService("District","distId","MdDistrict");
            };
            self.stateService = function(){
                return new BaseRestService("State","stateId","MdState");
            };
            self.branchService = function(){
                return new BaseRestService("Branch","cptBrId","MdCptBr");
            };
            self.rateTypeService = function(){
                return new BaseRestService("rateType","rateTypeId","MdRateType");
            };
            self.productService = function(){
                return new BaseRestService("Product","prodId","MdProd");
            };
            self.productTypeService = function(){
                return new BaseRestService("/MD_ProductType/ProductTypeRestPS","prodTypeId","MdProdType");
            };
            self.productGroupService = function(){
                return new BaseRestService("ProductGroup","prodGrpId","MdProdGrp");
            };
            self.counterpartyContactService = function(){
                return new BaseRestService("/MD_CounterpartyContacts/CPTContactRestPS","cptContId","MdCptContacts");
            };
            self.counterpartyService = function(){
                return new BaseRestService("MD_Counterparty/CPTRestPS","cptId","MdCpt");
            };
            self.counterpartySectorService = function(){
                return new BaseRestService("CounterpartySector","cptSctrId","MdCptSctr");
            };
            self.counterpartyTypeService = function(){
                return new BaseRestService("CounterpartyType","cptTypeId","MdCptType");
            };
            self.counterpartyGroupService = function(){
                return new BaseRestService("CounterpartyGroup","cptGrpId","MdCptGrp");
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
                return new BaseRestService("Organization","orgId","MdOrg");
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
            self.gstAccountTypeService = function(){
                return new BaseRestService("GSTAccountType","gstacctTypeId","MdGstacctType");
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
                return new BaseRestService("MD_FundSrcService/FundingSrcRestPS","fundHdrId","MdFundSrcHdr");
            };
            self.dayCountConventionService  = function(){
                return new BaseRestService("daycountconvention","DCConvId","MdDayCountConvention");
            };
            self.counterpartyService  = function(){
                return new BaseRestService("Counterparty","cptId","MdCpt");
            };
            self.cagamasRatingService  = function(){
                return new BaseRestService("CagamasRating","cagaRatingId","MdCagaRating");
            };
            self.bnmRatingService  = function(){
                return new BaseRestService("BnmRating","bnmRatingId","MdBnmRating");
            };
            self.counterpartyRatingService  = function(){
                return new BaseRestService("CounterpartyRating","cptRtgId","MdCptRating");
            };
            self.counterpartyAssetService  = function(){
                return new BaseRestService("CounterpartyAsset","cptAssetId","MdCptAsset");
            };
            self.counterpartyProductService  = function(){
                return new BaseRestService("CounterpartyProduct","cptProdId","MdCptProd");
            };
            self.counterpartyRatioFiService  = function(){
                return new BaseRestService("RatioFI","fiCptRtId","MdCptRtFi");
            };
            self.counterpartyVendorService  = function(){
                return new BaseRestService("CounterpartyVendor","vndrLineId","MdCptVndrLine");
            };
            self.ratingAgencyService  = function(){
                return new BaseRestService("RatingAgency","acyId","MdRatingAcy");
            };
            self.productEventCodeService  = function(){
                return new BaseRestService("ProductEventCode","prodEventId","MdProdeventCode");
            };
            self.fiReviewGroupService  = function(){
                return new BaseRestService("FiReviewGroup","rvwGrpId","MdRvwGrp");
            };
            self.postCodeService  = function(){
                return new BaseRestService("PostCode","postId","MdPostCode");
            };
            self.vendorService  = function(){
                return new BaseRestService("Vendor","vndrId","MdCptVndrHdr");
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
            self.eventService = function(){
                return new BaseRestService("event","EventId","MdEvent");
            };
            self.dbCodeService = function(){
                return new BaseRestService("databasecode","CompanyId","MdDatabaseCode");
            };
            self.fundingSourceTaggingService = function(){
                return new BaseRestService("MD_FundSourceDeal_Tagging/FundDealRestPS","fundLineId","MdFundSrcLine");
            };
            self.SunGLAccountService = function(){
                return new BaseRestService("SUNaccount","AccountId","MdGLAccount");
            };
            self.counterpartyService = function(){
                return new BaseRestService("Counterparty","cptId","MdCpt");
            };
            self.guarantorService = function(){
                return new BaseRestService("Guarantor","grntrId","MdGrntrHdr");
            };
            self.amortizationService = function(){
                return new BaseRestService("Amortization","amorMtdId","MdAmortization");
            };
            self.orgBankAccService = function(){
                return new BaseRestService("OrgBankAcc","orgBkId","MdOrgBankAcc");
            };
        };
        return new RestService();
});
