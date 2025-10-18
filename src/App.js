import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import {useState,useEffect} from'react'
import AddItem from './AddItem';
import SearchItem from './SearchItem';
function App() {
  
  const [items,setItems]=useState([]);

  const [newItem,setnewItem]=useState('')
  const [search,setSearch]=useState('')


  useEffect(()=>{
    const storeItems=JSON.parse(localStorage.getItem("list"))
    if(storeItems){
      setItems(storeItems)
    }
  },[])

  
      const handleCheck=(id)=>{
          const listItems=items.map((item)=>item.id===id?{...item,checked:!item.checked}:item)
          setItems(listItems)
          localStorage.setItem("list",JSON.stringify(listItems))
        }  


      const addItems=(item)=>{
        const id=items.length?items[items.length-1].id+1:1
        const mynewItem={
          id,checked:false,item:item
        }
        setItems([...items,mynewItem])
      }
  
      const handledelete=(id)=>{
          const listItems=items.filter((item)=>item.id!==id)
          setItems(listItems)
          localStorage.setItem("list",JSON.stringify(listItems))
        }

      const handleSubmit=(e)=>{
          e.preventDefault()
          if(!newItem) return;
          addItems(newItem)
          setnewItem('')

      }

  return (
    <div className="App">
      <Header title='Kamal ToDo List'/>
      <AddItem
        newItem={newItem}
        setnewItem={setnewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handledelete={handledelete}
      />
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
