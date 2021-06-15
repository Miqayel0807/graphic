import { useState, useRef, useEffect } from "react";
import  PropTypes from "prop-types";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from './header.module.css'
import { propTypes } from "react-bootstrap/esm/Image";



const Header = (props) => {
    const [data, setData] = useState({
        first: '',
        second: '',
        third: '',
        fourth: '',
        companyName: ''
    })

    const ref = useRef(null)
    useEffect(() => {
        ref.current.focus()
    }, [])
    const choosenCompany = (name) => {
        setData({
            ...data,
            companyName: name
        })
    }

    const inputValues = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        })
    }

    const calcFunc = (name) => {
        if (data.companyName && (data.first || data.second || data.third || data.fourth)) {
            props.yearlyData(name)
            props.inputData([data.first, data.second, data.third, data.fourth])
        }


        setData({
            ...data,
            first: '',
            second: '',
            third: '',
            fourth: '',
            companyName: ''

        })
    }
    const names = props.names.map(index => {
        return (
            <MenuItem key={index} onClick={() => choosenCompany(index)} value={index}>{index}</MenuItem>
        )
    })
    return (
        <>
            <div className={styles.header}>
                <div>
                    <FormControl variant="outlined" >
                        <InputLabel
                            className={styles.dropDownLabel}
                            id="demo-simple-select-outlined-label">
                            Company
                        </InputLabel>
                        <Select
                            className={styles.dropDown}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Company"
                        >
                            {names}
                        </Select>
                    </FormControl>
                </div>

                <div className={styles.labels}>
                    <label >1st Quarte
                        <input
                            className={styles.inputStyle}
                            value={data.first} name={'first'}
                            onChange={inputValues}
                            type="number"
                            ref={ref}
                        />
                    </label>

                    <label>
                        2nd Quarte
                        <input
                            className={styles.inputStyle}
                            value={data.second}
                            name={'second'}
                            onChange={inputValues}
                            type="number" />
                    </label>

                    <label htmlFor="">
                        3rd Quarte
                        <input
                            className={styles.inputStyle}
                            value={data.third}
                            name={'third'}
                            onChange={inputValues}
                            type="number" />
                    </label>

                    <label>
                        4th Quarte
                        <input
                            className={styles.inputStyle}
                            value={data.fourth}
                            name={'fourth'}
                            onChange={inputValues}
                            type="number" />
                    </label>

                    <button
                        className={styles.button}
                        onClick={() => calcFunc(data.companyName)}>
                        Calc
                    </button>
                </div>
            </div>

        </>
    )
}
 Header.propTypes={
     yearlyData:PropTypes.func.isRequired,
     inputData:PropTypes.func.isRequired,
     names:PropTypes.array.isRequired

 }


export default Header