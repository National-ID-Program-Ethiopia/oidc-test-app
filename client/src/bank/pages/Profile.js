import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, setUser } from '../session';
import './Profile.css';

const OCCUPATIONS = [
  ['government_employee', 'Government Employee'],
  ['private_employee', 'Private Employee'],
  ['business_owner', 'Business Owner'],
  ['freelancer', 'Freelancer'],
  ['student', 'Student'],
  ['retired', 'Retired'],
  ['unemployed', 'Unemployed'],
  ['other', 'Other'],
];

const MARITAL_STATUSES = [
  ['single', 'Single'],
  ['married', 'Married'],
  ['divorced', 'Divorced'],
  ['widowed', 'Widowed'],
];

const BANKING_PURPOSES = [
  ['savings', 'Savings'],
  ['business', 'Business'],
  ['investment', 'Investment'],
  ['loan', 'Loan Services'],
  ['international', 'International Transactions'],
  ['other', 'Other'],
];

const UPLOADS = [
  { id: 'signature_upload', label: 'Digital Signature Upload *', prompt: 'Click to upload signature (JPG, PNG, or PDF)', required: true },
  { id: 'id_document_upload', label: 'ID Document Upload *', prompt: 'Click to upload ID document (JPG, PNG, or PDF)', required: true },
  { id: 'proof_of_address', label: 'Proof of Address Upload', prompt: 'Click to upload proof of address (JPG, PNG, or PDF)', required: false },
];

// KYC text/select fields that are saved with the stored user (uploads are not persisted).
const KYC_FIELDS = [
  'mothers_name', 'fathers_name', 'occupation', 'employer', 'monthly_income',
  'marital_status', 'emergency_contact', 'emergency_phone', 'banking_purpose', 'additional_notes',
];

const FileUpload = ({ id, label, prompt, required }) => {
  const [fileName, setFileName] = useState('');

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="file-upload">
        <input
          type="file"
          id={id}
          name={id}
          accept="image/*,.pdf"
          required={required}
          onChange={(e) => setFileName(e.target.files[0]?.name || '')}
        />
        <label
          htmlFor={id}
          className="file-upload-label"
          style={fileName ? { background: '#d4edda', color: '#155724' } : undefined}
        >
          <i className={`fas ${fileName ? 'fa-check' : 'fa-upload'}`} /> {fileName || prompt}
        </label>
      </div>
    </div>
  );
};

const Options = ({ placeholder, options }) => (
  <>
    <option value="">{placeholder}</option>
    {options.map(([value, label]) => (
      <option key={value} value={value}>{label}</option>
    ))}
  </>
);

const Profile = () => {
  const navigate = useNavigate();
  const user = getUser() || {};
  const kyc = user.kyc || {};
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  const name = user.name || 'John Doe';
  const email = user.email || 'john.doe@example.com';
  const phone = user.phone || '+251 91 123 4567';
  const gender = user.gender || 'Male';
  const birthdate = user.birthdate || '1990-01-01';
  const residenceStatus = user.nationality || 'Ethiopian';
  const address = user.address || 'Addis Ababa, Ethiopia';
  const picture = user.picture || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const updatedKyc = Object.fromEntries(KYC_FIELDS.map((field) => [field, form.get(field) || '']));

    setSaving(true);
    // Simulated save, as in the original template.
    saveTimer.current = setTimeout(() => {
      setUser({ ...(getUser() || {}), kyc: updatedKyc });
      setSaving(false);
      alert('Profile updated successfully!');
    }, 2000);
  };

  return (
    <div className="cb-profile">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-university" />
            <h1>Capital Bank</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/dashboard" className="back-btn">
              <i className="fas fa-arrow-left" />{' '}
              Back to Dashboard
            </Link>
            <Link to="/logout" className="logout-btn">
              <i className="fas fa-sign-out-alt" />{' '}
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="profile-header">
          <div className="profile-avatar">
            {picture ? (
              <img
                src={picture}
                alt="Profile"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <i className="fas fa-user" />
            )}
          </div>
          <h2>{name}</h2>
          <p>Manage your personal information and account details</p>
        </div>

        <form id="profileForm" onSubmit={handleSubmit}>
          {/* Fayda Verified Data Section */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="fas fa-shield-alt" />{' '}
              Fayda Verified Information
              <span className="verified-badge">
                <i className="fas fa-check-circle" />{' '}
                Verified
              </span>
            </h3>
            <div className="security-notice">
              <i className="fas fa-info-circle" />{' '}
              This information has been verified through Fayda and cannot be modified directly.
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={name} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={email} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={phone} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" name="gender" value={gender} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="birthdate">Date of Birth</label>
                <input type="text" id="birthdate" name="birthdate" value={birthdate} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <input type="text" id="nationality" name="nationality" value={residenceStatus} readOnly />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="address">Address</label>
                <textarea id="address" name="address" value={address} readOnly />
              </div>
            </div>
          </div>

          {/* Additional KYC Fields Section */}
          <div className="kyc-section">
            <h3 className="section-title">
              <i className="fas fa-user-check" />{' '}
              Additional KYC Information
            </h3>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Please provide additional information required for banking services.
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="mothers_name">Mother's Name *</label>
                <input type="text" id="mothers_name" name="mothers_name" defaultValue={kyc.mothers_name} required />
              </div>
              <div className="form-group">
                <label htmlFor="fathers_name">Father's Name *</label>
                <input type="text" id="fathers_name" name="fathers_name" defaultValue={kyc.fathers_name} required />
              </div>
              <div className="form-group">
                <label htmlFor="occupation">Occupation *</label>
                <select id="occupation" name="occupation" defaultValue={kyc.occupation || ''} required>
                  <Options placeholder="Select Occupation" options={OCCUPATIONS} />
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="employer">Employer/Company Name</label>
                <input type="text" id="employer" name="employer" defaultValue={kyc.employer} />
              </div>
              <div className="form-group">
                <label htmlFor="monthly_income">Monthly Income (ETB)</label>
                <input type="number" id="monthly_income" name="monthly_income" min="0" defaultValue={kyc.monthly_income} />
              </div>
              <div className="form-group">
                <label htmlFor="marital_status">Marital Status</label>
                <select id="marital_status" name="marital_status" defaultValue={kyc.marital_status || ''}>
                  <Options placeholder="Select Status" options={MARITAL_STATUSES} />
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="emergency_contact">Emergency Contact Name</label>
                <input type="text" id="emergency_contact" name="emergency_contact" defaultValue={kyc.emergency_contact} />
              </div>
              <div className="form-group">
                <label htmlFor="emergency_phone">Emergency Contact Phone</label>
                <input type="tel" id="emergency_phone" name="emergency_phone" defaultValue={kyc.emergency_phone} />
              </div>
              {UPLOADS.map((upload) => (
                <FileUpload key={upload.id} {...upload} />
              ))}
              <div className="form-group">
                <label htmlFor="banking_purpose">Primary Banking Purpose</label>
                <select id="banking_purpose" name="banking_purpose" defaultValue={kyc.banking_purpose || ''}>
                  <Options placeholder="Select Purpose" options={BANKING_PURPOSES} />
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="additional_notes">Additional Information</label>
                <textarea
                  id="additional_notes"
                  name="additional_notes"
                  defaultValue={kyc.additional_notes}
                  placeholder="Any additional information you'd like to provide..."
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              <i className="fas fa-times" />{' '}
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin" /> Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save" />{' '}
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
