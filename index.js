import { DecisionTreeClassifier as DTClassifier } from '/node_modules/ml-cart/src/index.js';

import { DecisionTreeRegression as DTRegression } from '/node_modules/ml-cart/src/index.js';

//import { getPredictionItem } from "./resultTrain.js";

const xhr = new XMLHttpRequest();

var jsonData=[];

const itemarr =new Array(99);

const ppe =[];
const food =[];
const researchItem =[];
const UnsafeItem =[];
const flammableItem =[];

const combinedItems =[];
const checkedItems =[];
const uncheckedItems =[];

const trainData =[];
const testData =[];
const testDataObject =[];

var tempArray=[];
var result=[];
var resultArray=[];
var saveDataArray=[];

var container = document.getElementById('divCheckboxs');
xhr.open('GET', 'labjsondata.json');
xhr.onload = () => {
    if (xhr.status === 200) {
        jsonData = JSON.parse(xhr.responseText);
        var i=0;
        jsonData.forEach(item => {
        itemarr[i]=(item.Object);
        i=i+1;
        });
       
    } else {
        console.error('Failed to load JSON data');
    }
    for (var i=0;i<100;i++){
        if (i<20) {
          flammableItem.push(itemarr[i]);
        }
        else if (i>=20 && i<40) {
          food.push(itemarr[i]);
        }
        else if (i>=40 && i<60) {
          ppe.push(itemarr[i]);
        }
        else if (i>=60 && i<80) {
          researchItem.push(itemarr[i]);
        }
        else if (i>=80 && i<100) {
          UnsafeItem.push(itemarr[i]);
        }
    }

    shuffleArray(flammableItem);
    shuffleArray(food);
    shuffleArray(ppe);
    shuffleArray(researchItem);
    shuffleArray(UnsafeItem);
    // displayItems(flammableItem);
    // displayItems(ppe);
    // displayItems(food);
    // displayItems(researchItem);
    // displayItems(UnsafeItem);
    for (var i=0;i<4;i++){
        combinedItems.push(flammableItem[i]);
        combinedItems.push(food[i]);
        combinedItems.push(ppe[i]);
        combinedItems.push(researchItem[i]);
        combinedItems.push(UnsafeItem[i]);
    }

    for (var i=6;i<9;i++){
        testData.push(flammableItem[i]);
        testData.push(food[i]);
        testData.push(ppe[i]);
        testData.push(researchItem[i]);
        testData.push(UnsafeItem[i]);
    }
    shuffleArray(combinedItems);
    shuffleArray(testData);
    //displayItems(combinedItems);
    displayItems();
    
};

xhr.send();
//displayItems();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayItems() {
    for (var i=0;i<combinedItems.length;i++){
        //combinedItems.push(tempArray[i]);
        console.log(i);
        console.log(combinedItems[i]);
        const checkboxWrapperDiv = document.createElement("div");
        const checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("form-element");
        var checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.id = combinedItems[i];
        checkbox.name = 'equipments';
        checkbox.value = combinedItems[i];
        var imgName = "ImageIcon/"+combinedItems[i]+".jpg";
        var imgName1 = "'url(\"";
        var imgName3 = "\")'";
        const encodedUrl = encodeURIComponent(imgName);

        var label = document.createElement('label')

        label.htmlFor = combinedItems[i];
        label.appendChild(document.createTextNode(combinedItems[i]));
        label.style.backgroundImage = `url(${encodedUrl})`;

        label.style.backgroundSize = 'cover';

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        
        checkboxWrapperDiv.appendChild(checkboxDiv);
        
        checkboxWrapperDiv.appendChild(document.createElement("br"));
        //console.log(buttonClicked)
       // if (!buttonClicked) {
          container.appendChild(checkboxWrapperDiv);
       //}
        
    }
}

export function checkCheckbox() {  
  
 // console.log("firdstgg")
 // buttonClicked = true;
 var getFirstName = document.getElementById("fname");
 var getGrade = document.getElementById("select2");
 
    for (var i=0;i<combinedItems.length;i++){
        var temp = document.getElementById(combinedItems[i]);
      
        if (temp.checked == true ){  
          checkedItems.push(temp.value);
          console.log("checked values");
          console.log(temp.value);
        }  
        else {  
          uncheckedItems.push(temp.value);
          console.log("unchecked values");
          console.log(temp.value);
        }  
    }
    for (var i=0;i<uncheckedItems.length;i++){
      for (let j = 0; j < jsonData.length; j++) {
        const obj = jsonData[j];
        if (obj.Object === uncheckedItems[i]) {
          trainData.push(
            Object.assign({}, obj, { "label": 0 })
          );
        }
      }
      
        
    }
    for (var i=0;i<checkedItems.length;i++){
      for (let j = 0; j < jsonData.length; j++) {
        const obj = jsonData[j];
        if (obj.Object === checkedItems[i]) {
          trainData.push(
            Object.assign({}, obj, { "label": 1 })
          );
       
         } }
    }

    for (var i=0;i<testData.length;i++){
      for (let j = 0; j < jsonData.length; j++) {
        const obj = jsonData[j];
        if (obj.Object === testData[i]) {
          testDataObject.push(
            Object.assign({}, obj)
          );
       
         } }
    }

    console.log('trainData');
    console.log(trainData);
    const trainingSet = trainData.map(d => [d.Id, d.Flammable, d.Personal_protective_equipment,d.Food,d.Research_Instruments,d.Unsafe_Wearable_Things]);
    const predictions = trainData.map(d => d.label);
    const testingSet = testDataObject.map(d => [d.Id,d.Flammable, d.Personal_protective_equipment,d.Food,d.Research_Instruments,d.Unsafe_Wearable_Things]);
    console.log('testData');
    console.log(testingSet);

    const options = {
      gainFunction: 'gini',
      maxDepth: 10,
    };

    const classifier = new DTClassifier(options);
    classifier.train(trainingSet, predictions);
    result = classifier.predict(testingSet);

    console.log("results")
    console.log(result)

    for (var i=0;i<result.length;i++){
      if (result[i] == 0 ){  
        for (let j = 0; j < jsonData.length; j++) {
          const obj = jsonData[j];
          if (obj.Object === testData[i]) {
            resultArray.push(
              Object.assign({}, obj, { "label": 0 })
            );
         
           } }
      }  
      else {  
        for (let j = 0; j < jsonData.length; j++) {
          const obj = jsonData[j];
          if (obj.Object === testData[i]) {
            resultArray.push(
              Object.assign({}, obj, { "label": 1})
            );
         
           } }
      }  
      
    }
    console.log("resultArray");
    console.log(resultArray);

    var ajax = new XMLHttpRequest();
        ajax.open("POST", "create_json_file.php", true);
        ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        ajax.send(JSON.stringify(resultArray));
        ajax.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
          }
        };

        saveDataArray.push(getFirstName.value);
        saveDataArray.push(getGrade.value);
        getGrade
            for (let j = 0; j < trainData.length; j++) {
              const obj = trainData[j];
              saveDataArray.push(
                  Object.assign({}, obj, { "dataType": "Training Data" })
                );
             }
             
             for (let j = 0; j < resultArray.length; j++) {
              const obj = resultArray[j];
              saveDataArray.push(
                  Object.assign({}, obj, { "dataType": "Testing Data" })
                );
             }
      
        var ajax2 = new XMLHttpRequest();
        ajax2.open("POST", "save_data_file.php", true);
        ajax2.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        ajax2.send(JSON.stringify(saveDataArray));
        ajax2.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
          }
        };
    

    //const blob = new Blob([resultArray], { type: 'application/json' });
    //saveAs(blob, 'myData.json');

   // getPredictionItem(flammableItem);

   // setTimeout(function() {
      window.location.href = "resultTrain.html";

      // var diver = document.getElementById("acceptable");
      // diver.innerHTML = "Hello, world!";
     
   // }, 30000);

    
}

// export function getPredictionItem() {
//   buttonClicked = true;
//   console.log(result) 
// }

export function progress() {
  var progressBar = document.getElementById("progressBar");
        var progressBarContainer = document.getElementById("progressBarContainer");
        progressBar.style.width = "0%";
        progressBarContainer.style.display = "block";
        var percent = 0;
        var intervals = [20, 50, 70, 90, 100];
        var intervalIndex = 0;
        var intervalId = setInterval(function() {
          percent += 1;
          progressBar.style.width = percent + "%";
          document.getElementById("progressBarPercent").innerHTML = percent + "%";
          if (percent >= intervals[intervalIndex]) {
            intervalIndex++;
            if (intervalIndex >= intervals.length) {
              clearInterval(intervalId);
              checkCheckbox();
            }
          }
        }, 50); // 50 milliseconds interval for demo purposes
      }


