import Teacher from '../models/Teacher.js';

export function setteachers(req,res){
    const teacher=new Teacher({
        name: req.body.name,
        age: req.body.age
    })

    teacher.save().then(()=>
    {
        res.json({
            message: 'Teacher added successfully'
        })
    }).catch(
        ()=>{
        res.json({
            message: 'Failed to add teacher'
        })
    })
}

export function getTeachers(req,res){
        Teacher.find().then((data)=>{
            res.json(data);
        }).catch(
            ()=>{
                res.json(
                    {
                        message: 'Failed to fetch teachers'
                    }
                )
            }
        )
        
    }