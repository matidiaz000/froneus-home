import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import moment from "moment";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const campaigns = () => {
  let navigate = useNavigate();
  const campaigns: any = useSelector((state: any) => state.campaigns)

  return (
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
  );
};

export default campaigns;