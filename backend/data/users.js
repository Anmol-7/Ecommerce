import bcrypt from 'bcryptjs';
const users=[
    {
        name:'Admin User',
        email:'hello@world.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Anmol Jain',
        email:'anmol@world.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name:'ajmera house',
        email:'ajmera@world.com',
        password: bcrypt.hashSync('123456',10),
    },
]
export default users