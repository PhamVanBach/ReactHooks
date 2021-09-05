import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.css';
// import TodoList from './components/TodoList';
// import TodoForm from './components/ToidoForm';
import PostFilterForm from './components/PostFilterForm'
import PostList from './components/PostList'
import Pagination from './components/Pagination';
import Clock from './components/Clock';

function App() {
  //states
  //todos
  const [todoList, setTodoList] = useState([
    {id: 1, title: "Have a good day!"},
  ])
  //post list
  const [postsList, setPostLíst] = useState([]) 
  //pagination
  const [pagination, setPagination] = useState({
    _page: 1, 
    _limit: 10, 
    _totalRows: 1,
  })

  const [filters, setFilters] = useState({  
    _limit: 10, 
    _page: 1,
    title_like: '',
  })

  //start todo

  function handleTodoList(todo) {
    console.log(todo)
    const index = todoList.findIndex(x => x.id === todo.id)
    
    if (index < 0) return 

    const newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }
  
  function handleTodoFormSubmit(formValues) {
    //add new current todolist
    const newTodo = {
      id: todoList.length + Math.random() * 2,
      ...formValues,
    }

    const newTodoList = [...todoList]
    newTodoList.push(newTodo)
    setTodoList(newTodoList)
  }

  //end todo
  
  //start postlist

  useEffect(() => {
    async function fetchPosts() {
      try {
        const paramsString = queryString.stringify(filters)
        const requestsUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestsUrl)
        const responseJson = await response.json()
        
        console.log({ responseJson })
  
        const {data, pagination} = responseJson
        setPostLíst(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message )
      }
    }

    console.log('Todo list effect')

    fetchPosts()
  }, [filters]);

  //pagination

  function handlePageChange(newPage) {
    console.log("new page: ", newPage)
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  //search 

  function handleFilterChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1, 
      title_like: newFilters.searchTerm,
    })
  }

  //end postlist

  return (
    <div className="App">
      
      {
        /* 
          <TodoForm onSubmit={handleTodoFormSubmit}/>
        */
      } 
      {
        /*
          <TodoList todos={todoList} onTodoClick={handleTodoList} /> 
        */
      }

      {/* <PostFilterForm onSubmit={handleFilterChange} />
      <PostList posts={postsList}/>
      <Pagination 
        pagination = {pagination}
        onPageChange={handlePageChange}
      />       */
      }

      <Clock />     
    </div>
  );
}

export default App;
