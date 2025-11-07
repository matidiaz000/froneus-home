import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { CampaignsData } from "../../mocks/Campaigns.data";

const Call = () => {
  let navigate = useNavigate();
  const { id, campaign_id } = useParams();
  const campaign = CampaignsData[Number(campaign_id)].campaign[Number(id)];
  const [datetime, setDateTime] = useState(id ? new Date(campaign.initial) : null);
  const [name, setName] = useState(id ? campaign.name : '');
  const [record, setRecord] = useState(id ? campaign.record : false);

  return (
    <div className="m-3">
      <div className="flex flex-row flex-wrap align-items-center">
        <Button onClick={() => navigate("/campana")} icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="arrow-left" />
        <h1 className="ml-3">Nueva llamada</h1>
      </div>
      <div className="flex flex-column flex-wrap">
        <div className="flex-auto mb-5">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
              Nombre
          </label>
          <InputText value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex-auto mb-5">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
              Fecha y hora para iniciar la llamada
          </label>
          <Calendar
            value={datetime}
            onChange={(e: any) => setDateTime(e.value)}
            showTime
            hourFormat="24"
            showIcon
          />
        </div>
        <div className="flex-auto">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
            ¿Se tiene que grabar?
          </label>
          <InputSwitch checked={record} onChange={(e) => setRecord(e.value)} />
        </div>
        <div className="flex-auto">
        	<Button onClick={() => navigate(`/`)} label="Guardar" className="mt-3" />
					<Button onClick={() => navigate(`/`)} label="Eliminar" className="ml-3" severity="danger" outlined />
        </div>
      </div>
    </div>
  );
};

export default Call;