import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ContactUsForm } from './ContactUsForm';

import './App.css';

class App extends Component {


  public render (){
    return (
      <div className="mt-3">
        <ContactUsForm />
      </div>
    )
  }
}

export default App;