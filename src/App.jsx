import { useState ,useCallback, useEffect} from "react"


function App() {
  
  const [length,setlength] = useState(6);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [symbolAllowed,setSymbolAllowed] = useState(false);
  const [password,setPassword] = useState('');

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+= "1234567890"
    if(symbolAllowed) str+= "@#$&*?+_-"

    for(let i=1;i<length;i++)
    {
      const char=Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,symbolAllowed])

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
    alert("copy successful")
  }

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,symbolAllowed])

  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden ">
        <input type="text" value={password} className="outline-none w-full py-1 px-3  readOnly "/>
        <button onClick={copyPassword} className="outline-none bg-blue-400 text-white px-3 py-1 shrink-0">copy</button>
      </div>
      <div className="flex text-sm gap-x-z my-2">
        <div className="flex items-center gap-x-1 px-1">
          <input type="range" min={6} max={20} value={length} className="cursor-pointer"
          onChange={(e)=>setlength(e.target.value)} />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1 px-1">
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          onChange={()=>{
            setNumberAllowed((prev) => !prev)
          }}
          
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1 px-1">
          <input type="checkbox" 
          defaultChecked={symbolAllowed}
          onChange={()=>{
            setSymbolAllowed((prev) => !prev)
          }}
          
          />
          <label htmlFor="charInput">Symbols</label>
        </div>

      </div>
     </div>
      
    </>
  )
}

export default App
