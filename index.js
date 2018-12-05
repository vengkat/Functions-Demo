const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     var db = admin.firestore();      
//     var docRef = db.collection('CustomerProjects').doc('2');
//     console.log('Begin hitting the db');
//     db.collection('CustomerProjects').get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         console.log(doc.id, '=>', doc.data());
//       });
//       return true;
//     })
//     .catch((err) => {
//       console.log('Error getting documents', err);
//     });
//     console.log('Request complete');    
//     response.send("Document Added");
// });


exports.GetProjects = functions.https.onRequest((request, response) => {
  var data = [];
  var db = admin.firestore();    
  db.collection("CustomerProjects").get().then((snapshot) => {
    snapshot.forEach((item) => {
      data.push(item.data());
    });
    response.send(data);
    if(data.length > 0){
      return data;
    }
    else{
      throw new Error("No data returned");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);    
    response.send(data);
  });  
});

exports.GetProjectDetais = functions.https.onRequest((request, response) => {
  console.log("GetProjectList Called!");
  var status = request.query.projStatus;
  var func = request.query.projFunc;
  //console.log("request.query - "+request.query);
  console.log("status - "+status+" :: function - "+func);
  var db = admin.firestore();   
  var customerProjRef = db.collection("CustomerProjects");
  var data = [];
var query = customerProjRef;

  if(status){
    query = customerProjRef.where('Status', '==', status);
  }

  if(func){
    query = customerProjRef.where('Function','==',func);
  }

  query.get().then((snapshot) => {
    snapshot.forEach((item) => {
      data.push(item.data());
    });
    response.send(data);
    if(data.length > 0){
      return data;
    }
    else{
      throw new Error("No data returned");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);    
    response.send(data);
  }); 

exports.GetProjectList = functions.https.onRequest((request, response) => {
  console.log("GetProjectList Called!");
  var status = request.query.projStatus;
  var func = request.query.projFunc;
  //console.log("request.query - "+request.query);
  console.log("status - "+status+" :: function - "+func);
  var db = admin.firestore();   
  var customerProjRef = db.collection("CustomerProjects");
  var data = [];
var query = customerProjRef;

  if(status){
    query = customerProjRef.where('Status', '==', status);
  }

  if(func){
    query = customerProjRef.where('Function','==',func);
  }

  query.get().then((snapshot) => {
    snapshot.forEach((item) => {
      data.push(item.data());
    });
    response.send(data);
    if(data.length > 0){
      return data;
    }
    else{
      throw new Error("No data returned");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);    
    response.send(data);
  }); 

/*
  if(status){
    console.log("status - "+status);    
    customerProjRef.where('Status', '==', status).where('Function','==',func).get().then((snapshot) => {
      snapshot.forEach((item) => {
        data.push(item.data());
      });
      response.send(data);
      if(data.length > 0){
        return data;
      }
      else{
        throw new Error("No data returned");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);    
      response.send(data);
    });  
  }
  else{
    console.log("status is undefined");
  }
  */
/*
  if(func){
    console.log("function - "+func);
  }
  else{
    console.log("function is undefined");
  }
  
  */ 
  
});

exports.GetProjectDetails = functions.https.onRequest((request, response) => {
  console.log("GetProjectDetails Called!");
  var ProjectName = request.query.projName;
  var status = request.query.projStatus;
  var func = request.query.projFunc;
  //console.log("request.query - "+request.query);
  console.log("ProjectName - " + ProjectName + " :: status - " + status+" :: function - "+func);
  var db = admin.firestore();   
  var customerProjRef = db.collection("CustomerProjects");
  var data = [];
var query = customerProjRef;

  if(ProjectName){
    query = customerProjRef.where('ProjectName', '==', ProjectName);
  }

  if(status){
    query = customerProjRef.where('Status', '==', status);
  }

  if(func){
    query = customerProjRef.where('Function','==',func);
  }
  console.log("query - " + query);
  query.get().then((snapshot) => {
    snapshot.forEach((item) => {
      data.push(item.data());
    });
    response.send(data);
    if(data.length > 0){
      return data;
    }
    else{
      throw new Error("No data returned");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);    
    response.send(data);
  }); 
});

exports.CheckRequestParams = functions.https.onRequest((request, response) => {
  //var status = request.query.projStatus;
  //var func = request.query.projStatus;projFunc
  //console.log("request.query - "+request.query);
  //console.log("status - "+status+" :: function - "+func);
  response.send(request.body.result.parameters);
});
//  function ProcessData(snapshot){
//    var 
//   snapshot.forEach((item) => {
//     data.push(item.data());
//   });
//   return data;
//  }
// exports.GetProjects = collection.get().then(snapshot => {
//     snapshot.forEach(doc => {
//     });      
//   }).catch(error => {
//         console.log('error', error);
//   });

// var setAda = docRef.set({
//     Function: 'SupplyChain',
//     ProjectId: 3,
//     ProjectName: 'DeviceTracker',
//     Status:'Green',
//     StatusReason:''
//   });