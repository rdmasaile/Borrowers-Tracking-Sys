import { Rd,Rd1,email,whatsapp,facebook,dashboard,home,transaction, people, add_user } from "../assests/index";

export const navlinks = [
   {
      id:'Home',
      tittle: 'Home',
      navigate:`/`
   },
   {
      id:'Login',
      tittle: 'Login',
      navigate:`/login`

   },
   {
      id:'Signin',
      tittle: 'Signin',
      navigate:`/signin`
   },
   {
      id:'About us',
      tittle: 'About us',
      navigate:`/aboutUs`
   },
   
]

export const testimonies =[
   {
      image:Rd1,
      discription:"The Enginner"
   },
   {
      image:Rd1,
      discription:"The Software Enginner"
   },
   {
      image:Rd,
      discription:"The Electrical Enginner"
   },
   
]

export const stats = [
   {
      tittle:'Users',
      total:"50+"
   },
   {
      tittle:'Transactions',
      total:"2000+"
   },
   {
      tittle:'Partners',
      total:"2000+"
   },
]

// export const borowers = [
//    {
//       id: '1',
//       color: '#eeff00',
//       name: 'Thabang',
//       lname: 'Thabo',
//       borrowed: 100,
//       paid: 50,
//       owing: 50,
//       total: 60,
//    },
//    {
//       id: '2',
//       color: '#bf1d63',
//       name: 'Thabiso',
//       lname: 'Thabo',
//       borrowed: 100,
//       paid: 50,
//       owing: 50,
//       total: 30,
//    },
//    {
//       id: '3',
//       color: '#271dbf',
//       name: 'Tsepo',
//       lname: 'Thabo',
//       borrowed: 100,
//       paid: 50,
//       owing: 50,
//       total: 50,
//    },
//    {
//       id: '4',
//       color: '#bf1d1d',
//       name: 'Tholang',
//       lname: 'Thabo',
//       borrowed: 100,
//       paid: 50,
//       owing: 50,
//       total: 60,
//    },
// ]

export const sidebarLinks = [
   {
      id:'Home',
      icon:home,
      tittle: 'Home',
      navigate:`/`
   },
   {
      id:'Dashboard',
      icon: dashboard,
      tittle: 'Dashboard',
      navigate:`/dashboard`

   },
   {
      id:'Add Borrower',
      icon:add_user,
      tittle: 'Add Borrower',
      navigate:`/addBorrower`
   },
   {
      id:'Borrowers',
      icon:people,
      tittle: 'Borrowers',
      navigate:`/borrowers`
   },
   {
      id:'Add Transaction',
      icon:transaction,
      tittle: 'Add Transaction',
      navigate:`/addTransaction`
   },
   {
      id:'Transactions',
      icon:transaction,
      tittle: 'Transactions',
      navigate:`/transactions`
   },
]

export const footerLinks = {
   links:[
      {
         icon:"",
         tittle:"About",
         onClick:(tittle)=>{
            console.log(tittle)
         }
      },
      {
         icon:"",
         tittle:"Privacy Policy",
         onClick:(tittle)=>{
            console.log(tittle)
         }
      },
      {
         icon:"",
         tittle:"Terms of Service",
         onClick:(tittle)=>{
            console.log(tittle)
         }
      }
   ],
   socialLinks:[
      {
         icon:facebook,
         tittle:"Facebook",
         onClick:(tittle)=>{
            console.log(tittle)
         }
      },
      {
         icon:whatsapp,
         tittle:"WhatsApp",
         onClick:(tittle)=>{
            console.log(tittle)
         }
      },
      {
         icon:email,
         tittle:"email",
         onClick:(tittle)=>{
            console.log(tittle)
         }
      },
   ]
}

