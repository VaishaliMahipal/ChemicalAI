var acceptContainer = document.getElementById('acceptable');
var notAcceptContainer = document.getElementById('non-acceptable');

const xhr = new XMLHttpRequest();
var jsonData=[];

var acceptedItems=[];
var notAcceptedItems=[];

var acceptedNames=[];
var notAcceptedNames=[];

xhr.open('GET', 'data.json');
xhr.onload = () => {
    if (xhr.status === 200) {
        jsonData = JSON.parse(xhr.responseText); 
    } else {
        console.error('Failed to load JSON data');
    }
    for (let j = 0; j < jsonData.length; j++) {
      const obj = jsonData[j];
      if (obj.label === 0) {
        notAcceptedItems.push(
          Object.assign({}, obj)
        );
      }
      else if (obj.label === 1) {
        acceptedItems.push(
          Object.assign({}, obj)
        );
      }
    }
    console.log("acceptedItems");
    console.log(acceptedItems);
    var i=0;
    acceptedItems.forEach(item => {
      acceptedNames[i]=(item.Object);
      i=i+1;
      });

      var k=0;
      notAcceptedItems.forEach(item => {
        notAcceptedNames[k]=(item.Object);
        k=k+1;
        });
        console.log("notAcceptedNames");
        console.log(notAcceptedNames);
        console.log("acceptedNames");
        console.log(acceptedNames);
        displayImages();

};

xhr.send();

function displayImages() {
  for (var i=0;i<acceptedNames.length;i++){
        const checkboxWrapperDiv = document.createElement("div");
        const checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("formTest-elementTest");
        var imgName = "ImageIcon/"+acceptedNames[i]+".jpg";
        const encodedUrl = encodeURIComponent(imgName);

        var label = document.createElement('label')

        label.htmlFor = acceptedNames[i];
        label.appendChild(document.createTextNode(acceptedNames[i]));
        label.style.backgroundImage = `url(${encodedUrl})`;

        label.style.backgroundSize = 'cover';
        checkboxDiv.appendChild(label);
        checkboxWrapperDiv.appendChild(checkboxDiv);
        checkboxWrapperDiv.appendChild(document.createElement("br"));
 
        acceptContainer.appendChild(checkboxWrapperDiv);
      
  }

  for (var i=0;i<notAcceptedNames.length;i++){
    const checkboxWrapperDiv = document.createElement("div");
    const checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("formTest-elementTest");
    var imgName = "ImageIcon/"+notAcceptedNames[i]+".jpg";
    const encodedUrl = encodeURIComponent(imgName);

    var label = document.createElement('label')

    label.htmlFor = notAcceptedNames[i];
    label.appendChild(document.createTextNode(notAcceptedNames[i]));
    label.style.backgroundImage = `url(${encodedUrl})`;

    label.style.backgroundSize = 'cover';
    checkboxDiv.appendChild(label);
    checkboxWrapperDiv.appendChild(checkboxDiv);
    checkboxWrapperDiv.appendChild(document.createElement("br"));

    notAcceptContainer.appendChild(checkboxWrapperDiv);
  
    
}
}

export function saveResponse() {
  var resultArray = [];

  var ele = document.getElementsByName('choice-radio');
          
        for(var i = 0; i < ele.length; i++) {
            if(ele[i].checked)
            resultArray.push(ele[i].value);
        }



  var ajax = new XMLHttpRequest();
  ajax.open("POST", "save_data_file.php", true);
  ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  ajax.send(JSON.stringify(resultArray));
  ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
}



