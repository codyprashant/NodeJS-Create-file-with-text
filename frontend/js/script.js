var urlHistory = [];
var currentURL ='';
const spinner = document.getElementById("spinner");
async function getAllFiles() {
    currentURL = 'https://file-folder-create.herokuapp.com/getAllFiles';
    urlHistory.push(currentURL);
    spinner.removeAttribute('hidden');
    let response = await fetch(currentURL);
    let data = await response.text();
    let parsedData = JSON.parse(data).data;
    console.log(parsedData);
    displayFiles (parsedData);
}

async function getFiles(folderName) {

    if(urlHistory.length == 1 && urlHistory[0] == 'https://file-folder-create.herokuapp.com/getAllFiles'){
        currentURL = 'https://file-folder-create.herokuapp.com/getAllFiles?path='+folderName;
    } else{
        currentURL = `${urlHistory[urlHistory.length - 1]}/${folderName}`;
    }
    urlHistory.push(currentURL);
    spinner.removeAttribute('hidden');
    let response = await fetch(currentURL);
    let data = await response.text();
    let parsedData = JSON.parse(data).data;
    console.log(parsedData);
    displayFiles (parsedData, true);
}

async function returnBack() {
    urlHistory.pop();
    currentURL = urlHistory[urlHistory.length - 1];
    spinner.removeAttribute('hidden');
    let response = await fetch(currentURL);
    let data = await response.text();
    let parsedData = JSON.parse(data).data;
    console.log(parsedData);
    if(currentURL == 'https://file-folder-create.herokuapp.com/getAllFiles'){
        displayFiles (parsedData);
    } else{
        displayFiles (parsedData, true);
    }
}

async function createNewFolder() {
    let tempURL = currentURL.replace("getAllFiles", "createFolder");
    spinner.removeAttribute('hidden');
    let response1 = await fetch(tempURL);
    let response = await fetch(currentURL);
    let data = await response.text();
    let parsedData = JSON.parse(data).data;
    console.log(parsedData);
    if(currentURL == 'https://file-folder-create.herokuapp.com/getAllFiles'){
        displayFiles (parsedData);
    } else{
        displayFiles (parsedData, true);
    }
}

async function createNewFile() {
    let tempURL = currentURL.replace("getAllFiles", "createNewFile");
    spinner.removeAttribute('hidden');
    let response1 = await fetch(tempURL);
    let response = await fetch(currentURL);
    let data = await response.text();
    let parsedData = JSON.parse(data).data;
    console.log(parsedData);
    if(currentURL == 'https://file-folder-create.herokuapp.com/getAllFiles'){
        displayFiles (parsedData);
    } else{
        displayFiles (parsedData, true);
    }
}

function displayFiles (parsedData, insideFolder = false){
    document.getElementById('fileList').innerHTML = '';
    if(insideFolder){
        let list = document.createElement('a');
        list.setAttribute('class', 'list-group-item list-group-item-action active');
        list.href = `javascript:returnBack()`;
        list.innerHTML = '<img src="./images/back.png" class="img-thumbnail" height = 50 width = 40>&emsp; Return back';
        document.getElementById('fileList').append(list);
    }
    for (i in parsedData){
        if(parsedData[i].type == ''){
            let list = document.createElement('a');
            list.href = `javascript:getFiles('${parsedData[i].name}')`;
            list.setAttribute('class', 'list-group-item list-group-item-action');
            list.innerHTML = '<img src="./images/folder.png" class="img-thumbnail" height = 50 width = 40>&emsp;'+ parsedData[i].name;
            document.getElementById('fileList').append(list);
        }
    }
    for (i in parsedData){
        if(parsedData[i].type == '.pdf'){
            let list = document.createElement('a');
            list.href = '#';
            list.setAttribute('class', 'list-group-item list-group-item-action');
            list.innerHTML = '<img src="./images/pdf.png" class="img-thumbnail" height = 50 width = 40>&emsp;'+ parsedData[i].name;
            document.getElementById('fileList').append(list);
        }
        else if(parsedData[i].type == '.txt'){
            let list = document.createElement('a');
            list.href = '#';
            list.setAttribute('class', 'list-group-item list-group-item-action');
            list.innerHTML = '<img src="./images/txt.png" class="img-thumbnail" height = 50 width = 40>&emsp;'+ parsedData[i].name;
            document.getElementById('fileList').append(list);
        }
        else if(parsedData[i].type == '.docx'){
            let list = document.createElement('a');
            list.href = '#';
            list.setAttribute('class', 'list-group-item list-group-item-action');
            list.innerHTML = '<img src="./images/docx.png" class="img-thumbnail" height = 50 width = 40>&emsp;'+ parsedData[i].name;
            document.getElementById('fileList').append(list);
        }
        else if(parsedData[i].type == '.jpg' || parsedData[i].type == '.png' || parsedData[i].type == '.jpeg'){
            let list = document.createElement('a');
            list.href = '#';
            list.setAttribute('class', 'list-group-item list-group-item-action');
            list.innerHTML = '<img src="./images/image.png" class="img-thumbnail" height = 50 width = 40>&emsp;'+ parsedData[i].name;
            document.getElementById('fileList').append(list);
        }
    }
    spinner.setAttribute('hidden', '');
}

getAllFiles();

