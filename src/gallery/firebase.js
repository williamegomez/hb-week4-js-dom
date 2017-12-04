var config = {
  apiKey: 'AIzaSyCofVBmEIKV9V2tBFwk_7YfOt4-Ydo9iIE',
  authDomain: 'hb-week4-js-dom.firebaseapp.com',
  databaseURL: 'https://hb-week4-js-dom.firebaseio.com',
  projectId: 'hb-week4-js-dom',
  storageBucket: 'hb-week4-js-dom.appspot.com',
  messagingSenderId: '108226223693'
}
/* global firebase */
firebase.initializeApp(config)
var database = firebase.database()
var storage = firebase.storage()
var storageRef = storage.ref()
var GalleryRef = database.ref('images/Gallery')

GalleryRef.on('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    storageRef.child('Gallery/' + childSnapshot.val().name).getDownloadURL().then((url) => {
      console.log('Finished')
    })
  })
})
