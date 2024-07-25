import UserPage from './pages/userpage/userPage';
import Signin from './pages/Signin';
import AddBorrower from './components/AddBorrower';
import AddTransaction from './components/AddTransaction';
import Borrowers,{AllBorrowers} from './components/Borrowers';
import Login from './pages/Login';
// import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/dashboard/Dashboard';
import Transaction from './components/transaction/Transaction';
import RequireAuth from './components/requireAuth';
import OwingBorrowers from './components/OwingBorrowers';

const App = () => {  
   
   return (     
      
      <Routes>
         <Route path='/' element={<Home/>}>
            <Route index path='/login' element={<Login/>}/>
            <Route index path='/signin' element={<Signin/>}/>
         </Route>
         <Route element={<RequireAuth allowedRoles={[]}/>}>
            <Route element={<UserPage/>}>
               <Route index path='/dashboard' element={<Dashboard/>}/>
               <Route path='/borrowers' element={<Borrowers/>}>
                  <Route path='/borrowers' element={<AllBorrowers/>}/>
                  <Route path='/borrowers/owing' element={<OwingBorrowers/>}></Route>
               </Route>
               <Route index path='/addBorrower' element={<AddBorrower/>}/>
               <Route index path='/addTransaction' element={<AddTransaction/>}/>
               <Route index path='/transactions' element={<Transaction/>}/>
            </Route>
         </Route>
      </Routes>
   );
}
export default App;