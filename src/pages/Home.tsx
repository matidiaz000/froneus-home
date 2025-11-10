import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import moment from "moment";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleted } from '../reducers/contactsSlice';

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const campaigns: any = useSelector((state: any) => state.campaigns)
  const contacts: any = useSelector((state: any) => state.contacts)

  const handleDelete = (id: any) => {
    dispatch(deleted({ id: id }))
    navigate(`/`)
  }

  return (
    <div>
      <div className='flex flex-row justify-content-between align-items-center px-3 mb-3' style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)' }}>
        <h1>Campañas</h1>
        <Button label="Nueva campaña" onClick={() => navigate(`/campana`)}/>
      </div>
      <div className='m-3'>
        {campaigns.map((item: any, index: any) => (
          <div className="mb-5" key={item.id}>
            <Panel header={item.name} toggleable>
              <div className='flex justify-content-end align-items-center mb-3'>
                <Button label="Editar" outlined onClick={() => navigate(`/campana/${index}`)}/>
                <span className='ml-4'>Cantidad de personas a llamar: {item.contacts.length}</span>
              </div>
              <div className="flex flex-row flex-wrap">
                {item.campaign.map((item: any) => (
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
      </div>
      <div className='flex flex-row justify-content-between align-items-center p-3 mb-3' style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)' }}>
        <h1>Contactos</h1>
        <Button label="Nuevo contacto" onClick={() => navigate(`/contacto`)}/>
      </div>
      <div className="flex flex-row flex-wrap mb-5">
        {contacts.map((item: any) => (
          <div key={item.name} className="flex align-items-center justify-content-center m-3">
            <Card title={item.name} className='w-16rem'>
              <p>Telefono: {item.phone}</p>
							<Button onClick={() => handleDelete(item.id)} label="Eliminar" className="mt-3" size="small" severity="danger" outlined />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;