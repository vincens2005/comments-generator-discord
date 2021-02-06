const { exec } = require("child_process");
console.log("executing step 1")
exec("python3 step1_alt.py", (error, stdout, stderr)=>{
    console.log(stdout)
    console.log("step1 ran; runny step 2")
    exec("python3 step2.py", (error1, stdout1, stderr1) => {
        console.log(stdout1)
        console.log("all done!")
    });
});