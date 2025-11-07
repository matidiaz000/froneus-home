import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import moment from "moment";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { ContactsData } from '../../mocks/Contacts.data';
import { CampaignsData } from './../../mocks/Campaigns.data';

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="mx-3">
      <h1>Campañas</h1>
      {CampaignsData.map((item, index) => (
        <div className="mb-5" key={item.name}>
          <Panel header={item.name} toggleable>
            <div className='flex justify-content-end align-items-center'>
              <Button label="Editar" outlined onClick={() => navigate(`/campana/${index}`)}/>
              <span className='ml-4'>Cantidad de personas a llamar: {item.contacts.length}</span>
            </div>
            <div className="flex flex-row flex-wrap">
              {item.campaign.map((item) => (
                <div key={item.name} className="flex align-items-center justify-content-center m-3">
                  <Card title={item.name} className='w-16rem'>
                    <p>Creación: {moment(item.create).format('DD/MM/YY h:mm')}</p>
                    <p>Inicio: {moment(item.initial).format('DD/MM/YY h:mm')}</p>
                    <p className='m-0'>Grabar: {item.record ? "SI" : "NO"}</p>
                  </Card>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      ))}
      <Button label="Nueva campaña" onClick={() => navigate(`/campana`)}/>
      <h1>Contactos</h1>
      <div className="flex flex-row flex-wrap">
        {ContactsData.map((item, index) => (
          <div className="flex align-items-center justify-content-center m-3">
            <Card title={item.name} key={item.name} className='w-16rem'>
              <p>Telefono: {item.phone}</p>
              <Button onClick={() => navigate(`/contacto/${index}`)} label="Editar" className="mt-3" size="small" />
							<Button onClick={() => navigate(`/`)} label="Eliminar" className="ml-3" size="small" severity="danger" outlined />
            </Card>
          </div>
        ))}
      </div>
      <Button label="Nuevo contacto" onClick={() => navigate(`/contacto`)} className='mb-5'/>
    </div>
  );
};

export default Home;