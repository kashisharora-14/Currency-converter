const date = "2025-06-20";
let ff = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select")
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
// for(code in countryList)
// {
//     console.log(code);
// }
for (let select of dropdowns) {
    // select.addEventListener("change",function(){
    //     alert("You selected "+this.value);
    // }
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        select.append(newoption);
    }
    select.addEventListener("change", (e) => {
        updateflag(e.target);
    });
}
const updateflag = (element) => {
    let cr = element.value;
    let finalcr1 = countryList[cr];
    console.log(finalcr1);
    let currcode = `https://flagsapi.com/${finalcr1}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = currcode;
};
button.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input").value;
    console.log(amount);
    if (amount === "" || amount < 1) {
        amount = 1;
        document.querySelector(".amount input").value = "1";
    }
    // console.log(fromCurr.value, toCurr.value);
    const BaseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    let final = await fetch(BaseURL)
    const data = await final.json();
    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    const result = (amount * rate).toFixed(2);
    ff.innerText=`${amount} ${fromCurr.value} = ${result} ${toCurr.value}`;
});