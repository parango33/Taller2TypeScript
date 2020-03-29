import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import {Student} from './Student.js';

import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let estudianteTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const inputSearchBoxRango1: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxRango1")!;
const inputSearchBoxRango2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxRango2")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;




btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCredits.onclick = () =>applyFilterByRange();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
/**
 * Crea un arreglo de tuplas de la forma: atributos estudiante = [["atributo", "Valor"], ["atributo", "valor"], ...];
 * y se asigna a cada tupla el nombre del atributo del estudiante y su valor
 * @param dataStudent 
 */
function renderStudentInTable(dataStudent: Student): void {
  console.log('Desplegando informacion estudiante');
  let atributosStudent :[string, string][] =[] ;
  atributosStudent.push(["Codigo: ",dataStudent.codigo]);
  atributosStudent.push(["Cedula: ",dataStudent.cedula]);
  atributosStudent.push(["Edad: ",dataStudent.edad]);
  atributosStudent.push(["Direccion: ",dataStudent.direccion]);
  atributosStudent.push(["Telefono: ",dataStudent.telefono]);
  atributosStudent.forEach((atributosStudent) => { //a cada tupla creele su propia columna en la tabla y en cada columna ponga le el atributo y su valor
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${atributosStudent[0]}</td> 
                           <td>${atributosStudent[1]}</td>`; // [0] nombre atributo, [1] valor atributo
    estudianteTbody.appendChild(trElement);
  })
  }

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

/**
 * Almacena en una arreglo los cursos que esten dentor del rango de creditos
 */
function applyFilterByRange() {
  let range1 = inputSearchBoxRango1.value;
  let range2 = inputSearchBoxRango2.value;
  range1 = (range1 == null) ? '': range1;
  range2 = (range2 == null) ? '': range2;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreditRange(range1, range2, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

/**
 * Recibe un arreglo de cursos y los filtra dependiendo de sus creditos
 * Devuelve el arreglo. Si no hay rango, devuelve dataCourses
 * @param r1 
 * @param r2 
 * @param courses arreglo a filtrar
 */
function searchCourseByCreditRange(r1: string, r2: string, courses: Course[]){
  return (r1 === '' &&  r2 === '') ? dataCourses : courses.filter(c => 
      c.credits >= Number(r1) && c.credits <= Number(r2));
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }

  
}