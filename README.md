# REST Study Session Tracker  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![homework](homework_small.jpg) #

## Skill Distillery Project - November 2018 ##

### What does this software do? ###

This software is for tracking the time you spent studying. Right now it is just an api with no front end, but eventually you will be able to record all of your study sessions, view, and edit them on a webpage.


### Technologies Used ###

* Java
* Gradle
* STS
* REST
* Spring JPA
* Git
* GitHub


### Study Session Functions ###


| Type        | Format          | Response  |
| ------------- |:-------------:| -----|
| GET      | http://localhost:8383/api/ping | "pong" |
| GET      | http://localhost:8383/api/studySessions | Returns all study sessions in JSON format. |
| GET      | http://localhost:8383/api/studySessions/{id} | Returns one study session with the ID given in JSON format.  |
| POST      | http://localhost:8383/api/studySessions | Adds a study session. Receives a study session in JSON format and adds it to the list. See "Formatting" below for proper formatting of the JSON. |
| PUT      | http://localhost:8383/api/studySessions/{id} | Updates the specified study session. See "Formatting" below for proper formatting of the JSON. |
| DELETE      | http://localhost:8383/api/studySessions/{id} | Deletes the specified study session. |

### Formatting Study Session JSON ###

Example JSON for POST and PUT:

```
 {
    "length": 10,
    "studyDate": "2018-11-06",
    "topic": {
        "id": 5,
        "title": "Philosophy"
    }
 }
 ```


### Topic Functions ###


| Type     |                            Format                     | Response                                 |
| -------- |:-----------------------------------------------------:| -----------------------------------------|
| GET      | http://localhost:8383/api/topics                      | Returns all study topics in JSON format. |
| GET      | http://localhost:8383/api/topics/{topicTitle}         | Returns study sessions by topic title in JSON format.   |
| GET      | http://localhost:8383/api/topics/{topicTitle}/minutes | Returns the minutes spent studying a topic.   |
| POST     | http://localhost:8383/api/topics                      | Add a topic. Receives a topic in JSON format and adds it to the list. See "Formatting" below for proper formatting of the JSON.                            |
| PUT      | http://localhost:8383/api/topics/{id}                 | Updates the specified topic. Receives an ID in the URL and a topic in JSON format and updates the topic with that ID it to the list. See "Formatting" below for proper formatting of the JSON.                          |
| DELETE   | http://localhost:8383/api/topics/{id}                 | Delete a topic.                          |

### Formatting Topic JSON ###

Example JSON for PUT:

```
{
    "title": "Physics2"
}
  ```

 ### Notes ###

 * Everything went much faster than I expected.
 * It took me longer to get the JUnit tests working than to write the software.









 Thanks,





              ____                      _             
             |  _ \                    | |            
             | |_) |_ __ __ _ _ __   __| | ___  _ __  
             |  _ <| '__/ _` | '_ \ / _` |/ _ \| '_ \
             | |_) | | | (_| | | | | (_| | (_) | | | |
             |____/|_|  \__,_|_| |_|\__,_|\___/|_| |_|
