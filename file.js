const fs = require("fs");

// READing the file
const readed_data = fs.readFileSync("./statement.csv","utf-8");

const lines = readed_data.trim().split("\n");
// console.log(lines);

const heading = lines[0].trim().split(",");

const object = lines.slice(1).map((line)=>{
        const values = line.trim().split(",");
        let arr=[];
        for (let i = 0; i < heading.length; i++) {
            const key = heading[i].trim();
            const value = values[i].trim();

            arr[key]=value;
        }
        return arr;
});

//SORTing the transaction by date
    const sorted_data= data.sort((a,b)=>{new Date(a.date)-new Date(b.date)});
