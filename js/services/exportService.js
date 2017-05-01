/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['xlsx-js','file-saverjs','blobjs'],
    function(XLSX) {
        var ExportServiceUtilities = function() {

            var self = this;

            self.datenum = function(v, date1904) {
                if(date1904) v+=1462;
                var epoch = Date.parse(v);
                return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
            };

            self.sheet_from_array_of_arrays = function(columns, data, fnRenderer) {
                var ws = {};
                var C = 0, R = 0;
                
                for(C = 0; C < columns.length; ++C) {
                    var cell = {v: columns[C].headerText };
                    var cell_ref = XLSX.utils.encode_cell({c:C,r:0});
                    if(cell.v !== null) {
                        if(typeof cell.v === 'number') cell.t = 'n';
                        else if(typeof cell.v === 'boolean') cell.t = 'b';
                        else if(cell.v instanceof Date) {
                                cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                                cell.v = datenum(cell.v);
                        }
                        else cell.t = 's';
                    }
                    ws[cell_ref] = cell;
                }
                
                for(R = 0; R < data.length; ++R) {
                    C = 0;
                    for(C = 0; C < columns.length; ++C) {
                        var value = undefined;
                        if (data[R].hasOwnProperty(columns[C].field)){
                            value = fnRenderer(columns[C].field,data[R][columns[C].field]);
                        }
                        var cell = {v: value };
                        var cell_ref = XLSX.utils.encode_cell({c:C,r:R+1});
                        if(cell.v !== null) {
                            if(typeof cell.v === 'number') cell.t = 'n';
                            else if(typeof cell.v === 'boolean') cell.t = 'b';
                            else if(cell.v instanceof Date) {
                                    cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                                    cell.v = datenum(cell.v);
                            }
                            else cell.t = 's';
                        }
                        ws[cell_ref] = cell;
                    }
                }
                var range = {s: {c:0, r:0}, e: {c:(C-1), r:R }};
                if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                return ws;
            };

            self.Workbook = function() {
                if(!(this instanceof self.Workbook)) return new XLSX.Workbook();
                this.SheetNames = [];
                this.Sheets = {};
            };

            self.s2ab = function(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i<s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            };

            self.export = function(header,data, type, filename, fnRenderer){
               
                var wb = new self.Workbook(), ws = self.sheet_from_array_of_arrays(header,data,fnRenderer);
                
                var mime = undefined;
                if (type === 'csv'){
                    mime = "text/plain";
                    var wbout = XLSX.utils.sheet_to_csv(ws);
                    saveAs(new Blob([self.s2ab(wbout)],{type:mime}),filename);
                }else if (type === 'xlsx'){
                    mime = "application/octet-stream";
                    wb.SheetNames.push("Data");
                    wb.Sheets["Data"] = ws;
                    var wbout = XLSX.write(wb, {bookType: type, bookSST:true, type: 'binary'});
                    saveAs(new Blob([self.s2ab(wbout)],{type:mime}), filename);
                }
            };
        };
        
        return new ExportServiceUtilities();
    }
);