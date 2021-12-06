var Employee = /** @class */ (function () {
    function Employee(dataEmployee) {
        this.name = dataEmployee.name;
        this.position = dataEmployee.position;
        this.isLeader = dataEmployee.isLeader;
        this.salary = dataEmployee.salary;
        this.isWorks = dataEmployee.isWorks;
        this.department = dataEmployee.department;
    }
    return Employee;
}());
var Department = /** @class */ (function () {
    function Department(dataDepartments) {
        this.number = dataDepartments.number;
        this.name = dataDepartments.name;
    }
    return Department;
}());
var Restaurant = /** @class */ (function () {
    function Restaurant() {
        this.employees = [];
        this.departments = [];
    }
    Restaurant.prototype.addEmployee = function (dataEmployee) {
        this.employees.push(dataEmployee);
    };
    Restaurant.prototype.addDepartment = function (dataDepartment) {
        this.departments.push(dataDepartment);
    };
    Restaurant.prototype.sumSalary = function (callback) {
        var result = {};
        if (this.departments.length && this.employees.length) {
            this.employees.forEach(function (employee) {
                if (callback(employee)) {
                    if (result[employee.department]) {
                        result[employee.department] += employee.salary;
                    }
                    else {
                        result[employee.department] = employee.salary;
                    }
                }
            });
            return result;
        }
        return null;
    };
    Restaurant.prototype.averageSalary = function (callback) {
        var result = 0;
        var count = 0;
        if (this.departments.length && this.employees.length) {
            this.employees.forEach(function (employee) {
                if (callback(employee)) {
                    count++;
                    result += employee.salary;
                }
            });
            return result / count;
        }
        return null;
    };
    Restaurant.prototype.salaryMinToMax = function (callback) {
        var _this = this;
        var result = {};
        if (this.departments.length && this.employees.length) {
            this.departments.forEach(function (department) {
                result[department.number] = {};
                _this.employees.forEach(function (employee) {
                    if (callback(employee) && department.number === employee.department) {
                        if (result[department.number][employee.position]) {
                            if (result[department.number][employee.position].min > employee.salary) {
                                result[department.number][employee.position].min = employee.salary;
                            }
                            if (result[department.number][employee.position].max < employee.salary) {
                                result[department.number][employee.position].max = employee.salary;
                            }
                        }
                        else {
                            result[department.number][employee.position] = {};
                            result[department.number][employee.position].min = employee.salary;
                            result[department.number][employee.position].max = employee.salary;
                        }
                    }
                });
                if (Object.keys(result[department.number]).length === 0) {
                    delete result[department.number];
                }
            });
            return result;
        }
        return null;
    };
    Restaurant.prototype.amountEmployee = function (callback) {
        var result = 0;
        if (this.departments.length && this.employees.length) {
            this.employees.forEach(function (employee) {
                if (callback(employee)) {
                    result++;
                }
            });
            return result;
        }
        return null;
    };
    Restaurant.prototype.departmentLeader = function (callback) {
        var leader = [];
        var notLeader = [];
        if (this.departments.length && this.employees.length) {
            this.employees.forEach(function (employee) {
                if (employee.isLeader) {
                    leader.push(employee.department);
                }
                if (callback(employee)) {
                    notLeader.push(employee.department);
                }
            });
            if (leader.toString() === notLeader.toString()) {
                return leader;
            }
            leader.forEach(function (item) {
                for (var i = 0; i < notLeader.length; i++) {
                    if (item === notLeader[i]) {
                        notLeader.splice(i, 1);
                        i--;
                    }
                }
            });
            for (var i = 1; i < notLeader.length; i++) {
                if (notLeader[i] === notLeader[i - 1]) {
                    notLeader.splice(i, 1);
                    i--;
                }
            }
            return notLeader;
        }
        return null;
    };
    return Restaurant;
}());
var restaurant = new Restaurant();
restaurant.addEmployee(new Employee({
    name: 'ivan',
    position: 'cook',
    isLeader: true,
    salary: 1000,
    isWorks: true,
    department: 1
}));
restaurant.addEmployee(new Employee({
    name: 'dima',
    position: 'cook',
    isLeader: true,
    salary: 1000,
    isWorks: true,
    department: 1
}));
restaurant.addEmployee(new Employee({
    name: 'qwe',
    position: 'cook',
    isLeader: true,
    salary: 1000,
    isWorks: true,
    department: 1
}));
restaurant.addDepartment(new Department({
    number: 1,
    name: 'cook'
}));
var mainBlock = document.querySelector('.mainBlock');
var cardBlock = document.createElement('div');
var buttonAddCard = document.createElement('div');
buttonAddCard.className = 'buttonAddCard';
buttonAddCard.innerText = 'add card';
cardBlock.className = 'cardBlock';
mainBlock.appendChild(cardBlock);
mainBlock.appendChild(buttonAddCard);
var eventTarget;
var changeEmployee;
var employeeCard;
var itemBlockInfo;
var employeeInfo;
var employeeProperty;
var buttonDelete;
var isFlag = false;
var popupWindow = mainBlock.appendChild(document.createElement('div'));
popupWindow.className = 'popupWindow';
var backgroundWindow = popupWindow.appendChild(document.createElement('div'));
backgroundWindow.className = 'backgroundWindow';
backgroundWindow.addEventListener('click', function () {
    isFlag = false;
    popupWindow.setAttribute('style', 'display: none');
});
var modalWindow = popupWindow.appendChild(document.createElement('div'));
modalWindow.className = 'modalWindow';
for (var props in restaurant.employees[0]) {
    if (props === 'isWorks') {
        var inputRadioBlock = document.createElement('div');
        inputRadioBlock.innerHTML = "<p>".concat(props, "</p>\n<input type=\"radio\" id=\"contactChoice1\" name=\"isWorks\" value=\"true\">\n<label for=\"contactChoice1\">yes</label>\n<input type=\"radio\" id=\"contactChoice2\" name=\"isWorks\" value=\"false\">\n<label for=\"contactChoice2\">no</label>");
        inputRadioBlock.className = 'inputInfo';
        modalWindow.appendChild(inputRadioBlock);
    }
    else {
        if (props === 'isLeader') {
            var inputRadioBlock = document.createElement('div');
            inputRadioBlock.innerHTML = "<p>".concat(props, "</p>\n  <input type=\"radio\" id=\"contactChoice3\" name=\"isLeader\" value=\"true\" >\n  <label for=\"contactChoice3\">yes</label>\n  <input type=\"radio\" id=\"contactChoice4\" name=\"isLeader\" value=\"false\">\n  <label for=\"contactChoice4\">no</label>");
            inputRadioBlock.className = 'inputInfo';
            modalWindow.appendChild(inputRadioBlock);
        }
        else {
            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = props;
            input.className = 'inputInfo';
            modalWindow.appendChild(input);
        }
    }
}
var buttonSave = modalWindow.appendChild(document.createElement('div'));
buttonSave.innerText = 'SAVE';
buttonSave.className = 'buttonSave';
var indexBlockEmployee;
function createCard() {
    for (var i = 0; i < restaurant.employees.length; i++) {
        if (!cardBlock.children[i]) {
            employeeCard = cardBlock.appendChild(document.createElement('div'));
            employeeCard.className = 'employeeCard';
            for (var item in restaurant.employees[i]) {
                itemBlockInfo = employeeCard.appendChild(document.createElement('div'));
                itemBlockInfo.className = 'itemBlockInfo';
                employeeProperty = itemBlockInfo.appendChild(document.createElement('div'));
                employeeInfo = itemBlockInfo.appendChild(document.createElement('div'));
                employeeProperty.innerText = item;
                var separateEmployee = restaurant.employees;
                employeeInfo.innerText = separateEmployee[i][item];
                employeeInfo.className = item;
            }
            var buttonChange = document.createElement('div');
            buttonChange.innerText = 'change';
            changeEmployee = employeeCard.appendChild(buttonChange);
            changeEmployee.className = 'changeEmployee';
            changeEmployee.addEventListener('click', function (event) {
                popupWindow.setAttribute('style', 'display: block');
                eventTarget = event.target;
                isFlag = true;
                for (var i_1 = 0; i_1 < cardBlock.children.length; i_1++) {
                    if (eventTarget.parentNode === cardBlock.children[i_1]) {
                        indexBlockEmployee = i_1;
                    }
                }
            });
            var deleteCard = document.createElement('div');
            deleteCard.innerText = 'delete';
            deleteCard.className = 'buttonDelete';
            buttonDelete = employeeCard.appendChild(deleteCard);
            buttonDelete.addEventListener('click', function (event) {
                var indexDeleteEmployee;
                var eventTarget = event.target;
                for (var i_2 = 0; i_2 < cardBlock.children.length; i_2++) {
                    if (eventTarget.parentNode === cardBlock.children[i_2]) {
                        indexDeleteEmployee = i_2;
                        restaurant.employees.splice(indexDeleteEmployee, 1);
                    }
                }
                var deleteElemetn = eventTarget.parentNode;
                deleteElemetn.remove();
            });
        }
    }
}
createCard();
buttonAddCard.addEventListener('click', function () {
    popupWindow.setAttribute('style', 'display: block');
});
buttonSave.addEventListener('click', function () {
    changeCard();
});
function changeCard() {
    var elementInput = document.getElementsByClassName('inputInfo');
    if (isFlag) {
        for (var i = 0; i < elementInput.length; i++) {
            if (elementInput[i].children.length) {
                for (var j = 0; j < elementInput[i].children.length; j++) {
                    if ((elementInput[i].children[j]).checked) {
                        var elementInputRadio = (elementInput[i].children[j]).name;
                        var separateEmployee = restaurant.employees;
                        separateEmployee[indexBlockEmployee][elementInputRadio] = (elementInput[i].children[j]).value === 'true';
                        eventTarget.parentElement.children[i].children[1].innerText = '' + (elementInput[i].children[j]).value;
                    }
                }
            }
            else {
                if ((elementInput[i]).value !== '') {
                    var elementInputName = (elementInput[i]).placeholder;
                    if ((elementInput[i]).placeholder === 'salary' || (elementInput[i]).placeholder === 'department') {
                        var separateEmployee = restaurant.employees;
                        separateEmployee[indexBlockEmployee][elementInputName] = Number((elementInput[i]).value);
                    }
                    else {
                        var separateEmployee = restaurant.employees;
                        separateEmployee[indexBlockEmployee][elementInputName] = (elementInput[i]).value;
                    }
                    eventTarget.parentElement.children[i].children[1].innerText = (elementInput[i]).value;
                    (elementInput[i]).value = '';
                }
            }
        }
        isFlag = false;
    }
    else {
        // let resultObject: {
        //   [key: string]: number | string | boolean
        // } = {};
        var resultObject = void 0;
        for (var i = 0; i < elementInput.length; i++) {
            var definitelyInput = document.getElementsByClassName('inputInfo')[i];
            if (definitelyInput.children.length) {
                for (var j = 0; j < definitelyInput.children.length; j++) {
                    if ((definitelyInput.children[j]).checked) {
                        resultObject[(definitelyInput.children[j]).name] = (definitelyInput.children[j]).value === 'true';
                    }
                }
            }
            else {
                if ((elementInput[i]).value !== '') {
                    if ((elementInput[i]).placeholder === 'salary' || (elementInput[i]).placeholder === 'department') {
                        resultObject[(elementInput[i]).placeholder] = Number((elementInput[i]).value);
                    }
                    else {
                        resultObject[(elementInput[i]).placeholder] = (elementInput[i]).value;
                    }
                    (elementInput[i]).value = '';
                }
            }
        }
        var objectEmployees = restaurant.employees;
        objectEmployees.push(resultObject);
        createCard();
    }
    popupWindow.setAttribute('style', 'display: none');
}
