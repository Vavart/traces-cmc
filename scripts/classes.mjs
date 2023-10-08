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

export {User, Connection, Display, Posts, Activity}