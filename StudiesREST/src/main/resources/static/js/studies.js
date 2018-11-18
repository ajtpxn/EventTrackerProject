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
    tdSessionLength.textContent = studySession.length + ' min';
    trSession.appendChild(tdSessionLength);
    let tdSessionButtonCol = document.createElement('td');
    let sessionDetailsLink = document.createElement('a');
    sessionDetailsLink.href = '*';
    sessionDetailsLink.textContent = 'Details';
    sessionDetailsLink.classList.add('detailsLink');
    sessionDetailsLink.addEventListener('click', function x(e) {
      e.preventDefault();
      let thisSession = sessionDetailsLink.parentNode.parentNode;
      let sessIndex = thisSession.rowIndex;
      let editRow = sessionsBody.insertRow(sessIndex);
      let updateDateCol = editRow.insertCell(0);
      let updateSessionForm = document.createElement('form');
      let updateDateInput = document.createElement('input');
      updateDateInput.type = 'text';
      let formattedDate = dateFromISOToUSA(studySession.studyDate)
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
      updateSessionLink.addEventListener('click', function(e) {
        event.preventDefault();
        updateStudySession(studySession.id, updateDateInput.value, updateTopicInput.value, updateLengthInput.value, sessIndex);
      });
      updateCol.appendChild(updateSessionLink);
      let notesAndDeleteRow = sessionsBody.insertRow(sessIndex + 1);
      let notesCol = notesAndDeleteRow.insertCell(0);
      notesCol.textContent = 'Notes: This was a very special study session. Rating: Excellent';
      notesCol.colSpan = '3';
      let deleteCol = notesAndDeleteRow.insertCell(1);
      let deleteSessionLink = document.createElement('a');
      deleteSessionLink.href = '*';
      deleteSessionLink.textContent = 'Delete';
      deleteSessionLink.classList.add('text-danger');
      deleteSessionLink.addEventListener('click', function(e) {
        // get session id and submit to api for deletion
      });
      deleteCol.appendChild(deleteSessionLink);
      sessionDetailsLink.removeEventListener('click', x);
      sessionDetailsLink.addEventListener('click', function y(e) {
    	  e.preventDefault();
    	  console.log('No Action.');
        sessionDetailsLink.parentNode.parentNode.id = 'openDetails';
        closeDetails();
        sessionDetailsLink.parentNode.parentNode.id = 'closedDetails';
      });
    });
    tdSessionButtonCol.appendChild(sessionDetailsLink);
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
        console.log('Updated');
        console.log(studySession);
        let sessionsBody = document.getElementById('sessionsBody');
        let editElement = sessionsBody.children[sessIndex-1];
        let formattedDate = dateFromISOToUSA(studySession.studyDate);
        editElement.children[0].textContent = formattedDate;
        editElement.children[1].textContent = studySession.topic.title;
        editElement.children[2].textContent = studySession.length;
        let removeEditor = sessionsBody.children[sessIndex];
        console.log('Delete this row: ' + sessIndex);
        console.log(removeEditor);
        let removeDeleteRow = sessionsBody.children[sessIndex+1]
        console.log('And this one: ' + (sessIndex+1));
        console.log(removeDeleteRow);
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

function closeDetails() {
  let sessionsBody = document.getElementById('sessionsBody');
  let openSession = document.getElementById('openDetails');
  let editor = openSession.nextElementSibling;
  let notesAndDelete = openSession.nextElementSibling.nextElementSibling;
  sessionsBody.removeChild(editor);
  sessionsBody.removeChild(notesAndDelete);
}

function deleteSession(sessionId) {

}








// end.
