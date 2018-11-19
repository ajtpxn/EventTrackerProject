window.addEventListener('load', function(e) {
  init();
});

let topicsArr = [];

function getAllTopicsForDropDown() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8383/api/topics');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status <= 200) {
      let rawData = xhr.responseText;
      topicsArr = JSON.parse(rawData);
      populateTopicDropDown(topicsArr);
    }
  }
  xhr.send();
}

function init() {
  getAllTopicsForDropDown();
  populateDateOnAddForm();
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

  var tableForEachFunc = function(studySession) {
    // defines the function to put
    // each study session on the page
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
    tdSessionLength.textContent = studySession.length + ' min';
    trSession.appendChild(tdSessionLength);
    let tdSessionButtonCol = document.createElement('td');
    let sessionDetailsLink = document.createElement('a');
    sessionDetailsLink.href = '*';
    sessionDetailsLink.textContent = 'Details';
    sessionDetailsLink.classList.add('detailsLink');

    var detailsListener = function(e) {
      e.preventDefault();
      var sessionsBody = document.getElementById('sessionsBody');
      let thisRow = sessionDetailsLink.parentNode.parentNode;
      let sessIndex = thisRow.rowIndex;
      var editRow = sessionsBody.insertRow(sessIndex);
      let updateDateCol = editRow.insertCell(0);
      let updateSessionForm = document.createElement('form');
      let updateDateInput = document.createElement('input');
      updateDateInput.type = 'text';
      formattedDate = dateFromISOToUSA(studySession.studyDate);
      updateDateInput.value = formattedDate;
      updateDateCol.appendChild(updateDateInput);
      let updateTopicCol = editRow.insertCell(1);
      let updateTopicInput = document.createElement('input');
      updateTopicInput.type = 'text';
      updateTopicInput.value = studySession.topic.title;
      updateTopicCol.appendChild(updateTopicInput);
      let updateLengthCol = editRow.insertCell(2);
      let updateLengthInput = document.createElement('input');
      updateLengthInput.type = 'text';
      updateLengthInput.value = studySession.length;
      updateLengthCol.appendChild(updateLengthInput);
      let updateCol = editRow.insertCell(3);
      let updateSessionLink = document.createElement('a');
      updateSessionLink.href = '*';
      updateSessionLink.textContent = 'Update';
      updateSessionLink.classList.add('text-success');
      var updateSessionFunction = function(e) {
        event.preventDefault();
        updateStudySession(studySession.id, updateDateInput.value, updateTopicInput.value, updateLengthInput.value, sessIndex);
      }
      updateSessionLink.addEventListener('click', updateSessionFunction);
      updateCol.appendChild(updateSessionLink);
      var notesAndDeleteRow = sessionsBody.insertRow(sessIndex + 1);
      let notesCol = notesAndDeleteRow.insertCell(0);
      notesCol.textContent = 'Notes: This was a very special study session. Rating: Excellent';
      notesCol.colSpan = '3';
      let deleteCol = notesAndDeleteRow.insertCell(1);
      let deleteSessionLink = document.createElement('a');
      deleteSessionLink.href = '*';
      deleteSessionLink.textContent = 'Delete';
      deleteSessionLink.classList.add('text-danger');
      var deleteFunc = function(e) {
        deleteSession(sessionId);
      }
      deleteSessionLink.addEventListener('click', deleteFunc);
      deleteCol.appendChild(deleteSessionLink);
      var closeDetailsListener = function(e) {
        e.preventDefault();
        sessionsBody.removeChild(editRow);
        sessionsBody.removeChild(notesAndDeleteRow);
        sessionDetailsLink.removeEventListener('click', closeDetailsListener);
        sessionDetailsLink.addEventListener('click', detailsListener);
      }
      sessionDetailsLink.removeEventListener('click', detailsListener);
      sessionDetailsLink.addEventListener('click', closeDetailsListener);
    }
    sessionDetailsLink.addEventListener('click', detailsListener);
    tdSessionButtonCol.appendChild(sessionDetailsLink);
    trSession.appendChild(tdSessionButtonCol);
    sessionsBody.appendChild(trSession);
  }

  studySessions.forEach(tableForEachFunc); //populates all study sessions to page
}

function setDateToToday() {
  let todaysDate = new Date();
  document.addStudySession.date.value = todaysDate;
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

function populateTopicDropDown(topics) {
  let topicDropDown = document.getElementById("topicDropDown");

  function topicsDropDownFunc(topic) {
    let optionId = topic.id;
    let optionTitle = topic.title;
    let topicElement = document.createElement("option");
    topicElement.value = optionId;
    topicElement.textContent = optionTitle;
    topicDropDown.appendChild(topicElement);
  }
  topics.forEach(topicsDropDownFunc);
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

function populateDateOnAddForm() {
  let today = getTodaysDate();
  let date = document.getElementById("date");
  date.value = today;
}

function getTodaysDate() {
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
  return today;
}

function getTopicId(topicTitle) {
  let topicId = 0;
  let topicFunc = function(topic) {
    if (topicTitle === topic.title) {
      topicId = topic.id;
    }
  }
  topicsArr.forEach(topicFunc);
  return topicId;
}

function updateStudySession(putId, putDate, putTopic, putLength, sessIndex) {
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', 'http://localhost:8383/api/studySessions/' + putId, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status == 200 || xhr.status == 201) {
        let studySession = JSON.parse(xhr.responseText);
        let sessionsBody = document.getElementById('sessionsBody');
        let editElement = sessionsBody.children[sessIndex - 1];
        let formattedDate = dateFromISOToUSA(studySession.studyDate);
        editElement.children[0].textContent = formattedDate;
        editElement.children[1].textContent = studySession.topic.title;
        editElement.children[2].textContent = studySession.length + ' min';
        let editor = sessionsBody.children[sessIndex];
        let notesAndDelete = sessionsBody.children[sessIndex + 1]
        sessionsBody.removeChild(editor);
        sessionsBody.removeChild(notesAndDelete);
      } else {
        console.log("PUT request failed.");
        console.error(xhr.status + ': ' + xhr.responseText);
      }
    }
  }
  let formattedDate = dateFromUSAToISO(putDate);
  let putTopicObject = {
    id: getTopicId(putTopic),
    title: putTopic
  }
  let studySessionObject = {
    length: putLength,
    studyDate: formattedDate,
    topic: putTopicObject
  };
  let studySessionObjectJson = JSON.stringify(studySessionObject);
  xhr.send(studySessionObjectJson);
}



function deleteSession(sessionId) {

    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:8383/api/studySessions/' + sessionId);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status <= 200) {
        let rawData = xhr.responseText;
        let studySessions = JSON.parse(rawData);
        displayStudySessions(studySessions);
      }
    }
    xhr.send();

}








// end.
