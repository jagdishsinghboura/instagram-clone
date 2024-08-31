
// export  const isAuthenticated=async (req, res, next)=>{
    
    //     try {
        
    //         console.log("tokensdfsd", req.cookies.token);
//         const token = req.cookies.token ||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmI4YmMxMDFiZWU1YWEyNTU3NzYwZjYiLCJpYXQiOjE3MjQ2NzE2ODEsImV4cCI6MTcyNDc1ODA4MX0.naXpg-kIrOJqa9GDEbXNfCHq1IuvTlzZ7hZ_0WFnfRQ";

        
//         if(!token){
//             return res.status(401).json({
//                 message:"user not authenticated",
//                 success :false,
//             })
//         }

//         const decode = await jwt .verify(token, 'supersecretpassword');
//         if(!decode){
    //             return res.status(401).json({
        //                 message:"invalid ",
        //                 success :false,
        //             })
        //         }
        
        //         req.id = decode.userId;
        //         next();
        
        //     } catch (error) {
            //      console.log("error in isAuthenticated");
            
            //     }
            
            // }
            
  import jwt from "jsonwebtoken"
import express from "express"
import cookieParser  from "cookie-parser";

const app = express();

app.use(cookieParser());

const isAuthenticated = async (req,res,next)=>{
    try {
        console.log(req.path);
        
        const cookie = req.cookies;
        const token = cookie.token ||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNlZDRiMTY4YWQ0NWQwYTU3YTY4NmIiLCJpYXQiOjE3MjQ4MzE4MTEsImV4cCI6MTcyNDkxODIxMX0.ZuyqW9GEZij8LyMyTdePeLCk0ZXSjZ2SmoZ4CIKhh7E";
        console.log(token);
        
        
        
        if(!token){
            console.log("user not authenticate");
            return res.status(401).json({
                
                message:'User not authenticated',
                success:false
            });
        }
        const decode = await jwt.verify(token,"supersecretpassword" );
        if(!decode){
            return res.status(401).json({
                message:'Invalid',
                success:false
            });
        }
        req.id = decode.userId;
        
        next();
    } catch (error) {
        console.log(error);
    }
}
app.use(isAuthenticated);
export default isAuthenticated;