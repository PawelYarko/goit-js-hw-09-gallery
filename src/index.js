import './sass/main.scss';

const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

  const refs = {
    galleryEl: document.querySelector('.gallery'),
    lightboxEl: document.querySelector('.lightbox'),
    btnCloseEl: document.querySelector('.lightbox__button'),
    lightboxImageEl: document.querySelector('.lightbox__image'),
    lightboxOverlayEl:document.querySelector('.lightbox__overlay'),
    
  };
  const listItemsGallery = createGallery(galleryItems);
  
  refs.galleryEl.innerHTML = listItemsGallery;
  
  function createGallery(imgs){
    return imgs.map((img , index)  => `
    <li class="gallery__item">
      <img
        class="gallery__image"
        data-index = "${index}"
        src="${img.preview}"
        data-source="${img.original}"
        alt="${img.description}"
      /> 
  </li>
    `).join('');
  }
  const galleryImages = document.querySelectorAll('.gallery__image');
  
  
  refs.galleryEl.addEventListener('click', onGalleryItemOpen);
  refs.btnCloseEl.addEventListener('click', onGalleryItemClose);
  refs.lightboxOverlayEl.addEventListener('click' , onOverlayClick);
  
  
  function onGalleryItemOpen(e){
    const currentTargetIndex = e.target.dataset.index;
    refs.lightboxEl.classList.add('is-open');
    refs.lightboxImageEl.setAttribute('index' , currentTargetIndex);  
    
  
   lightboxImageContent();
   
    window.addEventListener('keydown', onKeyEscPress);
    window.addEventListener('keydown' , onArrowLeftPress);
    window.addEventListener('keydown' , onArrowRightPress);
  }
  function lightboxImageContent(){
    let currentIndex = refs.lightboxImageEl.getAttribute('index');
  
    refs.lightboxImageEl.src = galleryItems[currentIndex].original;
    refs.lightboxImageEl.alt = galleryItems[currentIndex].description;
    
  }
  
  function onGalleryItemClose(e){
    refs.lightboxEl.classList.remove('is-open');
    refs.lightboxImageEl.src = '';
    window.removeEventListener('keydown', onKeyEscPress);
  }
  
  function onOverlayClick (e){
    if(e.target === e.currentTarget){
      onGalleryItemClose();
    }
  }
  
  function onKeyEscPress(e){
    const ESC_KEY_CODE = 'Escape';
    if(e.code === ESC_KEY_CODE){
      onGalleryItemClose();
    }
  }
  
  function onArrowLeftPress(e){
    if(e.code === 'ArrowLeft'){
      onArrowLeft();
    }
  }
  function onArrowRightPress(e){
    if(e.code === 'ArrowRight'){
      onArrowRight();
    }
  }
  
  
  function onArrowRight(){
    let currentIndex = refs.lightboxImageEl.getAttribute('index');
    if(currentIndex < galleryItems.length - 1){ 
      currentIndex = +currentIndex + 1;
    } 
    else{
      currentIndex = 0; 
    }
    console.log(currentIndex)
    refs.lightboxImageEl.src = galleryItems[currentIndex].original;
    refs.lightboxImageEl.alt = galleryItems[currentIndex].description;
    refs.lightboxImageEl.setAttribute('index' , currentIndex);
  }
  
  function onArrowLeft(){
    let currentIndex = refs.lightboxImageEl.getAttribute('index');
    if(currentIndex - 1 < 0){
      currentIndex = galleryItems.length - 1;
    } else {
      currentIndex -= 1;
     
    }
    console.log(currentIndex)
    refs.lightboxImageEl.src = galleryItems[currentIndex].original;
    refs.lightboxImageEl.alt = galleryItems[currentIndex].description;
    refs.lightboxImageEl.setAttribute('index' , currentIndex);
  }
  