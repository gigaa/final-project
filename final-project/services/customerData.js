//1) created a services/customerData.js
let customers = [
    {id:1,name:'Vivek S',email:'vivek@abcd.com',phone:'1234567899', address:'India'},
    {id:2,name:'Rama',email:'rama@abcd.com',phone:'wwwww', address:'Asia'},
  ];

const getCustomers = ()=>(customers);
const getCustomerById = (id) =>{
    let temp = customers.filter((data)=>(data.id == id));
    if(temp.length > 0){
        return temp[0];
    }else{
        return {};
    }
}
const addCustomer = (record) =>{
    record.id = Date.now();
    customers.push(record);
}

const updateCustomer = (rec)=>{
    customers.map((item,index)=>{
        if(rec.id == item.id){
          customers[index] = rec;
        }
      })
}

const deleteCustomer = (id) =>{
    let temp = customers.filter((record)=>(record.id != id));
    customers = temp;
}
module.exports = {getCustomers,getCustomerById,addCustomer,updateCustomer,deleteCustomer};