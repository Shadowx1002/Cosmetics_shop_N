export async function CreateOrder(req,res){
    if(req.user==null){
        res.stauts(403).json(
            {
                message:"please login and try again"
            }
        )
        return
    }
    const orderInfo=req.body
    if(orderInfo.name==null){
        orderInfo.name=req.body.firstname + " " + req.body.lastname;
    }
    

}