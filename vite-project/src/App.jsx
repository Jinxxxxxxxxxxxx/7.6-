import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then(res => res.json()).then(json=>{
    const list = json.slice(0,10)
    const posts = Promise.all(list.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(res => res.json())))
    return posts
  }).then(posts => setPosts(posts))
  },[])
  const now = Math.floor(new Date().getTime()/1000);
  return (
    <div className="App">
      <ul id="ls">
        {posts.map((post,index) => <li key={index}>
          <span className="score">{post.score}</span>
          <span className="title">
            <a className="titleLink" href={post.url}>{post.title}</a>
            <span className="host">{post.url ===undefined ? null : `(${new URL(post.url).host})`}</span>
          </span>
          <br />
          <span className="meta">
            <span>by </span>
            <a href="#" className="byAuthor">{post.by} </a>
            <span>{`${now-post.time} seconds ago | `}</span>
            <a href="#" className="comments">{post.kids ===undefined ? `0 comment` : `${post.kids.length} comments`}</a>
          </span>
        </li>)}
      </ul>
      {

      }
    </div>
  )
}

export default App
