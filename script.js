async function generateSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function generateSentence() {
    const name = document.getElementById("nameInput").value;
    const characters = '0123456789abcdef';
    const baseString = `My name is ${name} and sha256's top favorite character is `;

    for (let char of characters) {
        const sentence = baseString + char;
        const hashValue = await generateSHA256(sentence);
        if (hashValue.startsWith(char)) {
            document.getElementById("result").innerText = sentence;
            return;
        }
    }

    document.getElementById("result").innerText = "Couldn't find a matching sentence.";
}

