window.onload = function() {
    let button = document.getElementById('loadDataButton');
    button.onclick = function() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((json) => {
                let content = document.getElementById('content');
                let ol = document.createElement('ol');
                content.appendChild(ol);

                // load to TODOs, each into their own <li>
                let howMany = 5;
                for (let i = 0; i < howMany; i++) {
                    let li = document.createElement('li');
                    let text = document.createTextNode(`${json[i].title} - ${json[i].completed}`);
                    li.appendChild(text);
                    ol.appendChild(li);
                }
            });
    };
};