const { findOne, create, find, updateOne } = require("../utils/connectors")

module.exports={
    createCat: async (req, res) => {
        try {
            const { name ,id,parentId} = req.body.data;
            if (!name) {
                return res.status(400).json({ message: "Category name is required" });
            }
    
            const existingCatResponse = await findOne("Category", { name });
            if (existingCatResponse?.data) {
                return res.status(400).json({ message: "Category already exists" });
            }
    
            const response = await create("Category", { id,name,parentId });
            return res.status(201).json({ message: "Category created successfully", data: response });
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: "Error creating category" });
        }
    },
    findCat:async (req,res)=>{
        try {
            const response=await findOne("Category",{name:req.body.data.name})
            res.status(200).send(response.data)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Error finding category" });
            
        }
    },
    findAll:async (req,res)=>{
        try {
            const response=await find("Category")
            res.status(200).send(response.data)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Error finding categories" });
        }
    },
    updateCat:async (req,res)=>{
        try {
            const filterName =req.body.filter
            if(!filterName){
                return res.status(400).json({ message: "Category name is required" });
            }
            const {name,id,parentId}=req.body.data
            const filter={name:filterName}
            const response =await updateOne("Category",filter,{name,id,parentId})
            if(!response){
                return res.status(400).json({ message: "Failed to update category" });

            }
            return res.status(200).json({
                message: "Category updated successfully",data:response
            })
        } catch (error) {
            console.error("Error in updating category:", error);
            return res.status(500).json({error:"An unexpected error occurred"})
            
        }
    },
    deleteCat:async (req,res)=>{
        try {
            const name=req.body.data
            if (!name){
                return res.status(400).json({ message: "Category name is required" });
            }
            const response = await deleteOne("Category",name)
            if (response){
                return res.status(200).json({ message: "Category deleted successfully" , data:response});
            }else{
                return res.status(400).json({ message: "Failed to delete category" });
            }
        } catch (error) {
            console.error("Error in deleting category:", error);
            return res.status(500).json({error:"An unexpected error occurred"})
            
        }
    }
    
}