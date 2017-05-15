console.log("ENV:", process.env);

module.exports = {

  URL       : process.env.URL,

  BRAPH_LOGIN_URL : (
    function(){
      switch(process.env.NODE_ENV){
        case "development":
          //return "http://api.braph.com/dev/v1";
          return "http://localhost:3000/auth/signin";
          break;
        case "qa":
          return "http://alpha.braph.com/auth/signin";
          break;
        case "production":
          return "http://braph.com/auth/signin";
          break;
      }
    }
  )(),

  API_URL   : (
    function(){
      switch(process.env.NODE_ENV){
        case "development":
          //return "http://api.braph.com/dev/v1";
          return "http://localhost:7002/dev/v1";
          break;
        case "qa":
          return "http://api.devniel.com/alpha/v1";
          break;
        case "production":
          return "http://api.devniel.com/v1";
          break;
      }
    }
  )(),

  TOQR_URL   : (
    function(){
      switch(process.env.NODE_ENV){
        case "development":
          return "http://localhost:7003/dev/v1";
          break;
        case "qa":
          return "http://api.braph.com/alpha/v1";
          break;
        case "production":
          return "http://toqr.braph.com/v1";
          break;
      }
    }
  )(),

  READY : 'APP:READY',

  ERROR : 'APP:ERROR'
  
};