import React, { useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("Sylvia");
  const [lastName, setLastName] = useState("Woods");
  const [submittedData, setSubmittedData] = useState([]);   // upon first render this submittedData state is an empty object
  const [errors, setErrors] = useState([]);  // For us to add some data input validation we can create another state, error. that will be changed according to what the user submits (if they try to submit a name without a first name)

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }


  function handleSubmit(event) {

    event.preventDefault();   // We are preventing the form from defaulting to refreshing the page upon submit

    if (firstName.length > 0 ) {  // We add this conditional to check whether the user has submitted a valid first name (whether the length of the string is larger than 0)

    const formData = {         // Upon form submission, first and last name are stored inside an object using the values stored in state
      firstName : firstName,
      lastName: lastName
    };

    const dataArray = [...submittedData, formData]  // we create a new object, spreading the contents of the submittedData(it is empty here but later on in other applications will contain other data) and the data that was just submitted

    setSubmittedData(dataArray)   // the state of the submitted data will then be updated to this new object that contains the contents of the previous state and the newly submitted data

    setFirstName("");   // when the form is submitted, we want the input fields to clear so we set state for both the first and last name to empty strings
    setLastName("");
    setErrors([]);    // This resets the state of the error in case someone tried to submit the form without a first name initially and fixed it after
  }

  else{
    setErrors(["First name is required!"]);   // if the condiitonal isnt met the current state of the error is set to this error message
  }

  }

  // everytime this component is rendered it will create a div for every object of data in the current state of the data array, data in this map method is every individual object(first and last name) and the index is whichever index that object is located in in the submittedData state array
  const listOfSubmissions = submittedData.map((data, index) => {
    return (
        <div key ={index}>
            {data.firstName} {data.lastName}
        </div>
    );
  })

  const errorMessage = errors.map((error, index) => {  // This will display the error message that is inside the current state of errors, a ternary can be placed inside the main JSX to display this if an error message exists within state
    return(
      <p key={index} style ={{color:"red"}} >
        {error}
      </p>
    )
  })


// in order for us to submit our controlled form, we need to add an onSubmit event handler to our form
  return (
    <div>

    <form onSubmit = {handleSubmit}>
      <input type="text" onChange={handleFirstNameChange} value={firstName} />
      <input type="text" onChange={handleLastNameChange} value={lastName} />
      <button type="submit">Submit</button>
    </form>

    {errors.length > 0 ? errorMessage : null}

    <h3>Submissions</h3>
    {listOfSubmissions}

    </div>
  );
}

export default Form;
