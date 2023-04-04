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
      const img = document.createElement('img');
      var imgName = "ImageIcon/"+acceptedNames[i]+".jpg";

      const encodedUrl = encodeURIComponent(imgName);

      img.src = encodedUrl;
   
      img.width = 150; 
      img.height = 150; 
      acceptContainer.appendChild(img);
      
  }

  for (var i=0;i<notAcceptedNames.length;i++){
    const img = document.createElement('img');
    var imgName = "ImageIcon/"+notAcceptedNames[i]+".jpg";

    const encodedUrl = encodeURIComponent(imgName);

    img.src = encodedUrl;
 
    img.width = 150; 
    img.height = 150; 
    notAcceptContainer.appendChild(img);
    
}
}



