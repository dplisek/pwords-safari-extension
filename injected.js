AES_Init();

var block = new Array(16);
for(var i = 0; i < 16; i++)
block[i] = 0x11 * i;

var key = new Array(32);
for(var i = 0; i < 32; i++)
key[i] = i;

AES_ExpandKey(key);
AES_Encrypt(block, key);

AES_Done();

for (var i = 0; i < block.length; i++) {
    console.log(block[i]);
}

AES_Init();

AES_Decrypt(block, key);

AES_Done();

console.log();
console.log();
console.log();


for (var i = 0; i < block.length; i++) {
    console.log(block[i]);
}


var usernameSubstrings = ["username", "user", "email", "login", "appleid"];
var usernameTypes = ["text", "email"];
var passwordSubstrings = ["password", "pass"];
var passwordTypes = ["password"];

hilightFields();

safari.self.addEventListener("message", insertpass, false);

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var hilightTimeout;

var observer = new MutationObserver(function(mutations, observer) {
                                        if (hilightTimeout) clearTimeout(hilightTimeout);
                                        hilightTimeout = setTimeout(hilightFields, 500);
                                    });

observer.observe(document, {
                 subtree: true,
                 attributes: true
                 });

function hilightFields() {
    console.log("Hilighting fields.");
	var usernameFields = findUsernameFields();
    for (var i = 0; i < usernameFields.length; i++) {
        if (usernameFields[i] != null && usernameFields[i].className.indexOf("shake-me") == -1) {
            usernameFields[i].className += " shake-me";
        }
    }
    var passwordFields = findPasswordFields();
    for (var i = 0; i < passwordFields.length; i++) {
        if (passwordFields[i] != null && passwordFields[i].className.indexOf("shake-me") == -1) {
            passwordFields[i].className += " shake-me";
        }
    }
}

function insertpass(event) {
	if (event.name != "insertpass") return;
	fillUsername();
	fillPassword();
}

function fillUsername() {
	var usernameFields = findUsernameFields();
    for (var i = 0; i < usernameFields.length; i++) {
        usernameFields[i].value = "testing";
    }
}

function findUsernameFields() {
    var inputs = document.getElementsByTagName("input");
    var fields = new Array();
    for (var i = 0; i < usernameSubstrings.length; i++) {
        fields = fields.concat(findFieldsByTypesAndNameSubstring(inputs, usernameTypes, usernameSubstrings[i]));
    }
    return fields;
}

function findPasswordFields() {
    var inputs = document.getElementsByTagName("input");
    var fields = new Array();
    for (var i = 0; i < passwordSubstrings.length; i++) {
        fields = fields.concat(findFieldsByTypesAndNameSubstring(inputs, passwordTypes, passwordSubstrings[i]));
    }
    return fields;
}

function findFieldsByTypesAndNameSubstring(inputs, types, substring) {
    var fields = new Array();
    for (var i = 0; i < inputs.length; i++) {
        for (var j = 0; j < types.length; j++) {
            if (inputs[i].type == types[j] && inputs[i].name.toLowerCase().indexOf(substring) >= 0) {
                console.log("Field found with type " + types[j] + " and substring " + substring + " in name " + inputs[i].name + " and id " + inputs[i].id);
                fields.push(inputs[i]);
            }
        }
    }
    return fields;
}
