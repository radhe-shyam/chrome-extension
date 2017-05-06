angular
    .module('app', [])
    .controller('TopController', TopController);

TopController.$inject = ['$scope', '$http'];

function TopController($scope, $http) {
    self = this;
    self.item = "cnote";
    self.baseUrl = "http://35.162.6.127/";
    self.cnoteNum, self.pinNum = {}, self.efrNum;
    self.options = ['C-note Details', 'EFR Details', 'Pincode Details'];
    self.itemSelected = itemSelected;
    self.cnote = true;
    self.efr = false;
    self.pin = false;
    self.submitCnote = submitCnote;
    self.submitPin = submitPin;
    self.submitEfr = submitEfr;
    self.cnoteArr, self.efrData, self.pinData;

    function itemSelected(item) {
        switch (item) {
            case 'cnote':
                self.cnote = true;
                self.efr = false;
                self.pin = false;
                break;
            case 'efr':
                self.cnote = false;
                self.efr = true;
                self.pin = false;
                break;
            case 'pin':
                self.cnote = false;
                self.efr = false;
                self.pin = true;
                break;
            default:
                self.cnote = false;
                self.efr = false;
                self.pin = false;
        }
    }

    function submitCnote(val) {
        if (val) {
            return $http({
                method: 'GET',
                url: self.baseUrl + 'customercare/getparcels?orderNumber=' + val
            }).then(function(response) {
                console.log(response);
                if(response.status===200){
                	if(response.data.data && response.data.data.length > 0){
                		self.cnoteArr = response.data.data;
                	}
                	else alert('No data found');
                }
            }, function(error) {
                console.log(error);
            });
        } else alert('Oops!, Please enter C-note to continue');
    }

    function submitEfr(val) {
        if (val) {
            return $http({
                method: 'GET',
                url: self.baseUrl + 'getPudoPointsUsingLoginName?loginName=' + val
            }).then(function(response) {
                if(response.status===200){
                	if(response.data.data){
                		self.efrData = response.data.data.pudoDetails;
                	}
                }
            }, function(error) {
                console.log(error);
            });
        } else alert('Oops!, Please enter EFR to continue');
    }

    function submitPin(val) {
        if (val.source && val.dest) {
            return $http({
                method: 'GET',
                url: self.baseUrl + 'pincodeDetails?src='+val.source+'&dst='+val.dest
            }).then(function(response) {
                console.log(response);
                if(response.status===200){
                	self.pinData = {
                		src: response.data.data.sourcePincode,
                		dst: response.data.data.destinationPincode
                	}
                }
            }, function(error) {
                console.log(error);
            });
        } else alert('Oops!, Please enter source pin-code and destination pin-code to continue');
    }
}
