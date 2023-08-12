import React, { Component } from 'react'
import loading from './assets/spinner.gif'
const Spinner = ()=> {
    return (
      <div className="text-center">
            <img src={loading} alt="load"/>
      </div>
    )
}
export default Spinner