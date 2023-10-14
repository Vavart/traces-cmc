// File : classes.mjs
// Author: Clara D. & Maxime S.
// Description: Classes to create the objects used in the mapping and evaluation scripts

class User{
    constructor(name){
      this.name = name
      this.connections = []
      this.displays = []
      this.posts = []
      this.activities = []
    }
  }
  
  class Connection{
    constructor(date, time, delay, comment){
      this.date = date
      this.heure = time
      this.delai = delay
      this.comment = comment
    }
  }
  
  class Display{
    constructor(type, idForum, date, time, delay, comment){
      this.type = type
      this.idForum = idForum
      this.date = date
      this.heure = time
      this.delai = delay
      this.comment = comment
    }
  }
  
  class Posts{
    constructor(type, idForum, date, time, delay, comment){
      this.type = type
      this.idForum = idForum
      this.date = date
      this.heure = time
      this.delai = delay
      this.comment = comment
    }
  }
  
  class Activity { 
    constructor(type, date, time){
      this.type = type
      this.date = date
      this.heure = time
    }
  }

  class UserStats {
    constructor(name) {
      this.name = name;
      this.connections = 0;
      this.displays = 0;
      this.posts = 0;
      this.activities = 0;
      this.score = 0;
      this.connectionsScore = 0;
      this.displaysScore = 0;
      this.postsScore = 0;
      this.activitiesScore = 0;
      this.score = 0;
      this.normalizedscore = 0;
    }
  }
  
  class Measures {
    constructor() {
      this.maxconnections = 0;
      this.minconnections = 0;
      this.maxdisplays = 0;
      this.mindisplays = 0;
      this.maxposts = 0;
      this.minposts = 0;
      this.maxactivities = 0;
      this.minactivities = 0;
    }
  }

class Indicator {
  constructor(date, dataArr) {
    this.date = date;
    this.data = dataArr;
  }
}

export {User, Connection, Display, Posts, Activity, UserStats, Measures, Indicator}