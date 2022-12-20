import React, { useRef,useState } from 'react'
import './CRUD.css'

function CRUD(){
    const list=[
        {
            id:1,
            name:"Kiran Sir",
            address:"Pune",
            clg:"Pune University"
            
        },
        {
            id:2,
            name:"Tushar More",
            address:"Hiradgaon",
            clg:"PUCSD"
        },
        {
            id:3,
            name:"Vishal More",
            address:"Hiradgaon",
            clg:"SCSM"
        },
        {
            id:4,
            name:"Yuvraj Bankar",
            address:"Hiradgaon",
            clg:"MJS"
        },
    ];
    const [ lists,setList] =useState(list)
    const [updateState,setUpdateState] = useState(-1)
    return(
       <div className='crud'>
        <div>
          <AddList setList = {setList}/>
          <form onSubmit={handleSubmit}>
        <table>
            {
                lists.map((current)=>(
                    updateState === current.id ?<EditList current={current} lists={lists} setList={setList}/>:
                    <tr>
                    <td>{current.name}</td>
                    <td>{current.address}</td>
                    <td>{current.clg}</td>
                    <td>
                    <button className='edit' onClick={()=> handleEdit(current.id)}>Edit</button>
                    <button className='delete' type='button' onClick={()=> handleDelete(current.id)}>Delete</button>
                    </td>
                    </tr>
                ))
            }
        </table>
        </form>
        </div>
       </div>
    )
    function handleEdit(id){
 setUpdateState(id) 
    }
    function handleDelete(id){
        const newlist = lists.filter((li)=>li.id !== id)
        setList(newlist)
    }

    function handleSubmit(event){
       event.preventDefault()
        const name = event.target.elements.name.value
        const address = event.target.elements.address.value
        const clg = event.target.elements.clg.value
        const newlist =  lists.map((li) =>(
            li.id === updateState ? {...li,name:name,address:address,clg:clg} :li 
        ))
        setList(newlist)
        setUpdateState(-1)
    }
}
// ........... 22.30 ............ 
function EditList({current, lists , setList}){
 function handInputname(event){
     
        const value = event.target.value;
        const newlist =  lists.map((li) =>(
            li.id === current.id ? {...li,name:value} :li 
        ))
        setList(newlist)
 }
 function handInputaddress(event){
    const value = event.target.value;
    const newlist =  lists.map((li) =>(
        li.id === current.id ? {...li,address:value} :li 
    ))
    setList(newlist)
}
function handInputclg(event){
    const value = event.target.value;
    const newlist =  lists.map((li) =>(
        li.id === current.id ? {...li,clg:value} :li 
    ))
    setList(newlist)
}
 return(
   <tr>
           <td><input type="text" onChange={handInputname} name='name' value={current.name} /></td>
           <td><input type="text" onChange={handInputaddress} name='address' value={current.address} /></td>
           <td><input type="text" onChange={handInputclg} name='clg' value={current.clg} /></td>
           <td><button type='submit'>Update</button></td>
   </tr>
    )
}

function AddList({setList}){
           
       const nameRef = useRef()
       const addressRef = useRef()
       const clgRef = useRef()

       function handleSubmit(event){
        event.preventDefault();
        const name = event.target.elements.name.value;
        const address = event.target.elements.address.value;
        const clg = event.target.elements.clg.value;
        const newlist = {
            id:5,
            name,
            address,
            clg
        }
         setList((prevList)=>{
            return prevList.concat(newlist)
         })
         nameRef.current.value = ""
         addressRef.current.value=""
         clgRef.current.value = ""
         
       }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Full Name" ref={nameRef}/>
            <input type="text" name="address" placeholder="Enter ADD" ref={addressRef} />
            <input type="text" name="clg" placeholder="Enter Clg Name" ref={clgRef}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default CRUD;