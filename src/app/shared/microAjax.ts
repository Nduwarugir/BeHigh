export function setValues(url: string) {
    microAjax(url, function (res: string) {
	    res.split(String.fromCharCode(10)).forEach(
            function (entry: string) {
		        let fields = entry.split("|");
		        if(fields[2] == "input") {
				    // document.getElementById(fields[0]).value = fields[1];
		        }
		        else if(fields[2] == "div") {
				    // document.getElementById(fields[0]).innerHTML  = fields[1];

		        } else if(fields[2] == "chk") {
				    document.getElementById(fields[0]).checked  = fields[1];
		        }
            }
        );
	});

}

function microAjax(B: any, A: any) {

    let postBody = (arguments[2] || "");
    let callbackFunction = A;
    let url = B;
    let request = getRequest();

    function bindFunction(E: any, D: any) {
        return function() {
            return E.apply(D,[D]);
        };
    }

    function stateChange(_D: any) {
        if (request?.readyState == 4) {
            callbackFunction(request.responseText);
        }
    };

    function getRequest() {

        // var helper = const name = new Active(arguments);
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    };

    if (request) {
        var C = request;
        C.onreadystatechange = bindFunction(stateChange, microAjax);
        if (postBody !== "") {
            C.open("POST", B, true);
            C.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            C.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            C.setRequestHeader("Connection", "close");
        } else {
            C.open("GET", B, true);
        }
        C.send(postBody);
    }
}
