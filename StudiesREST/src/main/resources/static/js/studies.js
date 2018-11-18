window.addEventListener('load', function(e) {
  init();
});


function init() {
  addTodaysDate();
  getAllTopicsForDropDown();
  document.addStudySession.addSessBtn.addEventListener('click', function(event) {
    event.preventDefault();
    let unformattedDate = document.addStudySession.date.value;
    let postDate = dateFromUSAToISO(unformattedDate)
    let dd = document.getElementById("topicDropDown");
    let postTopic = {
      id: dd.options[dd.selectedIndex].value,
      title: dd.options[dd.selectedIndex].textContent
    };
    let postLength = document.addStudySession.length.value;
    postStudySession(postDate, postTopic, postLength);
  });
  sessionsIndex();
}

function ping() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8383/api/ping');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status <= 200) {
      let data = xhr.responseText;
      let pingDiv = document.getElementById('pingResponse');
      pingDiv.textContent = data;
    }
  }
  xhr.send();
}

function sessionsIndex() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8383/api/studySessions');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status <= 200) {
      let rawData = xhr.responseText;
      let studySessions = JSON.parse(rawData);
      displayStudySessions(studySessions);
    }
  }
  xhr.send();
}

function displayStudySessions(studySessions) {
  let sessionsBody = document.getElementById('sessionsBody');
  let tableForEachFunc = function(studySession) {

    let trSession = document.createElement('tr');

    let tdSessionDate = document.createElement('td');
    let unformattedDate = studySession.studyDate;
    let formattedDate = dateFromISOToUSA(unformattedDate);
    tdSessionDate.textContent = formattedDate;
    trSession.appendChild(tdSessionDate);
    let tdSessionTopic = document.createElement('td');
    tdSessionTopic.textContent = studySession.topic.title;
    trSession.appendChild(tdSessionTopic);
    let tdSessionLength = document.createElement('td');
    tdSessionLength.textContent = studySession.length;
    trSession.appendChild(tdSessionLength);
    let tdSessionButtonCol = document.createElement('td');
    let tdSessionEdit = document.createElement('button');
    tdSessionEdit.textContent = 'Edit';
    tdSessionEdit.id = 'sessEdit';
    tdSessionEdit.classList.add('btn');
    tdSessionButtonCol.appendChild(tdSessionEdit);
    trSession.appendChild(tdSessionButtonCol);

    sessionsBody.appendChild(trSession);
  }
  studySessions.forEach(tableForEachFunc);
}

function setDateToToday() {
  let unformattedDate = new Date();
  document.addStudySession.date.value = unformattedDate;
}

function postStudySession(postDate, postTopic, postLength) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8383/api/studySessions', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status == 200 || xhr.status == 201) {
        let studySession = JSON.parse(xhr.responseText);
        let stdSessArr = [];
        stdSessArr.push(studySession);
        displayStudySessions(stdSessArr);
      } else {
        console.log("POST request failed.");
        console.error(xhr.status + ': ' + xhr.responseText);
      }
    }
  }
  let studySessionObject = {
    length: postLength,
    studyDate: postDate,
    topic: postTopic
  };
  let studySessionObjectJson = JSON.stringify(studySessionObject);
  xhr.send(studySessionObjectJson);
}

function getAllTopicsForDropDown() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8383/api/topics');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status <= 200) {
      let rawData = xhr.responseText;
      topicsArr = JSON.parse(rawData);
      populateTopicDropDown();
    }
  }
  xhr.send();
}

function populateTopicDropDown() {
  let topicDropDown = document.getElementById("topicDropDown");

  function topicsDropDownFunc(topic) {
    let optionId = topic.id;
    let optionTitle = topic.title;
    let topicElement = document.createElement("option");
    topicElement.value = optionId;
    topicElement.textContent = optionTitle;
    topicDropDown.appendChild(topicElement);
  }
  topicsArr.forEach(topicsDropDownFunc);
}

function dateFromISOToUSA(unformattedDate) {
  let year = unformattedDate.slice(0, 4);
  let month = unformattedDate.slice(5, 7);
  let day = unformattedDate.slice(8, 10);
  let formattedDate = month + '/' + day + '/' + year;
  return formattedDate;
}

function dateFromUSAToISO(unformattedDate) {
  let month = unformattedDate.slice(0, 2);
  let day = unformattedDate.slice(3, 5);
  let year = unformattedDate.slice(6, 10);
  let formattedDate = year + '-' + month + '-' + day;
  return formattedDate;
}

function addTodaysDate() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  if (day < 10) {
    day = '0' + dd;
  }
  if (month < 10) {
    month = '0' + month;
  }
  today = month + '/' + day + '/' + year;
  let date = document.getElementById("date");
  date.value = today;
}







// end.
