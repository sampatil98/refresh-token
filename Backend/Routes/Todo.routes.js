const {Router}=require("express");

const {TodoModel}=require("../models/Todo.model");

let todoRouter=Router();

todoRouter.get("/",async(req,res)=>{
    try {

        let Id=req.user.userId;
        let data= await TodoModel.find({userId:Id});

        if(data.length>0){
            res.status(200).send({
                isError:false,
                data
            });
        }else{
            res.status(200).send({
                isError:false,
                message:"your todo list is empty"
            });
        }
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        });
    }
});

todoRouter.post("/add",async (req,res)=>{
    try {
        let {title}=req.body;
        let userId=req.user.userId;

        let newtodo= new TodoModel({title,userId});

        await newtodo.save();

        res.status(201).send({
            isError:false,
            message:"New todo created successfully..!",
            newtodo
        })
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        })
    }
});

todoRouter.delete("/delete/:id",async(req,res)=>{
    try {

        let {id}=req.params;

       let deleteTodo= await TodoModel.findByIdAndDelete(id);

       res.status(200).send({
        isError:false,
        message:"Todo removed successfully",
        deleteTodo
       })
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        })
    }
});





module.exports={todoRouter};