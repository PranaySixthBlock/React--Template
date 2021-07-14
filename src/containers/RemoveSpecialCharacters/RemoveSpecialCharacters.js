
function RemoveUnwantedCharacters(arrayObject) {
    if(Array.isArray(arrayObject)){
        for (let object in arrayObject) {
            if (arrayObject.hasOwnProperty(object)) {
              //console.log(object + ": " + arrayObject[object]);
              //console.log(Object.keys(arrayObject[object]))
              let childObjectKeysArray = Object.keys(arrayObject[object])
              for (let key in childObjectKeysArray) {
                if(childObjectKeysArray[key] !== "link" && childObjectKeysArray[key] !== "image" && childObjectKeysArray[key] !== "_id" ){
                    if(childObjectKeysArray[key] === "name"){
                        let data = arrayObject[object].name;
                        data=data.replace(/[<>`]/g,' ');
                        data=data.replace(/[&]/g,'and');
                        data=data.replace(" .", ".");
                        arrayObject[object].name=data;
                    }else if(childObjectKeysArray[key] === "description"){
                        let data = arrayObject[object].description;
                        data=data.replace(/[<>`]/g,' ');
                        data=data.replace(/[&]/g,'and');
                        data=data.replace(" .", ".");
                        arrayObject[object].description=data;
                    }else if(childObjectKeysArray[key] === "answer"){
                        let data = arrayObject[object].answer;
                        data=data.replace(/[<>`]/g,' ');
                        data=data.replace(/[&]/g,'and');
                        data=data.replace(" .", ".");
                        arrayObject[object].answer=data;
                    }else if(childObjectKeysArray[key] === "question"){
                        let data = arrayObject[object].question;
                        data=data.replace(/[<>`]/g,' ');
                        data=data.replace(/[&]/g,'and');
                        data=data.replace(" .", ".");
                        arrayObject[object].question=data;
                    }else{
                      //console.log("does not match to key")
                    }
                }
              }
            }
          }
    }else{
        let data = arrayObject;
        if(data){
          data=data.replace(/[<>`]/g,' ');
          data=data.replace(/[&]/g,'and');
          data=data.replace(" .", ".");
        }
        arrayObject=data;
    }
    
      return arrayObject;

}

export default RemoveUnwantedCharacters;
