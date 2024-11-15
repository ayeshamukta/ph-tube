function timeConvert(time) 
{
    let hour = parseInt(time/3600);
    let min = parseInt(time%60);
    
    return `${hour} hour ${min} min ago`;
}
const res = timeConvert(452);
console.log(res);

