({
	deleteRecord : function(component) {
		component.find("recordDelete").deleteRecord($A.getCallback(function(deleteResult) {
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
	            var resultsToast = $A.get("e.force:showToast");
	            resultsToast.setParams({
	                "title": "Deleted",
	                "type": "error",
	                "message": "The record deleted Successfully"
	            });
	            resultsToast.fire();            	
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
		}));
	}
})