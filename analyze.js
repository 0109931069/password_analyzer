function analyzePassword() {
    let password = document.getElementById('passwordInput').value;
    let strength = getPasswordStrength(password);

    let customAlert = document.createElement('div');
    customAlert.id = 'customAlert';
    customAlert.style.position = 'fixed';
    customAlert.style.top = '50%';
    customAlert.style.left = '50%';
    customAlert.style.transform = 'translate(-50%, -50%)';
    customAlert.style.backgroundColor = '#fff';
    customAlert.style.padding = '20px';
    customAlert.style.border = '2px solid rgba(255, 255, 255, .5)';
    customAlert.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    customAlert.style.zIndex = '1000';
    customAlert.style.borderRadius = '10px';

    let result = document.createElement('h2');
    let suggestions = document.createElement('ul');

    if (strength.score < 3) {
        result.textContent = 'Password strength: Weak';
        strength.suggestions.forEach(suggestion => {
            let item = document.createElement('li');
            item.style.textAlign = 'left';
            item.textContent = suggestion;
            suggestions.appendChild(item);
        });
    } else if (strength.score < 4) {
        result.textContent = 'Password strength: Moderate';
        strength.suggestions.forEach(suggestion => {
            let item = document.createElement('li');
            item.style.textAlign = 'left';
            item.textContent = suggestion;
            suggestions.appendChild(item);
        });
    } else {
        result.textContent = 'Password strength: Strong';
        let congrats = document.createElement('li');
        congrats.textContent = 'Congratulations!';
        suggestions.appendChild(congrats);
    }

    customAlert.appendChild(result);
    customAlert.appendChild(suggestions);

    let closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = closeCustomAlert;
    customAlert.appendChild(closeButton);

    document.body.appendChild(customAlert);
}

function closeCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    if (customAlert) {
        customAlert.remove();
    }
}


function getPasswordStrength(password) {
    let score = 0;
    let suggestions = [];

    // Check for minimum length
    if (password.length >= 8) {
        score++;
    } else {
        suggestions.push('Use at least 8 characters');
    }

    // Check for a mix of uppercase and lowercase letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        score++;
    } else {
        suggestions.push('Include both uppercase and lowercase letters');
    }

    // Check for the presence of numbers
    if (/\d/.test(password)) {
        score++;
    } else {
        suggestions.push('Include at least one number');
    }

    // Check for the presence of special characters
    if (/[!@#$%^&*]/.test(password)) {
        score++;
    } else {
        suggestions.push('Include at least one special character (!, @, #, etc.)');
    }

    // Additional checks:
    // - Avoid common dictionary words
    let commonWords = ['password', '123456', 'qwerty', 'letmein']; // Example list of common words
    if (!commonWords.some(word => password.toLowerCase().includes(word))) {
        score++;
    } else {
        suggestions.push('Avoid common dictionary words');
    }

    // - Avoid using personal information
    let username = 'john.doe';
    if (!password.toLowerCase().includes(username.toLowerCase())) {
        score++;
    } else {
        suggestions.push('Avoid using personal information (e.g., name, username)');
    }

    // - Ensure the password is not a common pattern
    if (!/(123|321|111|222|password|qwerty)/.test(password.toLowerCase())) {
        score++;
    } else {
        suggestions.push('Ensure the password is not a common pattern');
    }

    return { score, suggestions };
}