'use strict';

const animals1 = [];
const animals2 = [];
const keywordArray = [];
let page = 'Page 1';
let pageOn = 1;


function Animal(jsonObject, pageNum) {
  this.image_url = jsonObject.image_url;
  this.title = jsonObject.title;
  this.description = jsonObject.description;
  this.keyword = jsonObject.keyword;
  this.horns = jsonObject.horns;
  this.page = pageNum;
}

/* Animal.prototype.render = function () {
  const $newAnimalLi = $('#photo-template').find('li').clone();
  $newAnimalLi.attr('class', this.keyword);
  $newAnimalLi.find('h2').text(this.title);
  $newAnimalLi.find('img').attr('src', this.image_url);
  $newAnimalLi.find('p').text(this.description);
  $('ul').append($newAnimalLi);

  const $newAnimalOption = $('#templateSelector').find('option').clone();
  if (keywordArray.includes(this.keyword) !== true) {
    keywordArray.push(this.keyword);
    $newAnimalOption.attr('value', this.keyword);
    $newAnimalOption.text(this.keyword);
    $('select').append($newAnimalOption);
  }
}; */
// const initialSort = () =>{
//   animals.sort((leftVal, rightVal) => {
//     if(leftVal.horns > rightVal.horns){
//       return -1;
//     }else if (leftVal.horns< rightVal.horns){
//       return 1;
//     }else{
//       return 0;
//     }
//   });
// };

$.ajax({
  url: './data/page-2.json',
  async: true
}).then(parse => {

  parse.forEach(animalJSONObject => animals2.push(new Animal(animalJSONObject, 'page2')));
  animals2.sort(sortImageByHorn);
  animals2.forEach(animal => animal.render());
  $('.page2').hide();
});

$.ajax({
  url: './data/page-1.json',
  async: true
}).then(parse => {

  parse.forEach(animalJSONObject => animals1.push(new Animal(animalJSONObject, 'page1')));
  // initialSort();
  animals1.sort(sortImageByHorn);
  animals1.forEach(animal => animal.render());
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

$('#photo-template').hide();



const showImages = (event) => {
  $('ul').empty();
  if (event.target.textContent === 'Page 1') {
    page = "Page 1";
    animals1.forEach(animal => animal.render());
  } else {
    page = "Page 2";
    console.log(page);
    animals2.forEach(animal => animal.render());
  }
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





const selectImages = (event) => {
  const liKeyword = event.target.value;
  if(event.target.value !== 'default'){
    console.log(event.target.value);
    $('li').hide();
    $(`li[value^='${event.target.value}']`).show();
  }
  // $('#keyword option:selected').text();
  // $('ul').empty();
};

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
});


