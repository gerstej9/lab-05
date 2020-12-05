'use strict';

const animals1 = [];
const animals2 = [];
const keywordArray = [];
let page = 'Page 1';



function Animal(jsonObject, pageNum) {
  this.image_url = jsonObject.image_url;
  this.title = jsonObject.title;
  this.description = jsonObject.description;
  this.keyword = jsonObject.keyword;
  this.horns = jsonObject.horns;
  this.page = pageNum;
}


$.ajax({
  url: './data/page-2.json',
  async: true
}).then(parse => {

  parse.forEach(animalJSONObject => animals2.push(new Animal(animalJSONObject, 'page2')));
  animals2.sort(sortImageByHorn);
  animals2.forEach(animal => animal.render());
  $('.page2').hide();
  playSound();
  showModal();
});

$.ajax({
  url: './data/page-1.json',
  async: true
}).then(parse => {

  parse.forEach(animalJSONObject => animals1.push(new Animal(animalJSONObject, 'page1')));
  // initialSort();
  animals1.sort(sortImageByHorn);
  animals1.forEach(animal => animal.render());
  playSound();
  showModal();
});


Animal.prototype.render = function () {
  const template = $('#photo-template').html();
  const animalHtml = Mustache.render(template, this);
  $('ul').append(animalHtml);
  const $newAnimalOption = $('#templateSelector').find('option').clone();
  if (keywordArray.includes(this.keyword) !== true) {
    keywordArray.push(this.keyword);
    $newAnimalOption.attr('value', this.keyword);
    $newAnimalOption.text(this.keyword);
    $('#keyword').append($newAnimalOption);
  }
};

Animal.prototype.renderModal = function () {
  const template = $('#modal-template').html();
  const modalHtml = Mustache.render(template, this);
  $('.mustache-modal').append(modalHtml);
  };

$('#photo-template').hide();



const showImages = (event) => {
  $('ul').empty();
  if (event.target.textContent === 'Page 1') {
    page = "Page 1";
    animals1.forEach(animal => animal.render());
  } else {
    page = "Page 2";
    animals2.forEach(animal => animal.render());
  }
  playSound();
  showModal();
  return page;
};

function sortImageByHorn(leftVal, rightVal) {
  if (leftVal.horns > rightVal.horns) {
    return -1;
  } else if (leftVal.horns < rightVal.horns) {
    return 1;
  } else {
    return 0;
  }
}

function sortImageByTitle(leftVal, rightVal) {
  if(leftVal.title.toLowerCase() > rightVal.title.toLowerCase()){
    return 1;
  }else if (leftVal.title.toLowerCase()< rightVal.title.toLowerCase()){
    return -1;
  }else{
    return 0;
  }
}

function playSound(){
  $('li').on('click', () => {
    const sound = new Audio();
    sound.volume = 0.1;
    sound.src = "./sound/cat.wav"
    sound.oncanplaythrough = function(){
      sound.play();
    }
  });
}



const selectImages = (event) => {
  if(event.target.value !== 'default'){
    $('li').hide();
    $(`li[value^='${event.target.value}']`).show();
  }
  $('img').on('click', event => {
    $('.modal').css('display', 'block');
  });
};


function showModal(){
  $('img').on('click', event => {
    $('.modal').css('display', 'block');
    if(page === 'Page 1'){
      animals1.forEach(animal =>{
        if(event.target.alt === animal.title){
          animal.renderModal();
        }
      });
    }else{
      animals2.forEach(animal =>{
        if(event.target.alt === animal.title){
          animal.renderModal();
        }
      });
    }
  });
  $('span').on('click', () =>{
    $('.modal').css('display', 'none');
    $('.mustache-modal').empty()
  });
  $('span').on('click', () =>{
    $('.modal').css('display', 'none');
    $('.mustache-modal').empty()
  });
    $('span').on('click', () =>{
    $('.modal').css('display', 'none');
    $('.mustache-modal').empty()
  });
}

  

$('#keyword').on('change', selectImages);
$('nav').on('click', showImages);
$('#horns, #title').on('click', event => {
  if(event.target.textContent === ('Sort by Number of Horns')){
    animals1.sort(sortImageByHorn);
    animals2.sort(sortImageByHorn);
  }else{
    animals1.sort(sortImageByTitle);
    animals2.sort(sortImageByTitle);
  }
  $('ul').empty();
  if(page === 'Page 1') animals1.forEach(animal => animal.render());
  if(page === 'Page 2') animals2.forEach(animal => animal.render());
  playSound();
  showModal();
});


