import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './Navbar';

import { myloginWithGoogle, myLogout, activateUpdate, writeUserData } from './Firebase';

function App() {
  const [user, setUser] = useState({
    nome: 'Usuário',
    email: 'email',
    photo: viteLogo,
  });

  const [textInput, setTextInput] = useState('');
  const [tInput, setTInput] = useState("");
  const [posts, setPosts] = useState([{user: "Vitor", text: "alow", photo: "",time:0}]);
  
  useEffect(() => {
    activateUpdate(setPosts);
  }, []);
  useEffect(()=>{
    setPosts(posts.sort((a, b) => {
      let da = new Date(a.time),
          db = new Date(b.time);
      return da - db;
    }));
  })

  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <hr />
      
      <hr />
      <div className='chat-section mb-4'>

        {posts.map((post) => (
            <div key={post.key} className="post card mb-4">
              <div className="card-header post-header d-flex align-items-center">
                <img src={post.photo} alt="" className='rounded-4' style={{width:'50px'}}/>
                <span className='text-start ms-3'>
                  <h5 className=''>{post.user}</h5>
                  {post.time&&<small>
                                {`${(new Date(post.time)).getHours()}:${(new Date(post.time)).getMinutes() < 10? "0"+(new Date(post.time)).getMinutes().toString() : (new Date(post.time)).getMinutes()}`}
                              </small>
                  }
                </span>
              </div>
              <div className="card-body ">
                <p className="fs-6 text-start">{post.text}</p>
              </div>
            </div>
          ))}
      </div>
      <div className='fixed-bottom bg-body-secondary shadow-lg rounded-4 rounded-bottom-0 p-3'>
        <div class="input-group d-flex justify-content-center">
          <input type="text" class="form-control" id="input-msg" 
          onChange={(callback) => setTInput(callback.target.value)} 
          
           onKeyUp={(e)=>
            {
              if(e.key=="Enter"){
                writeUserData(tInput)
                e.target.value="";
              }
            }} />
            
          <button class="b" type="button" id="button-addon2"
          onClick={() => {
            writeUserData(tInput)
            document.getElementById("input-msg").value = ""

          }}>Enviar</button>
        </div>
      </div>
    </>
  );
}

export default App;
