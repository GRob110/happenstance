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

document.addEventListener('DOMContentLoaded', fetchHistory);
