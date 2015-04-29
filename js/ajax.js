function HTTPRequest(URL, requestType, dataType, callbackFunction, dataSource){
  // Using the core $.ajax() method
$.ajax({
    url: URL,
    type: requestType,
    dataType : dataType,

    // Code to run if the request succeeds;
    // the response is passed to the function
    success: function(receivedData) {
      callbackFunction(receivedData, dataSource);
    },

    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status, errorThrown ) {
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },

    // Code to run regardless of success or failure
    complete: function( xhr, status ) {
    }
});

}
