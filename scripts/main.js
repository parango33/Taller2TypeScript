import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var estudianteTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var inputSearchBoxRango1 = document.getElementById("search-boxRango1");
var inputSearchBoxRango2 = document.getElementById("search-boxRango2");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByRange(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
/**
 * Crea un arreglo de tuplas de la forma: atributos estudiante = [["atributo", "Valor"], ["atributo", "valor"], ...];
 * y se asigna a cada tupla el nombre del atributo del estudiante y su valor
 * @param dataStudent
 */
function renderStudentInTable(dataStudent) {
    console.log('Desplegando informacion estudiante');
    var atributosStudent = [];
    atributosStudent.push(["Codigo: ", dataStudent.codigo]);
    atributosStudent.push(["Cedula: ", dataStudent.cedula]);
    atributosStudent.push(["Edad: ", dataStudent.edad]);
    atributosStudent.push(["Direccion: ", dataStudent.direccion]);
    atributosStudent.push(["Telefono: ", dataStudent.telefono]);
    atributosStudent.forEach(function (atributosStudent) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + atributosStudent[0] + "</td> \n                           <td>" + atributosStudent[1] + "</td>"; // [0] nombre atributo, [1] valor atributo
        estudianteTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
/**
 * Almacena en una arreglo los cursos que esten dentor del rango de creditos
 */
function applyFilterByRange() {
    var range1 = inputSearchBoxRango1.value;
    var range2 = inputSearchBoxRango2.value;
    range1 = (range1 == null) ? '' : range1;
    range2 = (range2 == null) ? '' : range2;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditRange(range1, range2, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
/**
 * Recibe un arreglo de cursos y los filtra dependiendo de sus creditos
 * Devuelve el arreglo. Si no hay rango, devuelve dataCourses
 * @param r1
 * @param r2
 * @param courses arreglo a filtrar
 */
function searchCourseByCreditRange(r1, r2, courses) {
    return (r1 === '' && r2 === '') ? dataCourses : courses.filter(function (c) {
        return c.credits >= Number(r1) && c.credits <= Number(r2);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
