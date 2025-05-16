import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Register.css';

const RegisterPage = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    role: 'student',
    name: '', email: '', phone: '', password: '', gender: '', dob: '',
    address: { full: '', city: '', state: '', pincode: '' },
    education: '', class: '', stream: '',
    teacher_meta: {
      teach_mode: '', online_price: '', home_price: '',
      availability: '', infrastructure: '', subject: '', university: '',
      aadhar_card: '', pan_card: '', demo_video_url: ''
    },
    student_meta: { board: '', wallet: 0, referral_code: '' }
  });

  const [files, setFiles] = useState({
    profile_pic: null,
    aadhar_card: null,
    pan_card: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get('role');
    if (role === 'teacher' || role === 'student') {
      setFormData(prev => ({ ...prev, role }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.startsWith('teacher_meta.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({ ...prev, teacher_meta: { ...prev.teacher_meta, [key]: value } }));
    } else if (name.startsWith('student_meta.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({ ...prev, student_meta: { ...prev.student_meta, [key]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();

      for (const key in formData) {
        if (typeof formData[key] === 'object' && formData[key] !== null) {
          formPayload.append(key, JSON.stringify(formData[key]));
        } else {
          formPayload.append(key, formData[key]);
        }
      }

      if (files.profile_pic) formPayload.append('profile_pic', files.profile_pic);
      if (files.aadhar_card) formPayload.append('aadhar_card', files.aadhar_card);
      if (files.pan_card) formPayload.append('pan_card', files.pan_card);

      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: formPayload
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2 className="full-width">Register as {formData.role}</h2>

        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

        <label className="full-width">Profile Picture</label>
        <input
          type="file"
          className="full-width"
          onChange={(e) => setFiles(prev => ({ ...prev, profile_pic: e.target.files[0] }))}
        />

        <h4 className="full-width">Address</h4>

        <label>Full Address</label>
        <input type="text" name="address.full" value={formData.address.full} onChange={handleChange} />

        <label>City</label>
        <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} />

        <label>State</label>
        <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} />

        <label>Pincode</label>
        <input type="text" name="address.pincode" value={formData.address.pincode} onChange={handleChange} />

        {formData.role === 'student' && (
          <>
            <h4 className="full-width">Student Details</h4>

            <label>Education</label>
            <input type="text" name="education" value={formData.education} onChange={handleChange} />

            <label>Class</label>
            <input type="text" name="class" value={formData.class} onChange={handleChange} />

            <label>Stream</label>
            <input type="text" name="stream" value={formData.stream} onChange={handleChange} />

            <label>Board</label>
            <input type="text" name="student_meta.board" value={formData.student_meta.board} onChange={handleChange} />

            <label>Referral Code</label>
            <input type="text" name="student_meta.referral_code" value={formData.student_meta.referral_code} onChange={handleChange} />
          </>
        )}

        {formData.role === 'teacher' && (
          <>
            <h4 className="full-width">Teacher Details</h4>

            <label>Teaching Mode</label>
            <input type="text" name="teacher_meta.teach_mode" value={formData.teacher_meta.teach_mode} onChange={handleChange} />

            <label>Online Price</label>
            <input type="text" name="teacher_meta.online_price" value={formData.teacher_meta.online_price} onChange={handleChange} />

            <label>Home Price</label>
            <input type="text" name="teacher_meta.home_price" value={formData.teacher_meta.home_price} onChange={handleChange} />

            <label>Availability</label>
            <input type="text" name="teacher_meta.availability" value={formData.teacher_meta.availability} onChange={handleChange} />

            <label>Subject</label>
            <input type="text" name="teacher_meta.subject" value={formData.teacher_meta.subject} onChange={handleChange} />

            <label>University</label>
            <input type="text" name="teacher_meta.university" value={formData.teacher_meta.university} onChange={handleChange} />

            <label>Demo Video URL</label>
            <input type="text" name="teacher_meta.demo_video_url" value={formData.teacher_meta.demo_video_url} onChange={handleChange} />

            <label>Infrastructure</label>
            <input type="text" name="teacher_meta.infrastructure" value={formData.teacher_meta.infrastructure} onChange={handleChange} />

            <label className="full-width">Aadhar Card</label>
            <input
              type="file"
              className="full-width"
              onChange={(e) => setFiles(prev => ({ ...prev, aadhar_card: e.target.files[0] }))}
            />

            <label className="full-width">PAN Card</label>
            <input
              type="file"
              className="full-width"
              onChange={(e) => setFiles(prev => ({ ...prev, pan_card: e.target.files[0] }))}
            />
          </>
        )}

        <button type="submit" className="full-width">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
