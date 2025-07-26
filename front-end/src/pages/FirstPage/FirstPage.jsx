
import React, { useRef } from 'react'
import ButtonFirstPage from '../../components/ButtonFirstPage/ButtonFirstPage'
import './FirstPage.css'

const FirstPage = () => {
  return (
    <div className="container_first_page">
      <div className='container_first_page_content'>
            <div className='container_title'>
                <h1>Aprenda<br></br>grafos!</h1>
            </div>
            <div className='container_buttons'>
                <ButtonFirstPage children = "BFS" link="/bfs"/>
                <ButtonFirstPage children = "DFS" link="/dfs"/>
                <ButtonFirstPage children = "Dijkstra" link="/dijkstra"/>
                <ButtonFirstPage children = "Prim" link="/prim"/>
            </div>
            <div className='container_tutorial'>
                <ButtonFirstPage children = "Tutorial" id = "button_tutorial"/>
            </div>
        </div>
    </div>
  )
}

export default FirstPage