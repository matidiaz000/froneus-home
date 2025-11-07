import { CascadeSelect } from "primereact/cascadeselect";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { CampaignsData } from "../../mocks/Campaigns.data";
import { ContactsData } from "../../mocks/Contacts.data";
import { Card } from "primereact/card";
import moment from "moment";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const Campaign = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [state, setSelectedState] = useState(id ? CampaignsData[Number(id)].state : null);
  const StatesOptions = () => {
    if (id && CampaignsData[Number(id)].state === "Activa") [
      {name:"Finalizada"}
    ]
    else return [
      {name:"En espera"},
      {name:"Activa"},
      {name:"Finalizada"}
    ]
  }
  const [name, setName] = useState(id ? CampaignsData[Number(id)].name : '');
	const [contacts, setSelectedContacts] = useState(null);

  return (
    <div className="m-3">
      <div className="flex flex-row flex-wrap align-items-center">
        <Button onClick={() => navigate("/")} icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="arrow-left" />
        <h1 className="ml-3">Nueva campaña</h1>
      </div>
      <div className="flex flex-column flex-wrap">
				<div className="flex-auto mb-5">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
            Nombre
          </label>
          <InputText value={name} onChange={(e) => setName(e.target.value)} disabled={id ? true : false} />
        </div>
        <div className="flex-auto mb-5">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
            Estado
          </label>
          <CascadeSelect
            disabled={id ? true : false}
            value={state}
            onChange={(e) => setSelectedState(e.value)}
            options={StatesOptions()}
            optionLabel="name"
            optionGroupLabel="name"
            optionGroupChildren={['states', 'cities']}
            className="w-full md:w-14rem"
            breakpoint="767px"
            placeholder="Selecciona un estado"
            style={{ minWidth: '15rem' }}
          />
        </div>
				<div className="flex-auto mb-5">
        	<Button onClick={() => navigate(`/`)} label="Guardar" className="mt-3" disabled={id ? true : false} />
					<Button onClick={() => navigate(`/`)} label="Eliminar" className="ml-3" severity="danger" disabled={id && CampaignsData[Number(id)].state === "En espera" ? false : true} outlined />
        </div>
				<h2>Contactos</h2>
				<div className="flex flex-row flex-wrap">
					{ContactsData
						.filter((val) => CampaignsData[0].contacts.includes(val.id))
						.map((item) => (
						<div className="flex align-items-center justify-content-center m-3">
							<Card title={item.name} key={item.name} className='w-16rem'>
								<p>Telefono: {item.phone}</p>
							</Card>
						</div>
					))}
					<div className='p-5 w-16rem flex flex-column align-items-center justify-content-center'>
						<CascadeSelect
							value={contacts}
							onChange={(e) => setSelectedContacts(e.value)}
							options={ContactsData}
							optionLabel="name"
							optionGroupLabel="name"
							optionGroupChildren={['states', 'cities']}
							className="w-full md:w-14rem"
							breakpoint="767px"
							placeholder="Selecciona un contacto"
							style={{ minWidth: '15rem' }}
						/>
						<Button label="Agregar" className="mt-3" />
					</div>
				</div>
				<h2>Llamados</h2>
				<div className="flex flex-row flex-wrap">
					{CampaignsData[0].campaign.map((item, index) => (
						<div key={item.name} className="flex align-items-center justify-content-center m-3">
							<Card title={item.name} className='w-16rem'>
								<p>Creación: {moment(item.create).format('DD/MM/YY h:mm')}</p>
								<p>Inicio: {moment(item.initial).format('DD/MM/YY h:mm')}</p>
								<p className='m-0'>Grabar: {item.record ? "SI" : "NO"}</p>
								<Button onClick={() => navigate(`/llamada/${id}/${index}`)} label="Editar" className="mt-3" size="small" disabled={id ? true : false} />
								<Button onClick={() => navigate(`/`)} label="Eliminar" className="ml-3" size="small" severity="danger" outlined disabled={id ? true : false} />
							</Card>
						</div>
					))}
					<div className='p-5 w-16rem flex align-items-center justify-content-center'>
						<Button onClick={() => navigate(`/llamada`)} icon="pi pi-plus" rounded aria-label="Plus" disabled={id ? true : false} />
					</div>
				</div>
      </div>
    </div>
  );
};

export default Campaign;