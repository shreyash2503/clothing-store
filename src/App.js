import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';
import SignIn from './routes/sign-in/sign-in.component';
import Shop from './routes/shop/shop.component';
import Checkout from './checkout.component';
import DynamicShop from './dynamicShop.component';



const App = () => {
  console.log("App");
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path='signIn' element={<SignIn />} />
        <Route path='shop' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='/shop/:id' element={<DynamicShop />} />
      </Route>
    </Routes>
  );
}

export default App;
