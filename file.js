const fs = require("fs");

// READing the file
const readed_data = fs.readFileSync("./statement.csv","utf-8");

const lines = readed_data.trim().split("\n");
// console.log(lines);

const heading = lines[0].trim().split(",");

const object = lines.slice(1).map((line)=>{
        const values = line.trim().split(",");
        let arr={};
        for (let i = 0; i < heading.length; i++) {
            const key = heading[i].trim();
            const value = values[i].trim();

            arr[key]=value;
        }
        return arr;
});

//SORTing the transaction by date
    const sorted_data= object.sort((a,b)=>new Date(a.date)-new Date(b.date));

// SUMMary 
let summ_arr={};
sorted_data.forEach(element => {
        const name = element.AccountHolder;
        const amount = Number(element.Amount)
        const type = element.Type.toLowerCase();
        const remark = element.Remarks.toLowerCase();
    if (!summ_arr[name]) {
       summ_arr[name]={
        AccountHolder:name,
        TotalCredit: 0,
        TotalDebit: 0,
        LargestTransaction: 0,
        SalaryTransactions: []
       };
    }
      if(type==="credit") summ_arr[name].TotalCredit +=amount ;
      else if(type==="debit") summ_arr[name].TotalDebit+=amount ;

      if(amount >summ_arr[name].LargestTransaction){
        summ_arr[name].LargestTransaction=amount;
      }
      if (remark.includes("salary")) {
            summ_arr[name].SalaryTransactions.push(element.TransactionID);        
      }

});

const summary_array=Object.values(summ_arr);


const header = "AccountHolder,TotalCredit,TotalDebit,LargestTransaction,SalaryTransactions";
let csv = header;
for(let i =0; i < summary_array.length; i++){
    const user = summary_array[i];
    csv += `${user.AccountHolder},${user.TotalCredit},${user.TotalDebit},${user.LargestTransaction},${user.SalaryTransactions}` 
}


fs.writeFileSync("./summary.csv",csv);