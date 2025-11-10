import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import CampaignComponent from './../components/campaigns';
import ContactsComponent from './../components/contacts';

const Home = () => {
  let navigate = useNavigate();

  return (
    <div>
      <div className='flex flex-row justify-content-between align-items-center px-3 mb-3' style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)' }}>
        <h1>Campañas</h1>
        <Button label="Nueva campaña" onClick={() => navigate(`/campana`)}/>
      </div>
      <CampaignComponent />
      <div className='flex flex-row justify-content-between align-items-center p-3 mb-3' style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)' }}>
        <h1>Contactos</h1>
        <Button label="Nuevo contacto" onClick={() => navigate(`/contacto`)}/>
      </div>
      <ContactsComponent />
    </div>
  );
};

export default Home;