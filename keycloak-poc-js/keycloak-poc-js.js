
let keycloakInstance;

function initKeycloak() {
    keycloakInstance = new Keycloak();
    const options = {
        onLoad: 'login-required',
        checkLoginIframe: false
    };
    keycloakInstance.init(options).then(function (authenticated) {
        alert(authenticated ? 'Authentication successful!' : 'Not authenticated!');
    }).catch(function (err) {
        console.error('failed to initialize', err);
        alert('failed to initialize');
    });
}

function logout() {
    keycloakInstance.logout();
}

function printTokens() {
    document.getElementById("accessToken").innerHTML = keycloakInstance.token;
    document.getElementById("accessTokenParsed").innerHTML = JSON.stringify(keycloakInstance.tokenParsed, null, 2);

    document.getElementById("idToken").innerHTML = keycloakInstance.idToken;
    document.getElementById("idTokenParsed").innerHTML = JSON.stringify(keycloakInstance.idTokenParsed, null, 2);

    document.getElementById("refreshToken").innerHTML = keycloakInstance.refreshToken;
    document.getElementById("refreshTokenParsed").innerHTML = JSON.stringify(keycloakInstance.refreshTokenParsed, null, 2);
}

const test = async () => {
    console.log('test request using token: ', keycloakInstance.token);
    const response = await fetch('http://tgs-dev-166:8091/api/test', {
        method: 'GET',
        body: undefined,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + keycloakInstance.token
        }
    });
    const result = await response.json();
    document.getElementById("serverResponse").innerHTML = JSON.stringify(result, null, 2);
}