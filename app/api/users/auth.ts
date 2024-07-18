// import { fetchUserByEmail } from "@/app/lib/userRepository";
// // import { SHA256 as sha256 } from "crypto-js";
// // import prisma client
// import prisma from "@/app/lib/prisma";
// import hashPassword from "./create"

// export default async function handle(req, res){
//     if (req.method === "POST"){
//         await loginUserHandler (req, res);
//     } else{
//         return res.status(405);
//     }
// }

// async function loginUserHandler(req, res){
//     const{ email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json ({message: "Invalid Input"});
//     }
//     try {
//         // const Url = new URL(request.url);
//         // const searchParams = new URLSearchParams(Url.searchParams);
//         // const param = searchParams.get("email");
//         // const user = await fetchUserByEmail(param ? "")
//         const user = await prisma.user.findUnique({
//             where: { email: email },
//             select: {
//               id: true,
//               name: true,
//               email: true,
//               password: true,
//               image_url: true,
//             },
//         });
        
//         if (user && user.password === hashPassword(password)) {
//             // exclude password from json response
//             return res.status(200). json(exclude(user, ["password"]));
//         } else{
//             return res. status(401).json({message: "Invalid credentials"});
//         }
//     } catch(e){
//         throw new Error(e);
//     }
// }

// function exclude(user, keys){
//     for (let key of keys){
//         delete user [key];
//     }
//     return user;
// }