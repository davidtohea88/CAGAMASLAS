require(['knockout',
'ojs/ojcore',
'jquery',
'ojs/ojknockout',
'ojs/ojnavigationlist',
'ojs/ojjsontreedatasource'
],
function(ko, oj, $)
// this callback gets executed when all required modules are loaded
{
$.getJSON( "js/data/menu.json",
function(data)
{
    function ViewModel(){
        var self = this;
        self.selectedItem = ko.observable("None");
        self.dataSource =  new oj.JsonTreeDataSource(data);
    }
    return ViewModel;
});
}
);
