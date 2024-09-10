const get = {
    list : (req,res) =>{
        res.render('employee/list');
    },
    write : (req,res)=>{
        res.render("employee/write");
    }
}

const post = {

}

module.exports = {
    get
    ,post
}