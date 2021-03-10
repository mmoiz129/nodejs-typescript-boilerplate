# Nodejs, Typescript and Mysql 
The goal is to implement an api for an application to manage working tasks. See the __[user stories](#user-stories)__ for the application details to be implemented.

Clone this repository and create a [git bundle](https://git-scm.com/docs/git-bundle) and send it to us when you finished the task. One of the most important topics we want to see, is how you commit your 
progress. This does not mean every commit has to be perfect.
git s
# To Run Application
* To run the application please perform following task 
    * Create database in mysql
    * Change username, password and database name in ormconfig.json
    * npm install to install all dependencies
    * **npm run migration** to run migrations
    * **npm run start** to run application 

# User stories
* As a user I can create tasks, so that all tasks for a project can be tracked.
  * Acceptance Criteria:
  * A task must have a title
  * A task must have a long description
  * A task must have the status "ToDo"
  * A task must have the user who created it
  * A task must have the date and time when it was created
* As a user I can change the status of a Task, so that the progress of the project can be tracked.
  * Acceptance Criteria:
  * A task must have the user who updated it
  * A task must have the date and time when it was updated
  * Only the following status transitions are allowed, see __[state transitions](#state-transitions)__
* As a user I can change the title and long description of a task.
* As a user I can assign a task to another user, so that the responsibility of a task can be visualized.
* As a user I will see the history of a Task, so that I can track the history of a task.
  * Acceptance Criteria:
  * The user of a change must be tracked
  * The date and time of a change must be tracked
  * The previous and the next value of a change must be tracked

## State transitions
```

[*] --> ToDo

ToDo -> InProgress
InProgress -up-> Blocked
InProgress -> InQA
InQA --> ToDo
InQA -> Done
Done -> Deployed
Blocked --> ToDo

Deployed --> [*]
```