import {Route, Routes} from 'react-router-dom';

import Chat from '../Pages/Chat';
import Login from '../Pages/Login';
import Home from '../Pages/Home';

import CreatedUsers from '../Pages/CreatedUsers';
import Room from '../Components/Room';
function MainRoutss({ setUser }){
    return(
        <Routes>
            <Route path="/" element={<Login  setUser={setUser} />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createdusers" element={<CreatedUsers />} />
            <Route path="/room" element={<Room />} />

        </Routes>
    )
}


export default  MainRoutss