import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';
import SignIn from './routes/sign-in/sign-in.component';
import Shop from './routes/shop/shop.component';
import Checkout from './checkout.component';
import DynamicShop from './dynamicShop.component';
import { useEffect } from 'react';
//& import related to firestore
//&///////////
//! import related to user redux
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/user.action';


const App = () => {
  const dispatch = useDispatch(); //? --> the value of dipatch never changes
  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   console.log(user);
    //   if (user) {
    //     createUserDocumentFromAuth(user)
    //   }
    //   dispatch(setCurrentUser(user));
    // });
    // return unsubscribe; //-----> This is an example of a useEffect cleanup function

    // * This is different way to do the above using sagas
    //getCurrentUser().then((user) => console.log(user));
    // * Proper saga implementation

    dispatch(checkUserSession());


  }, []);
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
