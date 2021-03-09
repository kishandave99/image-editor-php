function homeController($scope, $location, $rootScope, $window, $http, blockUI , appUrl, alert,  $routeParams, Upload, $timeout) {
    $scope.text = {};
    $scope.color = {};
    $scope.logo = {};
    $scope.ctaButton = {};
    $scope.ctaButton.isBold = false;
    $scope.ctaButton.isItalic = false;
    $scope.ctaButton.isUnderline = false;
    $scope.ctaButton.text = 'Button';
    $scope.position = {};
    $scope.title = {};
    $scope.title.isBold = false;
    $scope.title.isItalic = false;
    $scope.title.isUnderline = false;
    $scope.description = {};
    $scope.description.isBold = false;
    $scope.description.isItalic = false;
    $scope.description.isUnderline = false;
    $scope.description.text = 'Enter Description';
    $scope.position.logo = 'right';
    $scope.title.fontFamily = 'normal';
    $scope.fontTypeList = ["Times New Roman", "Georgia", "Arial", "Verdana", "serif", "calibri", "Helvetica"];
    $scope.fontStrengthList = ["Bold", "Italic"];
    $scope.fontSizeList = ["8px","9px","10px","11px","12px","13px","14px","15px","16px","17px","18px","19px","20px","21px","22px","23px","24px","25px","26px","27px","28px","29px","29px","30px","31px","32px","33px","34px","35px","36px","36px","37px","38px","39px","40px","41px","42px"];
    $scope.imageOpacityList = ["0.1","0.2","0.3","0.4","0.4","0.5","0.6","0.7","0.8","0.9","1"];
    $scope.title.text = "Enter Title";
    $scope.backGroundImage = 'resources/images/bg.jpg';
    
    $scope.uploadImage = function (fileView) {
        // var maxFileSize = 20000000;
        $scope.progress = 0;
        if (fileView.files == undefined || fileView.files == null) {
            $scope.uploadFileId = undefined;
        }
        if (fileView.files && fileView.files.length) {
            for (var i = 0; i < fileView.files.length; i++) {
                var file = fileView.files[i];
                console.log(file)
                $scope.fileView = {};
                // if (file.size > maxFileSize) {
                //     alert.popUpShowHide('failure', "file size is more then 5MB");
                //     return false;
                // }
                if (!file.$error) {
                    // var fileUploadblockUI = blockUI.instances.get('fileUploadblockUI');
                    blockUI.start();
                    $scope.isFileUpload = true;

                    Upload.upload({
                        url: 'image_api.php',
                        fields: {},
                        file: file
                    }).then(function (response) {
                        if(response != undefined && response.data != undefined && response.data.success == 1){
                            $scope.backGroundImage = response.data.data.uploaded_image_path;
                            console.log($scope.backGroundImage)
                        } else {
                            alert.popUpShowHide('failure', response.data.message);
                        }
                        // if (response.data.code >= 1000 && response.data.code < 2000) {
                        //     alert.popUpShowHide('success', "File Uploded Successfully");

                        //     if ($scope.text != undefined) {
                        //         $scope.text.imageFileView = {};
                        //         $scope.text.imageFileView = response.data.view;
                        //     }
                        // } else {
                        //     alert.popUpShowHide('failure', response.data.message);

                        // }
                        $timeout(function () {
                            $scope.isFileUpload = false;

                            blockUI.stop();
                        });
                    }, function (response) {
                        if (response != null) {
                            alert.popUpShowHide('failure', response.data.message);

                            $scope.isFileUpload = false;

                            blockUI.stop();
                        }
                    }, function (evt) {

                        var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                        $scope.progress = progressPercentage + '% ';
                    });
                }
            }
        }
    }

    $scope.uploadLogo = function (fileView) {
        // var maxFileSize = 20000000;
        $scope.progress = 0;
        if (fileView.files == undefined || fileView.files == null) {
            $scope.uploadLogoFileId = undefined;
        }
        if (fileView.files && fileView.files.length) {
            for (var i = 0; i < fileView.files.length; i++) {
                var file = fileView.files[i];
                console.log(file)
                $scope.fileView = {};
                // if (file.size > maxFileSize) {
                //     alert.popUpShowHide('failure', "file size is more then 5MB");
                //     return false;
                // }
                if (!file.$error) {
                    // var fileUploadBlockUi = blockUI.instances.get('fileUploadBlockUi');
                    blockUI.start();
                    $scope.isFileUpload = true;

                    Upload.upload({
                        url: 'image_api.php ',
                        fields: {},
                        file: file
                    }).then(function (response) {
                        $scope.logo.logoFileView = response.data.data;
                        console.log($scope.logo)

                        // if (response.data.code >= 1000 && response.data.code < 2000) {
                        //     alert.popUpShowHide('success', "File Uploded Successfully");

                        //     if ($scope.text != undefined) {
                        //         $scope.text.logoFileView = {};
                        //         $scope.text.logoFileView = response.data.view;
                        //     }
                        // } else {
                        //     alert.popUpShowHide('failure', response.data.message);

                        // }
                        $timeout(function () {
                            $scope.isFileUpload = false;

                            blockUI.stop();
                        });
                    }, function (response) {
                        if (response != null) {
                            alert.popUpShowHide('failure', response.data.message);

                            $scope.isFileUpload = false;

                            blockUI.stop();
                        }
                    }, function (evt) {

                        var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                        $scope.progress = progressPercentage + '% ';
                    });
                }
            }
        }
    }

    $scope.removeLogoFile = function (logo) {
        $scope.logo.logoFileView = undefined;
        // $(".dropify-clear")[0].click();
    }

    $scope.generateCanvas = function(){
        var tempImage;
        html2canvas([document.getElementById('html-content-holder')], {
            onrendered: function (canvas) {
                tempImage = canvas.toDataUrl("image/jpeg");
            }
        });

        var element =  document.getElementById('html-content-holder')
        html2canvas(element, {
            onrendered: function(canvas){
                getCanvas = canvas; 
            }
        });
        console.log(element);
        var imgageData =  getCanvas.toDataURL("image/png"); 
        console.log(element);

        var newData = tempImage.replace(/^data:image\/png/, "data:application/octet-stream"); 
        document.getElementById('html-content-holder').attr("download", "ImageDownload.png").attr("href" , newData)

        // html2canvas(element, { 
        //     onrendered: function(canvas) { 
        //         tempVar.append(canvas); 
        //         getCanvas = canvas; 
        //     } 
        // });     

      
    }


};
angular.module('image-editor')
.controller('homeController', homeController);  
