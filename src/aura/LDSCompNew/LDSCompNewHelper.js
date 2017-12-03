({
	initializeRecord: function(component) {
        component.find("recordCreate").getNewRecord(
            "Lead", // sObject type
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.record");
                var error = component.get("v.recordError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
	},
	saveRecord : function(component) {
        component.find("recordCreate").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
	            var resultsToast = $A.get("e.force:showToast");
	            resultsToast.setParams({
	                "title": "Created",
                    "type": "success",
	                "message": "New Lead Created Successfully"
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