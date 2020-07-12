// For implementing google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'Google_Analytics_Tracking_Id', 'auto');   
    ga('send', 'pageview');


//set custom options
const viewerConfig = {
    defaultViewMode: "FIT_PAGE", //default mode is set to fit_page
    showPageControls : true,  //display controls
    showAnnotationTools: true, //display annotation tools
    showDownloadPDF : true,  //display download option
    showPrintPDF:true,  //display print option
    dockPageControls:true,  //user can dock/undock
    showLeftHandPanel:false //remove other options
};

document.addEventListener("adobe_dc_view_sdk.ready", function () {
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "806df4d950134825880c29bbec54c2fb",    ///REPLACE IT WITH YOUR VIEW SDK CLIENT ID
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            //Location of PDF
            location: {
                url: "../../resources/website.pdf",
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "Full_Window.pdf"
        }
    }, viewerConfig);

    adobeDCView.registerCallback(
        AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
        function (event) {
            switch(event.type){
                case 'DOCUMENT_OPEN': ga('send', 'event', 'DOCUMENT_OPEN', event.data.fileName, 'open document');
                break;
                case 'PAGE_VIEW' : ga('send', 'event', 'PAGE_VIEW', `${event.data.pageNumber} of ${event.data.fileName}`, 'view page');
                break;
                case 'DOCUMENT_DOWNLOAD':ga('send', 'event', 'DOCUMENT_DOWNLOAD', event.data.fileName, 'download document'); 
                break;
                case 'TEXT_COPY' :  ga('send', 'event', 'TEXT_COPY', `${event.data.copiedText} of ${event.data.fileName}`, 'copy text');
                break;
                default: ;
            }
        },
        {
            enablePDFAnalytics: true,//turn on pdf analytics
        }
    );
});


// ga('send', {
//     hitType: 'event',
//     eventCategory: 'pdf',
//     eventAction: 'text_copy',
//     eventLabel:`${event.data.copiedText},${event.data.fileName}`
//   });