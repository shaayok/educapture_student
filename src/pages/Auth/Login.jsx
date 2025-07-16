import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from '../../hooks/useAuth';
import { Box, Modal, Typography } from '@mui/material';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, acceptNda, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [ndaModal, setNdaModal] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { ndaSigned } = await login({ email, password });
      //setShowProposalModal(true);
      setNdaModal(ndaSigned === "No");
      if (ndaSigned === "Yes")
        navigate('/dashboard', { replace: true });
    } catch (e) {
      console.log(e);

      setError('Ongeldige gebruikersnaam of wachtwoord.');
    }
  };

  const handleNdaAccept = async e => {
    e.preventDefault();
    setError('');
    try {
      await acceptNda();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.log(error);

      setError('Ongeldige gebruikersnaam of wachtwoord.');
    }
  }

  const handleNdaReject = () => {
    logout();
    setNdaModal(false);
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 style={{ "fontWeight": "700px" }}><strong>Inloggen bij EduCapture </strong>
          </h2>
          {error && <div className={styles.error}>{error}</div>}
          <label>
            E-mailadres
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Wachtwoord
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Bezig…' : 'Log in'}
          </button>
        </form>

      </div>

      <Modal open={ndaModal} onClose={() => { }} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form className={styles.form} onSubmit={handleNdaAccept}>
          <Box sx={{ width: "24rem", background: "#fff" }}>
            <Typography id="nda-modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Geheimhoudingsovereenkomst
            </Typography>
            <Typography id="nda-modal-modal-description" sx={{ mt: 2 }}>
              Door verder te gaan, ga je ermee akkoord dat je alle vertrouwelijke informatie verkregen via deze app niet zult delen met derden en uitsluitend gebruikt voor het beoogde doel.
            </Typography>
            <br />
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
              <button onClick={handleNdaAccept}>
                {loading ? 'Bezig…' : 'Akkoord'}
              </button>
              <button onClick={handleNdaReject}>Niet akkoord</button>
            </div>
          </Box>
        </form>
      </Modal>
    </>
  );
}