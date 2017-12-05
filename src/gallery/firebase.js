import { Gallery } from './gallery.js'

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
var galleryRef = database.ref('images/Gallery')

export var imageArray = []
galleryRef.on('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    imageArray.push(childSnapshot.val().url)
  })

  /* eslint-disable */
  const g2 = new Gallery(document.querySelector(".g2"),imageArray)
  /* eslint-enable */
})
