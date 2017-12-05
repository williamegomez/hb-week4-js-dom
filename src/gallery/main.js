import { Gallery } from './gallery.js'

const imagesArray = ['https://www.uv.es/recursos/fatwirepub/ccurl/1004/586/big_data-1.png', 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Data-Science-vs.-Big-Data-vs.jpg', 'https://visualstudiomagazine.com/~/media/ECG/visualstudiomagazine/Images/introimages/BigData.jpg', 'http://blog.mirai-advisory.com/wp-content/uploads/2015/06/Fotolia_41498462_M1.jpg']

/* eslint-disable */
const g1 = new Gallery(document.querySelector(".g1"),imagesArray)
const g2 = new Gallery(document.querySelector(".g2"),imagesArray)
/* eslint-enable */
