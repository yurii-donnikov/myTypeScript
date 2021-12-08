class Employee {
  name: string;
  position: string;
  isLeader: boolean;
  salary: number;
  isWorks: boolean;
  id?: number;
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

class Restaurant {
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

  averageSalary(callback: Function): number | null {
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

  departmentLeader(callback: Function): number[] | null {
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
  name: 'anna',
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

class Render {
  mainBlock: HTMLElement;
  employeeCard?: HTMLElement;
  cardBlock?: HTMLElement;
  buttonChange?: HTMLElement;
  buttonDelete?: HTMLElement;
  indexActiveCard?: number = 0;
  isFlag?: boolean = false;
  indexObject?: number = 0;
  blockProperty?: HTMLElement;

  constructor(container: string) {
    this.mainBlock = document.querySelector(container) as HTMLElement;
    this.createStartInterface(this.mainBlock);
    this.createCard();
  }

  createStartInterface(container: HTMLElement): void {
    container.innerHTML =
      `<div class="cardBlock"></div>
   <div class="addCard">add card</div>
   <div class="popupWindow">
     <div class="backgroundWindow"></div>
     <div class="modalWindow">
      <input type="text" placeholder="name" class="name namePopup">
      <input type="text" placeholder="position" class="position positionPopup">
      <label for="isActive">isLeader</label>
      <input type="radio" id="isLeader" class="isLeader isLeaderPopup">
      <input type="number" placeholder="salary" class="salary salaryPopup">
      <label for="isActive">isWorks</label>
      <input type="radio" id="isWorks" class="isWorks isWorksPopup">
      <input type="number" placeholder="department" class="department departmentPopup">
      <div class="buttonSave">save</div>
  </div>`;
    ((document.querySelector('.addCard')) as HTMLElement).addEventListener('click', () => {
      this.isFlag = true;
      ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: block');
    });
    ((document.querySelector('.backgroundWindow')) as HTMLElement).addEventListener('click', () => {
      ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: none');
    });
    ((document.querySelector('.buttonSave')) as HTMLElement).addEventListener('click', () => {
      this.changeCard();
      ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: none');
    })
  }

  createCard(): void {
    for (let i = 0; i < restaurant.employees.length; i++) {
      restaurant.employees[i]['id'] = i;
      this.cardBlock = document.querySelector('.cardBlock') as HTMLElement;
      if (!this.cardBlock.children[i]) {
        let objectEmployees: Employee = restaurant.employees[i];
        this.employeeCard = this.cardBlock.appendChild(document.createElement('div'));
        this.employeeCard.classList.add("employeeCard");
        this.employeeCard.setAttribute('data-id', String(i));
        for (let property in objectEmployees) {
          let prop = property as keyof Employee;
          this.blockProperty = this.employeeCard.appendChild(document.createElement('div'));
          this.blockProperty.className = 'blockProperty';
          this.blockProperty.innerHTML =
            `<span class="property">${property}</span>
               <span class="${property}">${objectEmployees[prop]}</span>`;
        }
        this.buttonChange = this.employeeCard.appendChild(document.createElement('div'));
        this.buttonChange.innerText = 'Change';
        this.buttonChange.className = 'buttonChange';
        this.buttonChange.setAttribute('data-update', String(restaurant.employees[i]['id']));
        this.buttonChange.setAttribute('data-function', 'changeUser');
        this.buttonDelete = this.employeeCard.appendChild(document.createElement('div'));
        this.buttonDelete.innerText = 'Delete';
        this.buttonDelete.className = 'buttonDelete';
        this.buttonDelete.setAttribute('data-function', 'deleteUser');
        this.buttonDelete.setAttribute('data-update', String(restaurant.employees[i]['id']));
        this.employeeCard.addEventListener('click', (event) => {
          let action = ((event.target) as HTMLElement).getAttribute('data-function');
          if (action === 'changeUser') {
            if (event.target) {
              this.changeUser(event.target as HTMLElement);
            }
          }
          if (action === 'deleteUser') {
            if (event.target) {
              this.deleteUser(event.target as HTMLElement);
            }
          }
        })
      }
    }
  }

  changeUser(item: HTMLElement): void {
    for (let i = 0; i < restaurant.employees.length; i++) {
      if (restaurant.employees[i]['id'] === Number(item.getAttribute('data-update'))) {
        this.indexActiveCard = restaurant.employees.indexOf(restaurant.employees[i]);
        ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: block');
      }
    }
  }

  deleteUser(item: HTMLElement): void {
    for (let i = 0; i < document.getElementsByClassName('cardBlock')[0].children.length; i++) {
      if (document.getElementsByClassName('cardBlock')[0].children[i] === item.parentNode) {
        ((item.parentNode) as Element).remove();
        restaurant.employees.splice(i, 1);
      }
    }
  }

  changeCard(): void {
    let copyEmployeeInfo = {} as Employee
    if (this.isFlag) {
      copyEmployeeInfo['name'] = ((document.querySelector('.namePopup')) as HTMLInputElement).value;
      copyEmployeeInfo['position'] = ((document.querySelector('.positionPopup')) as HTMLInputElement).value;
      copyEmployeeInfo['isLeader'] = ((document.querySelector('.isLeaderPopup')) as HTMLInputElement).checked;
      copyEmployeeInfo['isWorks'] = ((document.querySelector('.isWorksPopup')) as HTMLInputElement).checked;
      copyEmployeeInfo['salary'] = Number(((document.querySelector('.salaryPopup')) as HTMLInputElement).value);
      copyEmployeeInfo['department'] = Number(((document.querySelector('.departmentPopup')) as HTMLInputElement).value);
      this.isFlag = false;
      this.indexObject = 0;
      restaurant.addEmployee(new Employee(copyEmployeeInfo));
      this.createCard();
    } else {
      if (this.indexActiveCard !== undefined) {
        document.getElementsByClassName('name')[this.indexActiveCard].innerHTML = ((document.querySelector('.namePopup')) as HTMLInputElement).value;
        restaurant.employees[this.indexActiveCard]['name'] = ((document.querySelector('.namePopup')) as HTMLInputElement).value;
        document.getElementsByClassName('position')[this.indexActiveCard].innerHTML = ((document.querySelector('.positionPopup')) as HTMLInputElement).value;
        restaurant.employees[this.indexActiveCard]['position'] = ((document.querySelector('.positionPopup')) as HTMLInputElement).value;
        document.getElementsByClassName('isLeader')[this.indexActiveCard].innerHTML = String(((document.querySelector('.isLeaderPopup')) as HTMLInputElement).checked);
        restaurant.employees[this.indexActiveCard]['isLeader'] = ((document.querySelector('.isLeaderPopup')) as HTMLInputElement).checked;
        document.getElementsByClassName('isWorks')[this.indexActiveCard].innerHTML = String(((document.querySelector('.isWorksPopup')) as HTMLInputElement).checked);
        restaurant.employees[this.indexActiveCard]['isWorks'] = ((document.querySelector('.isWorksPopup')) as HTMLInputElement).checked;
        document.getElementsByClassName('salary')[this.indexActiveCard].innerHTML = ((document.querySelector('.salaryPopup')) as HTMLInputElement).value;
        restaurant.employees[this.indexActiveCard]['salary'] = Number(((document.querySelector('.salaryPopup')) as HTMLInputElement).value);
        document.getElementsByClassName('department')[this.indexActiveCard].innerHTML = ((document.querySelector('.departmentPopup')) as HTMLInputElement).value;
        restaurant.employees[this.indexActiveCard]['department'] = Number(((document.querySelector('.departmentPopup')) as HTMLInputElement).value);
      }
    }
    ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: none');
    ((document.querySelector('.isLeaderPopup')) as HTMLInputElement).checked = false;
    ((document.querySelector('.isWorksPopup')) as HTMLInputElement).checked = false;
  }
}
let render = new Render('.mainBlock');
