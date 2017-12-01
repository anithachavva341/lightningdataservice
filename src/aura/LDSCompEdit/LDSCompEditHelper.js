({
	saveRecord : function(component) {
        component.find("recordEdit").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
	            var resultsToast = $A.get("e.force:showToast");
	            resultsToast.setParams({
	                "title": "Saved",
                    "type": "success",
	                "message": "The record saved Successfully"
	            });
	            resultsToast.fire();            	
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
	}
})