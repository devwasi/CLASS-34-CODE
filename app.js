 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
 import { getDatabase, ref , set, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
 import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
 
 // ***** paste your firebase config here *****

 // Initialize Firebase
 var app = initializeApp(firebaseConfig);
 var DATABASE = getDatabase(app);
 var STORAGE = getStorage(app);


var productTitle = document.getElementById("productTitle")
var productDescription = document.getElementById("productDescription")
var productPrice = document.getElementById("productPrice")
var productImage = document.getElementById("productImage")
var previewImg = document.getElementById("previewImg")


window.submitData  = function(){
    var obj = {
        title: productTitle.value,
        description: productDescription.value,
        price: productPrice.value
    }

    var keyRef = ref(DATABASE);
    var key = push(keyRef).key;
    obj.id = key

    var imageRef = storageRef(STORAGE, `images/${obj.id}.jpg`)

    uploadBytes(imageRef, productImage.files[0]).then(function(success){

        getDownloadURL(success.ref).then(function(imageURL){

            // console.log("image ur =>", imageURL);
            obj.productImg = imageURL
            
            var refrenceDB = ref(DATABASE, `products/${obj.id}/`)
            set(refrenceDB,obj)



        }).catch(function(error){
            console.log(error);
        })
    }).catch(function(error){
        console.log(error);
    })
}

window.showImg = function(a){
// console.log(a.target.files[0]);

var localImgURL = URL.createObjectURL(a.target.files[0]);

previewImg.src = localImgURL
}