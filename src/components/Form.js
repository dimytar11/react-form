import styles from "./Form.module.css";
import { useState } from "react";
import useInput from "../hooks/use-input";

const Form = (props) => {
  //js destructuring feature is used to extract the values and store them to new variables
  let {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  let {
    value: enteredAge,
    hasError: ageInputHasError,
    isValid: enteredAgeIsValid,
    valueChangeHandler: ageChangeHandler,
    inputBlurHandler: ageBlurHandler,
    reset: resetAgeInput,
  } = useInput((value) => value >= 18);

  let {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "");

  const [gender, setGender] = useState("Other");
  const handleGenderSelect = (event) => {
    setGender(event.target.value);
  };

  let {
    value: enteredPhone,
    hasError: phoneInputHasError,
    isValid: enteredPhoneIsValid,
    valueChangeHandler: phoneChangedHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput((value) => value.trim() !== "");

  let {
    value: enteredDate,
    hasError: dateInputHasError,
    isValid: enteredDateIsValid,
    valueChangeHandler: dateChangedHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput((value) => value.trim() !== "");

  let {
    value: enteredCountry,
    hasError: countryInputHasError,
    isValid: enteredCountryIsValid,
    valueChangeHandler: countryChangedHandler,
    inputBlurHandler: countryBlurHandler,
    reset: resetCountryInput,
  } = useInput((value) => value.trim() !== "");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  let {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length > 6);

  const sendData = (userInfo) => {
    fetch("https://eo45qenxpc7qs2m.m.pipedream.net", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //function that is triggered when the form is submitted
  const formSubmissionHandler = (event) => {
    let isFormValid = true;
    event.preventDefault();

    if (!enteredNameIsValid) {
      nameInputHasError = true;
      nameBlurHandler(true);
      isFormValid = false;
    }

    if (!enteredAgeIsValid) {
      ageInputHasError = true;
      ageBlurHandler(true);
      isFormValid = false;
    }

    if (!enteredEmailIsValid) {
      emailInputHasError = true;
      emailBlurHandler(true);
      isFormValid = false;
    }

    if (!enteredPhoneIsValid) {
      phoneInputHasError = true;
      phoneBlurHandler(true);
      isFormValid = false;
    }

    if (!enteredDateIsValid) {
      dateInputHasError = true;
      dateBlurHandler(true);
      isFormValid = false;
    }

    if (!enteredCountryIsValid) {
      countryInputHasError = true;
      countryBlurHandler(true);
      isFormValid = false;
    }

    if (!enteredPasswordIsValid) {
      passwordInputHasError = true;
      passwordBlurHandler(true);
      isFormValid = false;
    }
    //if the form is not valid POST request does not send 
    if (!isFormValid) {
      return;
    }

    const userInfo = {
      name: enteredName,
      age: enteredAge,
      email: enteredEmail,
      gender,
      phoneNumber: enteredPhone,
      birthDay: enteredDate,
      country: enteredCountry,
      password: enteredPassword,
      message: "",
    };
    //if form is valid then send POST request with the user info
    sendData(userInfo);
    //reset the form after submit
    resetNameInput();
    resetAgeInput();
    resetEmailInput();
    resetPhoneInput();
    resetDateInput();
    resetCountryInput();
    resetPasswordInput();
  };

  return (
    <div className={styles.mainWrapper}>
      <h3 className={styles.title}>Please fill in your information </h3>
      <form className={styles.formWrapper} onSubmit={formSubmissionHandler}>
        <div className={styles.form}>
          <div className={styles.left}>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="text"
                placeholder="Full Name"
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
              />
              {nameInputHasError && (
                <p className={styles.invalidFieldText}>
                  Name must not be empty.
                </p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="number"
                placeholder="Age"
                onChange={ageChangeHandler}
                onBlur={ageBlurHandler}
                value={enteredAge}
              />
              {ageInputHasError && (
                <p className={styles.invalidFieldText}>
                  Age must not be empty neither less than 18.
                </p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={enteredEmail}
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
              />
              {emailInputHasError && (
                <p className={styles.invalidFieldText}>
                  Email must not be empty.
                </p>
              )}
            </div>
            <div className={styles.inputWrapperBlock}>
              <input
                name="gender"
                id="male"
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={handleGenderSelect}
              />
              <label>Male</label>
              <input
                name="gender"
                id="female"
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={handleGenderSelect}
              />
              <label>Female</label>
              <input
                name="gender"
                id="other"
                type="radio"
                value="Other"
                checked={gender === "Other"}
                onChange={handleGenderSelect}
              />
              <label>Other</label>
            </div>

            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="number"
                placeholder="Phone Number"
                value={enteredPhone}
                onChange={phoneChangedHandler}
                onBlur={phoneBlurHandler}
              />
              {phoneInputHasError && (
                <p className={styles.invalidFieldText}>
                  Phone number must not be empty.
                </p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <label>Date of Birth</label>
              <input
                className={styles.input}
                type="date"
                value={enteredDate}
                onChange={dateChangedHandler}
                onBlur={dateBlurHandler}
              />
              {dateInputHasError && (
                <p className={styles.invalidFieldText}>
                  Date must not be empty.
                </p>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.inputWrapper}>
              <select
                className={styles.input}
                name="country"
                value={enteredCountry}
                onChange={countryChangedHandler}
                onBlur={countryBlurHandler}
              >
                <option value="" defaultValue hidden>
                  Choose A Country
                </option>
                <option value="bg">Bulgaria</option>
                <option value="uk">United Kingdom</option>
                <option value="ge">Germany</option>
                <option value="fr">France</option>
              </select>
              {countryInputHasError && (
                <p className={styles.invalidFieldText}>
                  Country must be selected.
                </p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Password"
                className={styles.input}
                type={passwordShown ? "text" : "password"}
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
              />
              {passwordInputHasError && (
                <p className={styles.invalidFieldText}>
                  Password must not be empty neither less than 6 symbols.
                </p>
              )}
            </div>
            <div className={styles.inputBlock}>
              <input
                className={styles.checkbox}
                type="checkbox"
                onChange={togglePassword}
              />
              {passwordShown ? "Hide Password" : "Show Password"}
            </div>

            <div className={styles.inputWrapper}>
              <textarea
                placeholder="Enter Your Message"
                className={styles.input}
                cols="30"
                rows="8"
              ></textarea>
            </div>
          </div>
        </div>
        <p className={styles.defaultText}>*All fields are required</p>
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
