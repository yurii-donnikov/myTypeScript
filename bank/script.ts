interface Clients {
  name: string;
  isActive: boolean;
  registration: object;
  id ? : number;
  checks: account[];
}

type account = Credit | Debet;

interface Debet {
  name: 'Debet';
  balance: number;
  isActive: boolean;
  currency: string;
}

interface Credit {
  name: 'Credit';
  balance: number;
  limit: number;
  isActive: boolean;
  currency: string;
}

class Client {
  name: string;
  isActive: boolean;
  registration: object;
  id ? : number;
  checks: account[];
  constructor(dataClient: Clients) {
    this.name = dataClient.name;
    this.isActive = dataClient.isActive;
    this.registration = dataClient.registration;
    this.id = dataClient.id;
    this.checks = dataClient.checks;
  }
}
interface IBank {
  haveMoney(callback: Function): Promise < null | number >
    debtMoney(callback: Function): Promise < null | number >
    sumClientsDebt(callback: Function, isActive: Function): Promise < null | {
      [key: string]: number
    } >
}

class Bank implements IBank {
  clients: Client[]

  constructor() {
    this.clients = [];
  }
  addClient(dataClient: Client) {
    this.clients.push(dataClient)
  }

  async haveMoney(callback: Function) {
    let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
    let currencies = (await response.json()).data;
    let result: number = 0;
    if (this.clients.length) {
      this.clients.forEach((client) => {
        if (client.checks.length) {
          client.checks.forEach((check) => {
            if (check.currency === callback(check)) {
              result += check.balance;
            } else {
              result += (check.balance / currencies[check.currency]) * currencies[callback(check)];
            }
          })
        }
      })
      return result;
    }
    return null;
  }

  async debtMoney(callback: Function) {
    let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
    let {
      data
    } = await response.json();
    let result: number = 0;
    if (this.clients.length) {
      this.clients.forEach((client) => {
        if (client.checks.length) {
          client.checks.forEach((check) => {
            if (check.name === 'Credit' && check.balance < check.limit) {
              if (check.currency === callback(check)) {
                result += check.limit - check.balance;
              } else {
                result += ((check.limit / data[check.currency]) * data[callback(check)]) - ((check.balance / data[check.currency]) * data[callback(check)]);
              }
            }
          })
        }
      })
      return result;
    }
    return null;
  }

  async sumClientsDebt(callback: Function, isActive: Function) {
    let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
    let currencies = (await response.json()).data;
    let result: {
      [key: string]: number
    } = {};
    result.clients = 0;
    result.debt = 0;
    if (this.clients.length) {
      this.clients.forEach((client) => {
        if (isActive(client)) {
          client.checks.forEach((check) => {
            if (check.name === 'Credit' && check.balance < check.limit) {
              if (check.currency === callback(check)) {
                result.clients++;
                result.debt += check.limit - check.balance;
              } else {
                result.clients++;
                result.debt += ((check.limit / currencies[check.currency]) * currencies[callback(check)]) - ((check.balance / currencies[check.currency]) * currencies[callback(check)]);
              }
            }
          })
        }
      })
      return result;
    }
    return null;
  }
}
let bank = new Bank()

bank.addClient(new Client({
  name: 'anna',
  isActive: true,
  registration: new Date(),
  checks: [{
      name: 'Debet',
      balance: 1000,
      isActive: true,
      currency: 'UAH',
    },
    {
      name: 'Credit',
      balance: 1000,
      limit: 1000,
      isActive: true,
      currency: 'UAH',
    },
  ],
}))

bank.addClient(new Client({
  name: 'maks',
  isActive: true,
  registration: new Date(),
  checks: [{
      name: 'Debet',
      balance: 1000,
      isActive: true,
      currency: 'UAH',
    },
    {
      name: 'Credit',
      balance: 1000,
      limit: 1000,
      isActive: true,
      currency: 'UAH',
    },
  ],
}))
bank.addClient(new Client({
  name: 'ivan',
  isActive: true,
  registration: new Date(),
  checks: [{
      name: 'Debet',
      balance: 1000,
      isActive: true,
      currency: 'UAH',
    },
    {
      name: 'Credit',
      balance: 1000,
      limit: 1000,
      isActive: true,
      currency: 'UAH',
    },
  ],
}))

class Render {
  mainBlock: HTMLElement;
  clientCard ? : HTMLElement;
  cardBlock ? : HTMLElement;
  buttonChange ? : HTMLElement;
  buttonDelete ? : HTMLElement;
  indexActiveCard ? : number = 0;
  isFlag ? : boolean = false;
  indexObject ? : number = 0;
  newClient ? : {
    [key: string]: string | number | boolean | object | account[] | 'checks' []
  } = {};
  addNewClient ? : any;
  blockProperty ? : HTMLElement;

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
      <input type="text" placeholder="name" data-id="name" class="name">
      <label for="isActive">Active?</label>
      <input type="radio" id="isActive" data-id="isActive" class="isActive">
      <div class="Debet">
        <p>Debet</p>
        <input type="number" placeholder="balance" class="balance" data-id="balanceDebet">
        <label for="isActiveDebet">Active card?</label>
        <input type="radio" id="isActiveDebet" class="isActive" data-id="isActiveDebet">
        <select class="currency" data-id="currencyDebet">
          <option>UAH</option>
          <option>EUR</option>
          <option>RUB</option>
          <option>PLN</option>
        </select>
      </div>
      <div class="Credit">
        <p>Credit</p>
        <input type="number" placeholder="balance" class="balance" data-id="balanceCredit">
        <input type="number" placeholder="limit" class="limit" data-id="limitCredit">
        <label for="isActiveCredit">Active card?</label>
        <input type="radio" id="isActiveCredit" class="isActive" data-id="isActiveCredit">
        <select class="currency" data-id="currencyCredit">
          <option>UAH</option>
          <option>EUR</option>
          <option>RUB</option>
          <option>PLN</option>
        </select>
      </div>
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
    for (let i = 0; i < bank.clients.length; i++) {
      bank.clients[i]['id'] = i;
      this.cardBlock = document.querySelector('.cardBlock') as HTMLElement;
      if (!this.cardBlock.children[i]) {
        let objectClient: Client = bank.clients[i];
        this.clientCard = this.cardBlock.appendChild(document.createElement('div'));
        this.clientCard.classList.add("clientCard");
        this.clientCard.setAttribute('data-id', String(i));
        for (let property in objectClient) {
          let prop = property as keyof Client;
          if (property === 'checks') {
            for (let i = 0; i < objectClient[property].length; i++) {
              let blockCheck = this.clientCard.appendChild(document.createElement('div'));
              blockCheck.className = "blockCheck";
              let clientCheck = objectClient[property][i];
              for (let item in clientCheck) {
                let items = item as keyof account;
                this.blockProperty = blockCheck.appendChild(document.createElement('div'));
                this.blockProperty.innerHTML =
                  `<span class="checkProperty">${item}</span>
                           <span class="${item}${objectClient[property][i]['name']}">${objectClient[property][i][items]}</span>`;
              }
            }
          } else {
            this.blockProperty = this.clientCard.appendChild(document.createElement('div'));
            this.blockProperty.className = 'blockProperty';
            this.blockProperty.innerHTML =
              `<span class="property">${property}</span>
                <span class="${property}">${objectClient[prop]}</span>`;
          }
        }
        this.buttonChange = this.clientCard.appendChild(document.createElement('div'));
        this.buttonChange.innerText = 'Change';
        this.buttonChange.className = 'buttonChange';
        this.buttonChange.setAttribute('data-update', String(bank.clients[i]['id']));
        this.buttonChange.setAttribute('data-function', 'changeUser');
        this.buttonDelete = this.clientCard.appendChild(document.createElement('div'));
        this.buttonDelete.innerText = 'Delete';
        this.buttonDelete.className = 'buttonDelete';
        this.buttonDelete.setAttribute('data-function', 'deleteUser');
        this.buttonDelete.setAttribute('data-update', String(bank.clients[i]['id']));
        this.clientCard.addEventListener('click', (event) => {
          let action = ((event.target) as Element).getAttribute('data-function');
          let self: {
            [key: string]: any
          } = this;
          if (typeof self[String(action)] === 'function') {
            self[String(action)](event.target);
          }
        })
      }
    }
  }
  changeUser(item: HTMLElement): void {
    for (let i = 0; i < bank.clients.length; i++) {
      if (bank.clients[i]['id'] === Number(item.getAttribute('data-update'))) {
        this.indexActiveCard = bank.clients.indexOf(bank.clients[i]);
        ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: block');
      }
    }
  }

  deleteUser(item: HTMLElement): void {
    for (let i = 0; i < bank.clients.length; i++) {
      if (bank.clients[i]['id'] === Number(item.getAttribute('data-update'))) {
        let indexElement = bank.clients.indexOf(bank.clients[i]);
        ((item.parentNode) as Element).remove();
        bank.clients.splice(indexElement, 1);
      }
    }
  }

  changeCard(): void {
    let childrenPopup = document.querySelector('.modalWindow').children;
    for (let i = 0; i < childrenPopup.length; i++) {
      if (childrenPopup[i].className === 'Debet' || childrenPopup[i].className === 'Credit') {
        if (this.isFlag) {
          if (!this.newClient.checks) {
            this.newClient.checks = [];
          }
          this.newClient.checks[this.indexObject] = {};
          this.newClient.checks[this.indexObject]['name'] = childrenPopup[i].className;
          this.newClient.checks[this.indexObject]['name'] = childrenPopup[i].className;
          updateCheck(childrenPopup[i] as HTMLElement, this.indexObject, this.isFlag, this.newClient);
          this.indexObject++;
        } else {
          updateCheck(childrenPopup[i] as HTMLElement, this.indexActiveCard, this.isFlag, this.newClient);
        }
      } else {
        if (((childrenPopup[i]) as HTMLInputElement).type === 'radio') {
          let name = childrenPopup[i].className;
          if (this.isFlag) {
            this.newClient[name] = ((childrenPopup[i]) as HTMLInputElement).checked;
          } else {
            bank.clients[this.indexActiveCard][name] = ((childrenPopup[i]) as HTMLInputElement).checked;
            document.getElementsByClassName(childrenPopup[i].getAttribute('data-id'))[this.indexActiveCard].innerHTML = String(((childrenPopup[i]) as HTMLInputElement).checked);
          }
          ((childrenPopup[i]) as HTMLInputElement).checked = false;
        } else {
          if (((childrenPopup[i]) as HTMLInputElement).value) {
            let name = childrenPopup[i].className;
            if (this.isFlag) {
              this.newClient[name] = ((childrenPopup[i]) as HTMLInputElement).value;
              this.newClient['registration'] = new Date();
            } else {
              bank.clients[this.indexActiveCard]['name'] = ((childrenPopup[i]) as HTMLInputElement).value;
              document.getElementsByClassName(childrenPopup[i].getAttribute('data-id'))[this.indexActiveCard].innerHTML = ((childrenPopup[i]) as HTMLInputElement).value;
            }
            ((childrenPopup[i]) as HTMLInputElement).value = '';
          }
        }
      }
    }

    function updateCheck(itemСheck: HTMLElement, index: number, flag: boolean, copyNewClient: {
      [key: string]: any
    }) {

      if (flag) {
        for (let i = 0; i < itemСheck.children.length; i++) {
          if (((itemСheck.children[i]) as HTMLInputElement).type === 'radio') {
            let name = itemСheck.children[i].className;
            copyNewClient.checks[index][name] = ((itemСheck.children[i]) as HTMLInputElement).checked;
          } else {
            if (((itemСheck.children[i]) as HTMLInputElement).value) {
              if (((itemСheck.children[i]) as HTMLInputElement).valueAsNumber) {
                let name = itemСheck.children[i].className;
                copyNewClient.checks[index][name] = ((itemСheck.children[i]) as HTMLInputElement).valueAsNumber;
              } else {
                let name = itemСheck.children[i].className;
                copyNewClient.checks[index][name] = ((itemСheck.children[i]) as HTMLInputElement).value;
              }
            }
          }
        }

      } else {
        for (let i = 0; i < bank.clients[index].checks.length; i++) {
          if (bank.clients[index].checks[i].name === itemСheck.className) {
            for (let j = 0; j < itemСheck.children.length; j++) {
              if (((itemСheck.children[j]) as HTMLInputElement).type === 'radio') {
                let nameClass = itemСheck.children[j].className;
                bank.clients[index].checks[i][nameClass] = ((itemСheck.children[j]) as HTMLInputElement).checked;
                document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[index].innerHTML =
                  String(((itemСheck.children[j]) as HTMLInputElement).checked);
                ((itemСheck.children[j]) as HTMLInputElement).checked = false;
              } else {
                if (((itemСheck.children[j]) as HTMLInputElement).value) {
                  if (((itemСheck.children[j]) as HTMLInputElement).valueAsNumber) {
                    let nameClass = itemСheck.children[j].className;
                    bank.clients[index].checks[i][nameClass] = ((itemСheck.children[j]) as HTMLInputElement).valueAsNumber;
                    document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[index].innerHTML =
                      String(((itemСheck.children[j]) as HTMLInputElement).valueAsNumber);
                    ((itemСheck.children[j]) as HTMLInputElement).valueAsNumber = undefined;
                  } else {
                    let nameClass = itemСheck.children[j].className;
                    bank.clients[index].checks[i][nameClass] = ((itemСheck.children[j]) as HTMLInputElement).value;
                    document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[index].innerHTML =
                      ((itemСheck.children[j]) as HTMLInputElement).value;
                  }
                }
              }
            }
          }
        }
      }
      this.newClient = copyNewClient;
    }
    
    if (this.isFlag) {
      this.addNewClient = this.newClient;
      bank.addClient(new Client(this.addNewClient));
      this.isFlag = false;
      this.newClient = {
        checks: [],
      };
      this.indexObject = 0;
      this.createCard();
    }
    ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: none');
  }
}
let render = new Render('.mainBlock');