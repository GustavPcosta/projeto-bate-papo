import { useState } from 'react'
import './styles.css'
import api from '../../Api/axios';


function CreatedUsers (){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    async function handleCreated(e){
        e.preventDefault();
        try {
         const response  = await api.post('/register',{
            username: username,
            password: password

         });
         if(!username || password){
            alert('Preencha todos os campos')
         }
         alert("usuário cadastrado com sucesso")
         console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="container">
            <h1>Created Users</h1>

            <form onSubmit={handleCreated} >
                <input type="text" placeholder="Username" value={username} onChange={(e) =>
                setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) =>
                setPassword(e.target.value)} />

                <button>enviar</button>

            </form>
        </div>
    )
}


export default CreatedUsers