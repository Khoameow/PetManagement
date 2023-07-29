//collection form data javaScript
'use strict';
//get all tag input
// const arrInput = document.getElementsByTagName('input');
// console.log(arrInput);
//form
const PET_ID = document.getElementById('input-id');
const PET_NAME = document.getElementById('input-name');
const PET_AGE = document.getElementById('input-age');
const PET_TYPE = document.getElementById('input-type');
const PET_WEIGHT = document.getElementById('input-weight');
const PET_LENGTH = document.getElementById('input-length');
const PET_COLOR = document.getElementById('input-color-1');
const PET_BREED = document.getElementById('input-breed');
//checkbox
const vaccinatedCheckbox = document.getElementById('input-vaccinated');
const dewormedCheckbox = document.getElementById('input-dewormed');
const sterilizedCheckbox = document.getElementById('input-sterilized');
//button
const SUBMIT_FORM = document.getElementById('submit-btn'); // submit data button
const PET_HEALTHY = document.getElementById('healthy-btn'); //show pet healthy
const SHOW_PET = document.getElementById('show-btn'); //show all pet
const SHOW_BMI = document.getElementById('BMI-btn');
let PET_BMI = '⍰';
function init() {
  PET_ID.value = '';
  PET_NAME.value = '';
  PET_AGE.value = '';
  PET_WEIGHT.value = '';
  PET_LENGTH.value = '';
  PET_COLOR.value = ' ';
  PET_TYPE.value = '猫か犬';
  PET_BREED.value = '種類を選び';
  vaccinatedCheckbox.checked = false;
  dewormedCheckbox.checked = false;
  sterilizedCheckbox.checked = false;
}
let data = [];
let inputCheck = document.getElementsByTagName('input');
const send = () => {
  let PET_DATA = [
    vaccinatedCheckbox.checked,
    dewormedCheckbox.checked,
    sterilizedCheckbox.checked,
  ];
  let obj = {
    petId: PET_ID.value,
    petName: PET_NAME.value,
    petAge: PET_AGE.value,
    petType: PET_TYPE.value,
    petWeight: PET_WEIGHT.value,
    petLength: PET_LENGTH.value,
    petColor: PET_COLOR.value,
    petBreed: PET_BREED.value,
    petHealth: PET_DATA,
    petBMI: PET_BMI,
  };
  // check null
  if (
    obj.petId == '' ||
    obj.petName == '' ||
    obj.petAge == '' ||
    obj.petWeight == '' ||
    obj.petLength == ''
  ) {
    alert('未選択があります');
    return;
  }
  if (obj.petType == '猫か犬' || obj.petBreed == '種類を選び') {
    alert('未選択があります');
    return;
  }
  data.push(obj);
  console.log(data);
  render(data);
  init();
};
SUBMIT_FORM.addEventListener('click', send);
//create new data khi check pet khoe manh
const CHECK_PET = () => {
  if (data.length == 0) {
    alert('まだ登録していない');
    return;
  }
  let newTable = `<tr>
    <th scope="col">ID</th>
    <th scope="col">名前</th>
    <th scope="col">年齢</th>
    <th scope="col">タイプ</th>
    <th scope="col">体重</th>
    <th scope="col">長さ</th>
    <th scope="col">種類</th>
    <th scope="col">色</th>
    <th scope="col">接種済み</th>
    <th scope="col">駆虫済み</th>
    <th scope="col">殺菌済み</th>
    <th scope="col">登録日</th>
    <th scope="col">BMI</th>
    <th scope="col">編集</th>
  </tr>`;
  data.forEach((element) => {
    let colorCheck = [];
    const colorList = element.petHealth;
    colorList.forEach((element) => {
      if (element === true) colorCheck.push('bi bi-check-circle-fill');
      else colorCheck.push('bi bi-x-circle-fill');
    });
    const petDataLenght = element.petHealth;
    let count = 0;
    petDataLenght.forEach((e) => {
      if (e === true) count++;
    });
    if (count >= 2) {
      const date = new Date();
      let day = (date.getDay() + '').padStart(2, '0'); // if 1-9 . add before 0
      let month = (date.getMonth() + '').padStart(2, '0');
      let year = date.getFullYear();
      //全部　x にします
      newTable += `<tr>
        <th>${element.petId}</th>
        <td>${element.petName}</td>
        <td>${element.petAge}</td>
        <td>${element.petType}</td>
        <td>${element.petWeight}kg</td>
        <td>${element.petLength}cm</td>
        <td>${element.petBreed}</td>
        <td><i class="bi bi-square-fill" style="color: ${element.petColor}"></i></td>
        <td><i class="${colorCheck[0]}"></i></td>
        <td><i class="${colorCheck[1]}"></i></td>
        <td><i class="${colorCheck[2]}"></i></td>
        <td>${day}/${month}/${year}</td>
        <td>${element.petBMI}</td>
        <td><button type="button" onclick="deleteById(${element.petId})"  class="btn btn-danger delete-btn" id="delete-row-${element.petId}">Delete</button></td>
        </tr>`;
      document.getElementById('render-table').innerHTML = newTable;
    }
  });
};

PET_HEALTHY.addEventListener('click', CHECK_PET);

// show data

const render = () => {
  let table = `<tr>
  <th scope="col">ID</th>
  <th scope="col">名前</th>
  <th scope="col">年齢</th>
  <th scope="col">タイプ</th>
  <th scope="col">体重</th>
  <th scope="col">長さ</th>
  <th scope="col">種類</th>
  <th scope="col">色</th>
  <th scope="col">接種済み</th>
  <th scope="col">駆虫済み</th>
  <th scope="col">殺菌済み</th>
  <th scope="col">登録日</th>
  <th scope="col">BMI</th>
  <th scope="col">編集</th>
</tr>`;
  data.forEach((e) => {
    let colorCheck = [];
    const colorList = e.petHealth;
    colorList.forEach((element) => {
      if (element === true) colorCheck.push('bi bi-check-circle-fill');
      else colorCheck.push('bi bi-x-circle-fill');
    });
    //get date
    const date = new Date();
    let day = (date.getDay() + '').padStart(2, '0'); // if 1-9 . add before 0
    let month = (date.getMonth() + '').padStart(2, '0');
    let year = date.getFullYear();
    //全部　x にします
    table += `<tr>
    <th>${e.petId}</th>
    <td>${e.petName}</td>
    <td>${e.petAge}</td>
    <td>${e.petType}</td>
    <td>${e.petWeight}kg</td>
    <td>${e.petLength}cm</td>
    <td>${e.petBreed}</td>
    <td><i class="bi bi-square-fill" style="color: ${e.petColor}"></i></td>
    <td><i class="${colorCheck[0]}"></i></td>
    <td><i class="${colorCheck[1]}"></i></td>
    <td><i class="${colorCheck[2]}"></i></td>
    <td>${day}/${month}/${year}</td>
    <td>${e.petBMI}</td>
    <td><button type="button" onclick="deleteById(${e.petId})"  class="btn btn-danger delete-btn" id="delete-row-${e.petId}">Delete</button></td>
  </tr>`;
  });
  document.getElementById('render-table').innerHTML = table;
};
//show all data pet
SHOW_PET.addEventListener('click', render);

//delete pet by id : them onclick="deleteById(${e.petId})" vao button
function deleteById(value) {
  console.log(data);
  // const index = data.filter((a, i) => {
  //   if (value == a.petId) {
  //     data.splice(i, 1); //i : chi so index
  //     render();
  //   }
  // });
  //dung filter se tra ve mang rong
  const index = data.findIndex((e) => e.petId == value); // neu khong tim thay se tra ve 1
  if (index !== -1) {
    data.splice(index, 1);
    render();
  }
}

//show BMI
const showBMI = function () {
  data.forEach((element) => {
    const BMI = element.petWeight / Math.pow(element.petLength / 100, 2);
    element.petBMI = BMI.toFixed(2);
    console.log(BMI);
    let table = `<tr>
  <th scope="col">ID</th>
  <th scope="col">名前</th>
  <th scope="col">年齢</th>
  <th scope="col">タイプ</th>
  <th scope="col">体重</th>
  <th scope="col">長さ</th>
  <th scope="col">種類</th>
  <th scope="col">色</th>
  <th scope="col">接種済み</th>
  <th scope="col">駆虫済み</th>
  <th scope="col">殺菌済み</th>
  <th scope="col">登録日</th>
  <th scope="col">BMI</th>
  <th scope="col">編集</th>
</tr>`;
    data.forEach((e) => {
      let colorCheck = [];
      const colorList = e.petHealth;
      colorList.forEach((element) => {
        if (element === true) colorCheck.push('bi bi-check-circle-fill');
        else colorCheck.push('bi bi-x-circle-fill');
      });
      //get date
      const date = new Date();
      let day = (date.getDay() + '').padStart(2, '0'); // if 1-9 . add before 0
      let month = (date.getMonth() + '').padStart(2, '0');
      let year = date.getFullYear();
      //全部　x にします
      table += `<tr>
    <th>${e.petId}</th>
    <td>${e.petName}</td>
    <td>${e.petAge}</td>
    <td>${e.petType}</td>
    <td>${e.petWeight}kg</td>
    <td>${e.petLength}cm</td>
    <td>${e.petBreed}</td>
    <td><i class="bi bi-square-fill" style="color: ${e.petColor}"></i></td>
    <td><i class="${colorCheck[0]}"></i></td>
    <td><i class="${colorCheck[1]}"></i></td>
    <td><i class="${colorCheck[2]}"></i></td>
    <td>${day}/${month}/${year}</td>
    <td>${e.petBMI}</td>
    <td><button type="button" onclick="deleteById(${e.petId})"  class="btn btn-danger delete-btn" id="delete-row-${e.petId}">Delete</button></td>
  </tr>`;
    });
    document.getElementById('render-table').innerHTML = table;
  });
};

SHOW_BMI.addEventListener('click', showBMI);
