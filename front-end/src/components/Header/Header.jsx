import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="container_header">
      <nav className="container_header_nav">
        <ul className='container_header_nav_ul'>
          <li>
            <a href="/" id="logo">Aprenda<br></br>Grafos!</a>
          </li>
          <li>
            <a href="/bfs">BFS</a>
          </li>
          <li>
            <a href="/dfs">DFS</a>
          </li>
          <li>
            <a href="/dijkstra">Dijkstra</a>
          </li>
          <li>
            <a href="/prim">Prim</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header