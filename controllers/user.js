const connection = require('../connection');
const adduser = async(req,res,next)=>{
    let expense = req.body;
    query = "insert into expense (amount,description,category) values(?,?,?)";
    connection.query(query,[expense.amount,expense.description,expense.category],(err,results)=>{
        if(!err){
            return res.status(200).json({message: "User Added Successfully"});
        }
        else
        return res.status(500).json(err);
    }) ;
};

const getuser = async(req,res,next)=>{
    var query = "select * from expense";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else
        return res.status(500).json(err);
    }) ;
};

const updateuser = async(req,res,next)=>{
    const id = req.params.id;
    let expenses = req.body;
    var query = "update expense set amount=?,description=?,category=? where id=?";
    connection.query(query,[expenses.amount,expenses.description,expenses.category,id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"User id is not found"});
            }
            return res.status(200).json({message:"Product updated Successfully"});
        }
    });
};

const deleteuser = async(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from expense where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"User id is not found"});
            }
            return res.status(200).json({message:"Product Deleted Successfully"});
        }
    });
};

module.exports = {
    adduser,
    getuser,
    updateuser,
    deleteuser
}