const { response } = require("express");

function fetchHistory() {
    // Adjust the 'text' and 'maxResults' to fetch more history items
    chrome.history.search({text: '', maxResults: 10}, function(data) {
        var historyList = document.getElementById('historyList');
        historyList.innerHTML = '';

        data.forEach(function(page) {
            var li = document.createElement('li');
            li.textContent = `${page.url}`;
            historyList.appendChild(li);
        });
    });
}

// Allow account creation TODO: make this more secure
document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // send to database via http request
    fetch('http://localhost:3000/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then(response => response.text())
    .then(data => alert('Account created successfully!'))
    .catch(error => this.console.error('Error: ', error));

    /*
    //stored locally
    chrome.storage.local.set({username: username, password: password}, function() {
        console.log('Account created for', username);
        alert('Account created successfully');
    });
    */
});

// Get history on popup load
document.addEventListener('DOMContentLoaded', fetchHistory);
