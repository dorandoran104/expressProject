const fs = require('fs');

exports.deleteFiles = (files)=>{
    
    files.map((data)=>{
        try{
            console.log(data);
            fs.unlink(data.path, async (err) => {
                if (err) {
                    console.error('')
                    console.error('@@@@@@@@@@@@@@@@@@')
                    console.error('파일 삭제 오류')
                    console.error('@@@@@@@@@@@@@@@@@@')
                    console.error('')
                }
                if(!err){
                    console.log('')
                    console.log('@@@@@@@@@@@@@@@@@@')
                    console.log('파일 삭제 완료')
                    console.log('@@@@@@@@@@@@@@@@@@')
                    console.log('')
                }
              });
        }catch(err){
            console.error('')
            console.error('@@@@@@@@@@@@@@@@@@')
            console.error('파일 삭제 오류')
            console.error('@@@@@@@@@@@@@@@@@@')
            console.error('')
        }
    })
}