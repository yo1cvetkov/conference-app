import React from 'react'
import "./user.css"

function User(props) {
    const {id, name, desc, dep, del} = props;
  return (
    <div className='user__div'>
      <h3>{name}</h3>
      <p>{desc}</p>
      <p>{dep}</p>
      <p>{del}</p>
    </div>
  )
}

export default User