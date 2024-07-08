import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { changePasswordApi } from "../apis/Api";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!oldPassword) {
      setOldPasswordError("Old password is required.");
      isValid = false;
    } else {
      setOldPasswordError("");
    }

    if (!newPassword) {
      setNewPasswordError("New password is required.");
      isValid = false;
    } else {
      setNewPasswordError("");
    }

    if (!isValid) return;

    const userId = JSON.parse(localStorage.getItem('user'))._id;

    try {
      const response = await changePasswordApi(userId, { oldPassword, newPassword });

      if (response.data.success) {
        toast.success("Password changed successfully!");
        setOldPassword('');
        setNewPassword('');
      } else {
        toast.error(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      toast.error("An error occurred while changing the password.");
    }
  };

  return (
    <div className='po'>
         <h1 style={{ fontSize: "20px", textAlign:'left',marginTop:'8%',marginBottom:'2%'}} className="profile-header">
             Change Password
            </h1>
      <form onSubmit={handleChangePassword} className="profile-form">
        <div className="form-group">
        <label>Current Password</label>
          <input
            type="password"
           
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
           
          />
          {oldPasswordError && (
            <div className="text-red-500 text-sm mt-1">{oldPasswordError}</div>
          )}
        </div>
        <div className="form-group">
          <label >
            New Password
          </label>
          <input
            type="password"
            
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
         
          />
          {newPasswordError && (
            <div className="text-red-500 text-sm mt-1">{newPasswordError}</div>
          )}
        </div>
        <div className="btn-group" style={{marginTop:'0',marginBottom:'3%'}}>
          <button
            type="submit"
            className="save-button"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
