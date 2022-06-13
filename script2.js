
class Bartender{

    constructor(_name, _start, _end, _food){
        this.name = _name;
        this.start = _start; 
        this.end = _end;
        this.hours = null
        this.food = _food;
        this.tipBeforeFood;
        this.finalTip;
    }
    getHours = () => {
        let startHour = parseFloat(this.start.slice(0,3));
        let endHour = parseFloat(this.end.slice(0,3));
        if (endHour < startHour)
        {
            endHour += 24.0
        }

        let startMin = parseFloat(this.start.slice(3,5))
        let endMin = parseFloat(this.end.slice(3,5))

        let totalMins = endMin - startMin;
        this.hours = endHour - startHour + (totalMins / 60)
    }
}

function stringifyNumber(n) {
    let special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
    let deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

    if (n < 20) return special[n];
    if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
    return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
}
const getBartenders = (numTenders, inputs) =>{
   
    let bartenders = [];
    for (let i = 1; i < numTenders * 4; i+=4){
        if(inputs[i+1].value.length == 0 || inputs[i+2].value.length == 0)
        {
            alert("The time for the " + stringifyNumber(Math.floor(i/4) + 1) + " bartender has been left empty.")
            return
        }
        let b = new Bartender(inputs[i].value, inputs[i+1].value,inputs[i+2].value, parseFloat(inputs[i+3].value));
        b.getHours();
        bartenders.push(b);
    }
    return bartenders
}
totalTenders = 5

const main = () => {
    let inputs = document.querySelectorAll("input")
    let numTenders = parseInt(inputs[0].value);
    let totalCash = parseFloat(inputs[totalTenders * 4 + 1].value);

    if (isNaN(totalCash))
    {
        alert("You must enter the total cash made!")
        return
    }
    if (isNaN(numTenders))
    {
        alert("must enter the number of bartenders!")
        return
    }

    let bartenders = getBartenders(numTenders, inputs);

    let totalHours = 0;
    for (bar of bartenders){
        if (isNaN(bar.hours) || bar.hours == 0)
        {
            alert("A bartender cannot have the same start and end time.")
            return
        }
        if (isNaN(bar.food))
        {bar.food = 0}
        totalHours += bar.hours;

    }
    let dollarsPerHour = totalCash / totalHours;
    displayResults(bartenders, dollarsPerHour, totalCash, totalHours);
}
let first = true
const displayResults = (bartenders, dollarsPerHour, totalCash, totalHours) =>{
    
    if (!first)
    {
        let results = document.getElementById("results")
        results.remove()
        let th = document.getElementById("this")
        let res = document.createElement("div")
        res.id="results"
        th.appendChild(res)
    }
    let tot = document.createElement("div")
    tot.className = "head"
    t3 = document.createTextNode(`Total Cash: $${totalCash.toFixed(2)}`);
    tot.appendChild(t3)
    results.append(tot)

    let dph = document.createElement("div")
    dph.className = "head"
    let t2 = document.createTextNode(`Dollars per hour: ${dollarsPerHour.toFixed(2)}`);
    dph.appendChild(t2)
    results.append(dph)
    
    let toth = document.createElement("div")
    toth.className = "head"
    let t1 = document.createTextNode(`Total hours: ${totalHours.toFixed(2)}`);
    toth.appendChild(t1)
    results.append(toth)

    first = false;
    for (let ele of bartenders)
{
    ele.tipBeforeFood = (ele.hours * dollarsPerHour).toFixed(2); 
    ele.finalTip = (ele.tipBeforeFood - ele.food).toFixed(2);
    
    let der = document.createElement("div")
    der.className = "bartender"

    let name = document.createElement("p")
    let nameN = document.createTextNode(`name: ${ele.name}`)
    name.appendChild(nameN)
    der.appendChild(name)

    let hours = document.createElement("p")
    let hoursN = document.createTextNode(`hours: ${ele.hours}h`)
    hours.appendChild(hoursN)
    der.appendChild(hours)

    let food = document.createElement("p")
    let foodN = document.createTextNode(`food: $${ele.food}`)
    food.appendChild(foodN)
    der.appendChild(food)

    let tipBeforeFood = document.createElement("p")
    let tipBeforeFoodN = document.createTextNode(`tip before food: $${ele.tipBeforeFood}`)
    tipBeforeFood.appendChild(tipBeforeFoodN)
    der.appendChild(tipBeforeFood)

    let finaltip = document.createElement("p")
    let finaltipN = document.createTextNode(`final tip: $${ele.finalTip}`)
    finaltip.appendChild(finaltipN)
    der.appendChild(finaltip)

    results.appendChild(der)
}
}





