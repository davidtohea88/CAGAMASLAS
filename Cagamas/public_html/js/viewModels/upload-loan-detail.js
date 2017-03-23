    var redirectToPI = function(item) {
        history.pushState(null, '', 'index.html?root=origination-pi-2' );
        oj.Router.sync();
    };


define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {


   var deptArray = [
   {SerialNumber: 1, LoanRefNum: '701426959400000', BranchCode: '701', BookBalance: '66,230.53', ForecastedBookBalance: '', MortgageRate: '5.35', MortgageInstallment: '0,625.00', Month: '0'},
{SerialNumber: 2, LoanRefNum: '701428857200000', BranchCode: '701', BookBalance: '100,546.20', ForecastedBookBalance: '', MortgageRate: '5.5', MortgageInstallment: '0,548.00', Month: '0'},
{SerialNumber: 3, LoanRefNum: '701430006800000', BranchCode: '701', BookBalance: '188,682.24', ForecastedBookBalance: '', MortgageRate: '5.2', MortgageInstallment: '1,011.00', Month: '0'},
{SerialNumber: 4, LoanRefNum: '701430850600000', BranchCode: '701', BookBalance: '111,281.66', ForecastedBookBalance: '', MortgageRate: '5.2', MortgageInstallment: '0,650.00', Month: '0'},
{SerialNumber: 5, LoanRefNum: '701432240100000', BranchCode: '701', BookBalance: '330,107.46', ForecastedBookBalance: '', MortgageRate: '4.85', MortgageInstallment: '1,761.00', Month: '0'},
{SerialNumber: 6, LoanRefNum: '701433081100000', BranchCode: '701', BookBalance: '160,492.57', ForecastedBookBalance: '', MortgageRate: '4.95', MortgageInstallment: '0,924.00', Month: '0'},
{SerialNumber: 7, LoanRefNum: '701434742000000', BranchCode: '701', BookBalance: '196,812.82', ForecastedBookBalance: '', MortgageRate: '4.75', MortgageInstallment: '0,911.00', Month: '0'},
{SerialNumber: 8, LoanRefNum: '701434799400000', BranchCode: '701', BookBalance: '209,492.32', ForecastedBookBalance: '', MortgageRate: '4.75', MortgageInstallment: '0,855.00', Month: '0'},
{SerialNumber: 9, LoanRefNum: '701435080400000', BranchCode: '701', BookBalance: '234,848.35', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,116.00', Month: '0'},
{SerialNumber: 10, LoanRefNum: '701435341200000', BranchCode: '701', BookBalance: '241,761.13', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '0,950.00', Month: '0'},
{SerialNumber: 11, LoanRefNum: '701435514800000', BranchCode: '701', BookBalance: '217,593.04', ForecastedBookBalance: '', MortgageRate: '4.95', MortgageInstallment: '1,025.00', Month: '0'},
{SerialNumber: 12, LoanRefNum: '701436727800000', BranchCode: '701', BookBalance: '425,740.21', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,274.00', Month: '0'},
{SerialNumber: 13, LoanRefNum: '701438424500000', BranchCode: '701', BookBalance: '298,917.79', ForecastedBookBalance: '', MortgageRate: '4.4', MortgageInstallment: '1,311.00', Month: '0'},
{SerialNumber: 14, LoanRefNum: '701438642600000', BranchCode: '701', BookBalance: '265,659.70', ForecastedBookBalance: '', MortgageRate: '4.85', MortgageInstallment: '1,224.00', Month: '0'},
{SerialNumber: 15, LoanRefNum: '701439511500000', BranchCode: '701', BookBalance: '282,876.65', ForecastedBookBalance: '', MortgageRate: '5.05', MortgageInstallment: '1,429.00', Month: '0'},
{SerialNumber: 16, LoanRefNum: '701441307500000', BranchCode: '701', BookBalance: '366,948.01', ForecastedBookBalance: '', MortgageRate: '4.75', MortgageInstallment: '1,691.00', Month: '0'},
{SerialNumber: 17, LoanRefNum: '701441455100000', BranchCode: '701', BookBalance: '275,902.80', ForecastedBookBalance: '', MortgageRate: '4.75', MortgageInstallment: '1,314.00', Month: '0'},
{SerialNumber: 18, LoanRefNum: '701441477200000', BranchCode: '701', BookBalance: '277,258.86', ForecastedBookBalance: '', MortgageRate: '4.95', MortgageInstallment: '1,396.00', Month: '0'},
{SerialNumber: 19, LoanRefNum: '701441767400000', BranchCode: '701', BookBalance: '276,618.26', ForecastedBookBalance: '', MortgageRate: '4.75', MortgageInstallment: '1,153.00', Month: '0'},
{SerialNumber: 20, LoanRefNum: '701441880800000', BranchCode: '701', BookBalance: '323,050.75', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,362.00', Month: '0'},
{SerialNumber: 21, LoanRefNum: '701441916200000', BranchCode: '701', BookBalance: '301,851.83', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,557.00', Month: '0'},
{SerialNumber: 22, LoanRefNum: '701442026800000', BranchCode: '701', BookBalance: '340,422.02', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,507.00', Month: '0'},
{SerialNumber: 23, LoanRefNum: '701443086700000', BranchCode: '701', BookBalance: '295,262.09', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,294.00', Month: '0'},
{SerialNumber: 24, LoanRefNum: '701443329700000', BranchCode: '701', BookBalance: '212,135.28', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '1,113.00', Month: '0'},
{SerialNumber: 25, LoanRefNum: '701444268700000', BranchCode: '701', BookBalance: '322,393.12', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '1,333.00', Month: '0'},
{SerialNumber: 26, LoanRefNum: '701444598800000', BranchCode: '701', BookBalance: '242,150.99', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '1,101.00', Month: '0'},
{SerialNumber: 27, LoanRefNum: '701444915000000', BranchCode: '701', BookBalance: '326,162.41', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '1,351.00', Month: '0'},
{SerialNumber: 28, LoanRefNum: '701445021300000', BranchCode: '701', BookBalance: '589,366.79', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,578.00', Month: '0'},
{SerialNumber: 29, LoanRefNum: '701445444800000', BranchCode: '701', BookBalance: '312,442.67', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,526.00', Month: '0'},
{SerialNumber: 30, LoanRefNum: '701445554100000', BranchCode: '701', BookBalance: '342,864.68', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,491.00', Month: '0'},
{SerialNumber: 31, LoanRefNum: '701445973300000', BranchCode: '701', BookBalance: '254,209.45', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,300.00', Month: '0'},
{SerialNumber: 32, LoanRefNum: '701446276900000', BranchCode: '701', BookBalance: '672,169.51', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,812.00', Month: '0'},
{SerialNumber: 33, LoanRefNum: '701446322600000', BranchCode: '701', BookBalance: '248,265.16', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '1,343.00', Month: '0'},
{SerialNumber: 34, LoanRefNum: '701446352800000', BranchCode: '701', BookBalance: '590,735.02', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,420.00', Month: '0'},
{SerialNumber: 35, LoanRefNum: '701446624100000', BranchCode: '701', BookBalance: '239,715.73', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,221.00', Month: '0'},
{SerialNumber: 36, LoanRefNum: '701446954200000', BranchCode: '701', BookBalance: '231,681.59', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,250.00', Month: '0'},
{SerialNumber: 37, LoanRefNum: '701447083400000', BranchCode: '701', BookBalance: '266,874.06', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,140.00', Month: '0'},
{SerialNumber: 38, LoanRefNum: '701447427900000', BranchCode: '701', BookBalance: '249,698.47', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,188.00', Month: '0'},
{SerialNumber: 39, LoanRefNum: '701447448100000', BranchCode: '701', BookBalance: '480,077.46', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,513.00', Month: '0'},
{SerialNumber: 40, LoanRefNum: '701447498800000', BranchCode: '701', BookBalance: '348,038.05', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,592.00', Month: '0'},
{SerialNumber: 41, LoanRefNum: '701447519400000', BranchCode: '701', BookBalance: '220,707.62', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '0,984.00', Month: '0'},
{SerialNumber: 42, LoanRefNum: '701447565800000', BranchCode: '701', BookBalance: '52,685.00', ForecastedBookBalance: '', MortgageRate: '5.05', MortgageInstallment: '0,281.00', Month: '0'},
{SerialNumber: 43, LoanRefNum: '701447621200000', BranchCode: '701', BookBalance: '330,441.07', ForecastedBookBalance: '', MortgageRate: '4.4', MortgageInstallment: '1,514.00', Month: '0'},
{SerialNumber: 44, LoanRefNum: '701447623900000', BranchCode: '701', BookBalance: '203,593.32', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '0,953.00', Month: '0'},
{SerialNumber: 45, LoanRefNum: '701447640900000', BranchCode: '701', BookBalance: '386,050.05', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,745.00', Month: '0'},
{SerialNumber: 46, LoanRefNum: '701447678600000', BranchCode: '701', BookBalance: '299,264.76', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,576.00', Month: '0'},
{SerialNumber: 47, LoanRefNum: '701447829000000', BranchCode: '701', BookBalance: '302,135.11', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,188.00', Month: '0'},
{SerialNumber: 48, LoanRefNum: '701447837100000', BranchCode: '701', BookBalance: '500,968.22', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,232.00', Month: '0'},
{SerialNumber: 49, LoanRefNum: '701447854100000', BranchCode: '701', BookBalance: '145,695.72', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,778.00', Month: '0'},
{SerialNumber: 50, LoanRefNum: '701447962900000', BranchCode: '701', BookBalance: '226,970.80', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,107.00', Month: '0'},
{SerialNumber: 51, LoanRefNum: '701448007400000', BranchCode: '701', BookBalance: '253,795.59', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,337.00', Month: '0'},
{SerialNumber: 52, LoanRefNum: '701448265400000', BranchCode: '701', BookBalance: '326,673.29', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,556.00', Month: '0'},
{SerialNumber: 53, LoanRefNum: '701448307300000', BranchCode: '701', BookBalance: '278,191.41', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,453.00', Month: '0'},
{SerialNumber: 54, LoanRefNum: '701448313800000', BranchCode: '701', BookBalance: '300,242.54', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,336.00', Month: '0'},
{SerialNumber: 55, LoanRefNum: '701448314600000', BranchCode: '701', BookBalance: '202,866.76', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,057.00', Month: '0'},
{SerialNumber: 56, LoanRefNum: '701448352900000', BranchCode: '701', BookBalance: '274,366.68', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,442.00', Month: '0'},
{SerialNumber: 57, LoanRefNum: '701448445200000', BranchCode: '701', BookBalance: '71,750.37', ForecastedBookBalance: '', MortgageRate: '5.05', MortgageInstallment: '0,338.00', Month: '0'},
{SerialNumber: 58, LoanRefNum: '701449021500000', BranchCode: '701', BookBalance: '143,414.85', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,660.00', Month: '0'},
{SerialNumber: 59, LoanRefNum: '701449075400000', BranchCode: '701', BookBalance: '187,092.41', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,860.00', Month: '0'},
{SerialNumber: 60, LoanRefNum: '701449115700000', BranchCode: '701', BookBalance: '358,756.18', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,662.00', Month: '0'},
{SerialNumber: 61, LoanRefNum: '701449117300000', BranchCode: '701', BookBalance: '167,916.39', ForecastedBookBalance: '', MortgageRate: '4.95', MortgageInstallment: '0,876.00', Month: '0'},
{SerialNumber: 62, LoanRefNum: '701449210200000', BranchCode: '701', BookBalance: '228,834.07', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,097.00', Month: '0'},
{SerialNumber: 63, LoanRefNum: '701449267600000', BranchCode: '701', BookBalance: '144,631.81', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,659.00', Month: '0'},
{SerialNumber: 64, LoanRefNum: '701449441500000', BranchCode: '701', BookBalance: '219,009.18', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '0,979.00', Month: '0'},
{SerialNumber: 65, LoanRefNum: '701449446600000', BranchCode: '701', BookBalance: '179,153.59', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,826.00', Month: '0'},
{SerialNumber: 66, LoanRefNum: '701449462800000', BranchCode: '701', BookBalance: '250,312.19', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,250.00', Month: '0'},
{SerialNumber: 67, LoanRefNum: '701449526800000', BranchCode: '701', BookBalance: '349,593.04', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,550.00', Month: '0'},
{SerialNumber: 68, LoanRefNum: '701449643400000', BranchCode: '701', BookBalance: '346,854.10', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,596.00', Month: '0'},
{SerialNumber: 69, LoanRefNum: '701449823200000', BranchCode: '701', BookBalance: '187,040.60', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '0,840.00', Month: '0'},
{SerialNumber: 70, LoanRefNum: '701449828300000', BranchCode: '701', BookBalance: '488,233.44', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,237.00', Month: '0'},
{SerialNumber: 71, LoanRefNum: '701449838000000', BranchCode: '701', BookBalance: '131,827.06', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,603.00', Month: '0'},
{SerialNumber: 72, LoanRefNum: '701449930100000', BranchCode: '701', BookBalance: '327,243.13', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,701.00', Month: '0'},
{SerialNumber: 73, LoanRefNum: '701449957300000', BranchCode: '701', BookBalance: '170,230.66', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,795.00', Month: '0'},
{SerialNumber: 74, LoanRefNum: '701450095400000', BranchCode: '701', BookBalance: '361,422.08', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,783.00', Month: '0'},
{SerialNumber: 75, LoanRefNum: '701450276000000', BranchCode: '701', BookBalance: '812,762.08', ForecastedBookBalance: '', MortgageRate: '4.4', MortgageInstallment: '3,678.00', Month: '0'},
{SerialNumber: 76, LoanRefNum: '701450288400000', BranchCode: '701', BookBalance: '435,390.79', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,929.00', Month: '0'},
{SerialNumber: 77, LoanRefNum: '701450448800000', BranchCode: '701', BookBalance: '535,506.07', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,366.00', Month: '0'},
{SerialNumber: 78, LoanRefNum: '701450687100000', BranchCode: '701', BookBalance: '160,095.28', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,730.00', Month: '0'},
{SerialNumber: 79, LoanRefNum: '701450882300000', BranchCode: '701', BookBalance: '383,049.83', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,701.00', Month: '0'},
{SerialNumber: 80, LoanRefNum: '701450937400000', BranchCode: '701', BookBalance: '434,654.24', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,001.00', Month: '0'},
{SerialNumber: 81, LoanRefNum: '701450957900000', BranchCode: '701', BookBalance: '521,576.69', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,316.00', Month: '0'},
{SerialNumber: 82, LoanRefNum: '701451022400000', BranchCode: '701', BookBalance: '139,867.97', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,743.00', Month: '0'},
{SerialNumber: 83, LoanRefNum: '701451080100000', BranchCode: '701', BookBalance: '296,469.58', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,397.00', Month: '0'},
{SerialNumber: 84, LoanRefNum: '701451195600000', BranchCode: '701', BookBalance: '506,905.33', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,412.00', Month: '0'},
{SerialNumber: 85, LoanRefNum: '701451331200000', BranchCode: '701', BookBalance: '516,231.60', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '2,286.00', Month: '0'},
{SerialNumber: 86, LoanRefNum: '701451362200000', BranchCode: '701', BookBalance: '295,325.26', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,310.00', Month: '0'},
{SerialNumber: 87, LoanRefNum: '701451604400000', BranchCode: '701', BookBalance: '259,708.76', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,160.00', Month: '0'},
{SerialNumber: 88, LoanRefNum: '701451633800000', BranchCode: '701', BookBalance: '250,307.28', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '1,299.00', Month: '0'},
{SerialNumber: 89, LoanRefNum: '730422743600000', BranchCode: '730', BookBalance: '260,315.81', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,167.00', Month: '0'},
{SerialNumber: 90, LoanRefNum: '730422759200000', BranchCode: '730', BookBalance: '284,031.96', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,327.00', Month: '0'},
{SerialNumber: 91, LoanRefNum: '730422915300000', BranchCode: '730', BookBalance: '260,922.23', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,281.00', Month: '0'},
{SerialNumber: 92, LoanRefNum: '730422976500000', BranchCode: '730', BookBalance: '612,364.01', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '2,778.00', Month: '0'},
{SerialNumber: 93, LoanRefNum: '730422985400000', BranchCode: '730', BookBalance: '231,991.88', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,031.00', Month: '0'},
{SerialNumber: 94, LoanRefNum: '730423034800000', BranchCode: '730', BookBalance: '314,788.94', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '1,397.00', Month: '0'},
{SerialNumber: 95, LoanRefNum: '730423067400000', BranchCode: '730', BookBalance: '308,227.63', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '1,387.00', Month: '0'},
{SerialNumber: 96, LoanRefNum: '730423152200000', BranchCode: '730', BookBalance: '317,036.45', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '1,406.00', Month: '0'},
{SerialNumber: 97, LoanRefNum: '730423208100000', BranchCode: '730', BookBalance: '89,320.89', ForecastedBookBalance: '', MortgageRate: '5.05', MortgageInstallment: '0,426.00', Month: '0'},
{SerialNumber: 98, LoanRefNum: '730423235900000', BranchCode: '730', BookBalance: '81,876.03', ForecastedBookBalance: '', MortgageRate: '5.05', MortgageInstallment: '0,400.00', Month: '0'},
{SerialNumber: 99, LoanRefNum: '730423253700000', BranchCode: '730', BookBalance: '252,458.29', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,131.00', Month: '0'},
{SerialNumber: 100, LoanRefNum: '730423300200000', BranchCode: '730', BookBalance: '249,314.43', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,109.00', Month: '0'},
{SerialNumber: 101, LoanRefNum: '730423373800000', BranchCode: '730', BookBalance: '587,418.53', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '2,762.00', Month: '0'},
{SerialNumber: 102, LoanRefNum: '730423515300000', BranchCode: '730', BookBalance: '245,938.62', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,114.00', Month: '0'},
{SerialNumber: 103, LoanRefNum: '730423647800000', BranchCode: '730', BookBalance: '387,045.76', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '1,844.00', Month: '0'},
{SerialNumber: 104, LoanRefNum: '730423673700000', BranchCode: '730', BookBalance: '358,225.79', ForecastedBookBalance: '', MortgageRate: '4.4', MortgageInstallment: '1,800.00', Month: '0'},
{SerialNumber: 105, LoanRefNum: '730423731800000', BranchCode: '730', BookBalance: '498,547.63', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '2,335.00', Month: '0'},
{SerialNumber: 106, LoanRefNum: '730423773300000', BranchCode: '730', BookBalance: '854,848.20', ForecastedBookBalance: '', MortgageRate: '4.45', MortgageInstallment: '3,973.00', Month: '0'},
{SerialNumber: 107, LoanRefNum: '730423786500000', BranchCode: '730', BookBalance: '159,258.95', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,767.00', Month: '0'},
{SerialNumber: 108, LoanRefNum: '730423791100000', BranchCode: '730', BookBalance: '287,042.36', ForecastedBookBalance: '', MortgageRate: '4.55', MortgageInstallment: '1,280.00', Month: '0'},
{SerialNumber: 109, LoanRefNum: '730423793800000', BranchCode: '730', BookBalance: '148,865.65', ForecastedBookBalance: '', MortgageRate: '4.65', MortgageInstallment: '0,820.00', Month: '0'},
{SerialNumber: 110, LoanRefNum: '730423888800000', BranchCode: '730', BookBalance: '326,721.49', ForecastedBookBalance: '', MortgageRate: '4.5', MortgageInstallment: '1,533.00', Month: '0'}

    ];
    self.pagingDatasource = ko.observable();
    header="Upload Loan Detail";
    self.openFileDialog = function (){
              document.getElementById("browseFile").click();
            };
    self.loadTable=function()
    {
        self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'LoanRefNum'})));
    };
            
  }
  return viewModel;
});
