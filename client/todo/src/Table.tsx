import axios from 'axios';
import  { useEffect, useState } from 'react'

const Table = () => {
    const [data,setData] = useState([]);
    const[input,setInput] = useState("")
    const callApi = async () =>{
       const response:any = await axios.get("http://localhost:3000/todos");
       console.log(response)
       setData(response.data)
    }
    useEffect(()=>{
      callApi()
    },[])

    const deleteHandler = (id:number)=>{
      axios.delete(`http://localhost:3000/todos/${id}`)
      callApi()
    }
    const addHandler = async () =>{
         await axios.post("http://localhost:3000/todos",{description:input});
        callApi();
        setInput("");
        return; 
    }
    const saveHandler = async (id:number) =>{
        await axios.put(`http://localhost:3000/todos/${id}`,{description:input}) 
        callApi()
        return;
    }
  return(<>
  <div>
  Your Data List
  </div>
  <div>
    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
    <button onClick={addHandler}>Add</button>
  </div>
 {
    data.map((elem:any)=>{
      return(
        <div key ={elem.todo_id } style={{display:"flex",flexSpacing:4,flexDirection:"row",alignItems:"center",
        border:"1px solid gray", marginBottom:"10px",borderRadius:"20px",
        padding:"5px",justifyContent:"space-between",width:"100%"}}>
        <div style={{textAlign:"left",width:"70%"}} onChange={(e)=>{
            console.log(e)
            setInput(e.target.value)}}contentEditable={true}>
            {elem.description}
            
        </div>
        <button onClick={()=>deleteHandler(elem.todo_id)}> Delete</button>
        <button  onClick={()=>saveHandler(elem.todo_id)}> save</button>
        </div>
      )
    })
 }
  </>
  )
}

export default Table