import { useState } from 'react';
import './App.css';

export default function App() { 
  const [formValues, setFormValues] = useState({
    day: '',
    month: '',
    year: '',
  });

  const [formErrors, setFormErrors] = useState({
    day: '',
    month: '',
    year: '',
  });

  const [ageResult, setAgeResult] = useState({
    years: '--',
    months: '--',
    days: '--',
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  function validate(values) {
    const errors = {
      day: '',
      month: '',
      year: '',
    };

    const day = Number(values.day);
    const month = Number(values.month);
    const year = Number(values.year);
    const currentYear = new Date().getFullYear();
    
    const today = new Date();
    if (!day) {
      errors.day = 'This field is required';
    } else if (!Number.isInteger(day) || day < 1 || day > 31) {
      errors.day = 'Must be a valid day';
    }

    if (!month) {
      errors.month = 'This field is required';
    } else if (!Number.isInteger(month) || month < 1 || month > 12) {
      errors.month = 'Must be a valid month';
    }

    if (!year) {
      errors.year = 'This field is required';
    } else if (!Number.isInteger(year) || year < 1 || year > currentYear) {
      errors.year = 'Must be a valid year';
    }

    if (!errors.day && !errors.month && !errors.year) {
      const daysInMonth = new Date(year, month, 0).getDate();
      const inputDate = new Date(year, month - 1, day);

      if (day > daysInMonth) {
        errors.day = 'Must be a valid day';
      } else if (inputDate > today) {
        errors.day = 'Date cannot be in the future';
      }
    }
 
    return errors;
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    const nextValues = {
      ...formValues,
      [name]: value,
    };

    setFormValues(nextValues);

    if (hasSubmitted) {
      setFormErrors(validate(nextValues));
    }
  }

  function calculate() {
    setHasSubmitted(true);

    const nextErrors = validate(formValues);
    setFormErrors(nextErrors);

    if (nextErrors.day || nextErrors.month || nextErrors.year) {
      return;
    }

    const day = Number(formValues.day);
    const month = Number(formValues.month);
    const year = Number(formValues.year);

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      const daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += daysInPreviousMonth;
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    setAgeResult({
      years,
      months,
      days,
    });
  }

  return (
    <div className="app">
   
      <div className="all-input-container">
        <div className="input-container">
          <label className={formErrors.day ? 'field-label error' : 'field-label'} htmlFor="day">day</label>
          <input
            className={formErrors.day ? 'field-input error' : 'field-input'}
            type="number"
            min="1"
            max="31"
            id="day"
            name="day"
            placeholder="DD"
            value={formValues.day}
            onChange={handleInputChange}
          />
          {formErrors.day && <p className="error-label">{formErrors.day}</p>}
        </div>
      
        <div className="input-container">
            <label className={formErrors.month ? 'field-label error' : 'field-label'} htmlFor="month">month</label>
            <input
              className={formErrors.month ? 'field-input error' : 'field-input'}
              type="number"
              min="1"
              max="12"
              id="month"
              name="month"
              placeholder="MM"
              value={formValues.month}
              onChange={handleInputChange}
            />
            {formErrors.month && <p className="error-label">{formErrors.month}</p>}
        </div>
        <div className="input-container">
            <label className={formErrors.year ? 'field-label error' : 'field-label'} htmlFor="year">year</label>
            <input
              className={formErrors.year ? 'field-input error' : 'field-input'}
              type="number"
              min="1900"
              max="2100"
              id="year"
              name="year"
              placeholder="YYYY"
              value={formValues.year}
              onChange={handleInputChange}
            />
            {formErrors.year && <p className="error-label">{formErrors.year}</p>}
        </div>
      </div>
        <div className='button-container'>
               <div className="divider"></div>
               <button id="calculate" type="button" 
                    aria-label="Calculate results"
                    onClick={calculate}>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" fill="#854DFF"><g fill="none" stroke="#FFF" strokeWidth="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg>
               </button>
        </div>
      <div className="result">
          <h1><span id="yearspan" className="years">{ageResult.years}</span> years</h1>
          <h2><span id="monthspan" className="months">{ageResult.months}</span> months</h2>
          <h3><span id="dayspan" className="days">{ageResult.days}</span> days</h3>
      </div>
    </div>
  );
}