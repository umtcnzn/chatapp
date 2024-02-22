import React from 'react'

function GenderPicker({onCheckboxChange,selectedGender}:{onCheckboxChange:(gender:string) => void,selectedGender:string}) {
  return (
    <div className='flex pt-2'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male"? "selected":""}`}>
                <span className='label-text'>Male</span>
                <input type='checkbox' checked={selectedGender === "male"} onChange={() => onCheckboxChange("male")} className='checkbox border-slate-900'/>
            </label>
        </div>

        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "female"? "selected":""}`}>
                <span className='label-text'>Female</span>
                <input type='checkbox' checked={selectedGender === "female"} onChange={() => onCheckboxChange("female")} className='checkbox border-slate-900'/>
            </label>
        </div>

    </div>
  )
}

export default GenderPicker;