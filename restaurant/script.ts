class Employee {
  name: string;
  position: string;
  isLeader: boolean;
  salary: number;
  isWorks: boolean;
  department: number;
  constructor(dataEmployee: Employee) {
    this.name = dataEmployee.name;
    this.position = dataEmployee.position;
    this.isLeader = dataEmployee.isLeader;
    this.salary = dataEmployee.salary;
    this.isWorks = dataEmployee.isWorks;
    this.department = dataEmployee.department;
  }
}

class Department {
  number: number;
  name: string;
  constructor(dataDepartments: Department) {
    this.number = dataDepartments.number;
    this.name = dataDepartments.name;
  }
}

class Restaurant{
  employees: Employee[];
  departments: Department[];

  constructor() {
    this.employees = [];
    this.departments = [];
  }

  addEmployee(dataEmployee: Employee) {
    this.employees.push(dataEmployee);
  }

  addDepartment(dataDepartment: Department) {
    this.departments.push(dataDepartment);
  }

  sumSalary(callback: Function): {[key: string]: number} | null {
    let result: {[key: string]: number} = {};
    if (this.departments.length && this.employees.length) {
      this.employees.forEach((employee) => {
        if (callback(employee)) {
          if (result[employee.department]) {
            result[employee.department] += employee.salary;
          } else {
            result[employee.department] = employee.salary;
          }
        }
      })
      return result;
    }
    return null;
  }

  averageSalary(callback: Function): number | null{
    let result: number = 0;
    let count: number = 0;
    if (this.departments.length && this.employees.length) {
      this.employees.forEach((employee) => {
        if (callback(employee)) {
          count++;
          result += employee.salary;
        }
      })
      return result / count;
    }
    return null;
  }

  salaryMinToMax(callback: Function): {[key: string]: {[key: string]: {[key: string]: number}}} | null {
    let result: {[key: string]: {[key: string]: {[key: string]: number}}} = {};
    if (this.departments.length && this.employees.length) {
      this.departments.forEach((department) => {
        result[department.number] = {};
        this.employees.forEach((employee) => {
          if (callback(employee) && department.number === employee.department) {
            if (result[department.number][employee.position]) {
              if (result[department.number][employee.position].min > employee.salary) {
                result[department.number][employee.position].min = employee.salary;
              }
              if (result[department.number][employee.position].max < employee.salary) {
                result[department.number][employee.position].max = employee.salary;
              }
            } else {
              result[department.number][employee.position] = {};
              result[department.number][employee.position].min = employee.salary;
              result[department.number][employee.position].max = employee.salary;
            }
          }
        })
        if (Object.keys(result[department.number]).length === 0) {
          delete result[department.number];
        }
      })
      return result;
    }
    return null;
  }

  amountEmployee(callback: Function): number | null {
    let result: number = 0;
    if (this.departments.length && this.employees.length) {
      this.employees.forEach((employee) => {
        if (callback(employee)) {
          result++;
        }
      })
      return result;
    }
    return null;
  }

  departmentLeader(callback: Function): number[] | null{
    let leader: number[] = [];
    let notLeader: number[] = [];
    if (this.departments.length && this.employees.length) {
      this.employees.forEach((employee) => {
        if (employee.isLeader) {
          leader.push(employee.department);
        }
        if (callback(employee)) {
          notLeader.push(employee.department);
        }
      })
      if (leader.toString() === notLeader.toString()) {
        return leader;
      }
      leader.forEach((item) => {
        for (let i = 0; i < notLeader.length; i++) {
          if (item === notLeader[i]) {
            notLeader.splice(i, 1);
            i--;
          }
        }
      })
      for (let i = 1; i < notLeader.length; i++) {
        if (notLeader[i] === notLeader[i - 1]) {
          notLeader.splice(i, 1);
          i--;
        }
      }
      return notLeader;
    }
    return null;
  }
}
let restaurant = new Restaurant()

restaurant.addEmployee(new Employee({
  name: 'ivan',
  position: 'cook',
  isLeader: true,
  salary: 1000,
  isWorks: true,
  department: 1,
}))
restaurant.addEmployee(new Employee({
  name: 'dima',
  position: 'cook',
  isLeader: true,
  salary: 1000,
  isWorks: true,
  department: 1,
}))
restaurant.addEmployee(new Employee({
  name: 'qwe',
  position: 'cook',
  isLeader: true,
  salary: 1000,
  isWorks: true,
  department: 1,
}))
restaurant.addDepartment(new Department({
  number: 1,
  name: 'cook',
}))

let mainBlock = document.querySelector('.mainBlock') as HTMLElement;
let cardBlock = document.createElement('div');
let buttonAddCard = document.createElement('div');
buttonAddCard.className = 'buttonAddCard';
buttonAddCard.innerText = 'add card';
cardBlock.className = 'cardBlock';
mainBlock.appendChild(cardBlock);
mainBlock.appendChild(buttonAddCard);
let eventTarget;
let changeEmployee: HTMLElement;
let employeeCard: HTMLElement;
let itemBlockInfo: HTMLElement;
let employeeInfo: HTMLElement;
let employeeProperty: HTMLElement;
let buttonDelete: HTMLElement;
let isFlag: boolean = false;

let popupWindow = mainBlock.appendChild(document.createElement('div'));
popupWindow.className = 'popupWindow';
let backgroundWindow = popupWindow.appendChild(document.createElement('div'));
backgroundWindow.className = 'backgroundWindow';
backgroundWindow.addEventListener('click', () => {
  isFlag = false;
  popupWindow.setAttribute('style', 'display: none');
})
let modalWindow = popupWindow.appendChild(document.createElement('div'));
modalWindow.className = 'modalWindow';
for (let props in restaurant.employees[0]) {
  if (props === 'isWorks') {
    let inputRadioBlock = document.createElement('div');
    inputRadioBlock.innerHTML = `<p>${props}</p>
      <input type="radio" id="contactChoice1" name="isWorks" value="true">
      <label for="contactChoice1">yes</label>
      <input type="radio" id="contactChoice2" name="isWorks" value="false">
      <label for="contactChoice2">no</label>`;
    inputRadioBlock.className = 'inputInfo';
    modalWindow.appendChild(inputRadioBlock);
  } else {
    if (props === 'isLeader') {
      let inputRadioBlock = document.createElement('div');
      inputRadioBlock.innerHTML = `<p>${props}</p>
        <input type="radio" id="contactChoice3" name="isLeader" value="true" >
        <label for="contactChoice3">yes</label>
        <input type="radio" id="contactChoice4" name="isLeader" value="false">
        <label for="contactChoice4">no</label>`;
      inputRadioBlock.className = 'inputInfo';
      modalWindow.appendChild(inputRadioBlock);
    } else {
      let input = document.createElement('input');
      input.type = 'text';
      input.placeholder = props;
      input.className = 'inputInfo';
      modalWindow.appendChild(input);
    }
  }
}
let buttonSave = modalWindow.appendChild(document.createElement('div'));
buttonSave.innerText = 'SAVE';
buttonSave.className = 'buttonSave';
let indexBlockEmployee: number;

function createCard(): void {
  for (let i = 0; i < restaurant.employees.length; i++) {
    if (!cardBlock.children[i]) {
      employeeCard = cardBlock.appendChild(document.createElement('div'));
      employeeCard.className = 'employeeCard';
      for (let item in restaurant.employees[i]) {
        itemBlockInfo = employeeCard.appendChild(document.createElement('div'));
        itemBlockInfo.className = 'itemBlockInfo';
        employeeProperty = itemBlockInfo.appendChild(document.createElement('div'));
        employeeInfo = itemBlockInfo.appendChild(document.createElement('div'));
        employeeProperty.innerText = item;
        let separateEmployee: Employee[] = restaurant.employees;
        employeeInfo.innerText = separateEmployee[i][item];
        employeeInfo.className = item;
      }
      let buttonChange = document.createElement('div');
      buttonChange.innerText = 'change';
      changeEmployee = employeeCard.appendChild(buttonChange);
      changeEmployee.className = 'changeEmployee';
      changeEmployee.addEventListener('click', (event) => {
        popupWindow.setAttribute('style', 'display: block');
        eventTarget = event.target as Element;
        isFlag = true;
        for (let i = 0; i < cardBlock.children.length; i++) {
          if (eventTarget.parentNode === cardBlock.children[i]) {
            indexBlockEmployee = i;
          }
        }
      })
      let deleteCard = document.createElement('div');
      deleteCard.innerText = 'delete';
      deleteCard.className = 'buttonDelete';
      buttonDelete = employeeCard.appendChild(deleteCard);
      buttonDelete.addEventListener('click', (event) => {
        let indexDeleteEmployee: number;
        let eventTarget = event.target as Element;
        for (let i: number = 0; i < cardBlock.children.length; i++) {
          if (eventTarget.parentNode === cardBlock.children[i]) {
            indexDeleteEmployee = i;
            restaurant.employees.splice(indexDeleteEmployee, 1);
          }
        }
        let deleteElemetn = eventTarget.parentNode as Element;
        deleteElemetn.remove();
      })
    }
  }
}
createCard()

buttonAddCard.addEventListener('click', () => {
  popupWindow.setAttribute('style', 'display: block');
})

buttonSave.addEventListener('click', () => {
  changeCard();
})

function changeCard(): void {
  let elementInput = document.getElementsByClassName('inputInfo');
  if (isFlag) {
    for (let i = 0; i < elementInput.length; i++) {
      if (elementInput[i].children.length) {
        for (let j = 0; j < elementInput[i].children.length; j++) {
          if (((elementInput[i].children[j]) as HTMLInputElement).checked) {
            let elementInputRadio: string = ((elementInput[i].children[j]) as HTMLInputElement).name;
            let separateEmployee: Employee[] = restaurant.employees;
            separateEmployee[indexBlockEmployee][elementInputRadio] = ((elementInput[i].children[j]) as HTMLInputElement).value === 'true';
            eventTarget.parentElement.children[i].children[1].innerText = '' + ((elementInput[i].children[j]) as HTMLInputElement).value;
          }
        }
      } else {
        if (((elementInput[i]) as HTMLInputElement).value !== '') {
          let elementInputName = ((elementInput[i]) as HTMLInputElement).placeholder;
          if (((elementInput[i]) as HTMLInputElement).placeholder === 'salary' || ((elementInput[i]) as HTMLInputElement).placeholder === 'department') {
            let separateEmployee: Employee[] = restaurant.employees;
            separateEmployee[indexBlockEmployee][elementInputName] = Number(((elementInput[i]) as HTMLInputElement).value);
          } else {
            let separateEmployee: Employee[] = restaurant.employees;
            separateEmployee[indexBlockEmployee][elementInputName] = ((elementInput[i]) as HTMLInputElement).value;
          }
          eventTarget.parentElement.children[i].children[1].innerText = ((elementInput[i]) as HTMLInputElement).value;
          ((elementInput[i]) as HTMLInputElement).value = '';
        }
      }
    }
    isFlag = false;
  } else {
    let resultObject = {} as Employee;
    for (let i = 0; i < elementInput.length; i++) {
      let definitelyInput = document.getElementsByClassName('inputInfo')[i];
      if (definitelyInput.children.length) {
        for (let j = 0; j < definitelyInput.children.length; j++) {
          if (((definitelyInput.children[j]) as HTMLInputElement).checked) {
            resultObject[((definitelyInput.children[j]) as HTMLInputElement).name] = ((definitelyInput.children[j]) as HTMLInputElement).value === 'true';
          }
        }
      } else {
        if (((elementInput[i]) as HTMLInputElement).value !== '') {
          if (((elementInput[i]) as HTMLInputElement).placeholder === 'salary' || ((elementInput[i]) as HTMLInputElement).placeholder === 'department') {
            resultObject[((elementInput[i]) as HTMLInputElement).placeholder] = Number(((elementInput[i]) as HTMLInputElement).value);
          } else {
            resultObject[((elementInput[i]) as HTMLInputElement).placeholder] = ((elementInput[i]) as HTMLInputElement).value;
          }
          ((elementInput[i]) as HTMLInputElement).value = '';
        }
      }
    }
    restaurant.addEmployee(new Employee(resultObject));
    createCard()
  }
  popupWindow.setAttribute('style', 'display: none');
}
