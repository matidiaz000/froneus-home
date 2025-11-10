import { CascadeSelect } from "primereact/cascadeselect";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Card } from "primereact/card";
import moment from "moment";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { created, deleted, edited } from "../reducers/campaignsSlice";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";

const Campaign = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const CampaignsData: any = useSelector((state: any) => state && id ? state.campaigns[Number(id)] : null)
  const ContactsData: any = useSelector((state: any) => state.contacts)

  const [calls, setCalls] = useState(CampaignsData ? CampaignsData.campaign : []);
  const [name, setName] = useState(id ? CampaignsData.name : '');
  const [contacts, setContacts] = useState(id ? CampaignsData.contacts : []);
	const [selectedContacts, setSelectedContacts] = useState(null);
  const [state, setSelectedState] = useState(id ? CampaignsData.state : null);
  const [callDatetime, setCallDateTime] = useState(null);
  const [callName, setCallName] = useState('');
  const [callRecord, setCallRecord] = useState(false);

  const StatesOptions = () => {
    if (id && CampaignsData.state === "Activa") [
      {name:"Finalizada"}
    ]
    else return [
      {name:"En espera"},
      {name:"Activa"},
      {name:"Finalizada"}
    ]
  }

  const handleSubmit = () => {
    if (id) {
      dispatch(edited({
        ...calls,
        state: state,
        name: name
      }))
    } else {
      dispatch(created({
        campaign: calls,
        contacts: contacts,
        id: Math.floor(Date.now() * Math.random()),
        name: name,
        state: state
      }))
    }
    navigate(`/`)
  }
  
  const handleDelete = () => {
    if (id) dispatch(deleted({ id: id }))
    navigate(`/`)
  }

  const handleCall = () => {
    const newCall = {
      name: callName,
      create: moment().toString(),
      initial: callDatetime,
      record: callRecord
    }
    setCalls((prev: any) => [...prev, newCall])
  }

  const handleDeleteCall = (index: number) => {
    const newCallArr = calls.filter((_item: any, i: number) => i != index);
    setCalls(newCallArr)
  }

  const handleContacts = (e: any) => {
    const find = contacts.find((item: any) => item === e.value.id)
    let newContactsArr
    if (find) newContactsArr = contacts?.filter((item: any) => item !== e.value.id);
    else newContactsArr = [...contacts, e.value.id]
    setContacts(newContactsArr)
    setSelectedContacts(e.value)
  }

  return (
    <div>
      <div className="flex flex-row flex-wrap align-items-center px-3"  style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)' }}>
        <Button onClick={() => navigate("/")} icon="pi pi-arrow-left" rounded raised aria-label="arrow-left" />
        <h1 className="ml-3">{id ? "Campaña N° " + id : "Nueva campaña"}</h1>
      </div>
      <div className="m-3 pb-5">
        <div className="flex flex-column flex-wrap mt-5">
          <div className="flex-auto mb-5">
            <label htmlFor="name" className="font-bold block mb-2">
              Nombre
            </label>
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={id ? true : false} />
          </div>
          <div className="flex-auto mb-5">
            <label htmlFor="state" className="font-bold block mb-2">
              Estado
            </label>
            <CascadeSelect
              id="state"
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
            <Button onClick={handleSubmit} label="Guardar" className="mt-3" disabled={id ? true : false} />
            <Button onClick={handleDelete} label="Eliminar" className="ml-3" severity="danger" disabled={id && CampaignsData.state === "En espera" ? false : true} outlined />
          </div>
          <h2>Contactos</h2>
          <div className="flex flex-row">
            <div className='pr-5 pt-5 pb-5 flex flex-column align-items-start w-24rem'>
              <CascadeSelect
                value={selectedContacts}
                onChange={handleContacts}
                options={ContactsData}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren={['states', 'cities']}
                className="w-full md:w-16rem"
                breakpoint="767px"
                placeholder="Selecciona un contacto"
                style={{ minWidth: '15rem' }}
              />
            </div>
            <div className="flex flex-row flex-wrap">
              {ContactsData
                .filter((val: any) => contacts.includes(val.id))
                .map((item: any) => (
                <div key={item.id} className="flex align-items-center justify-content-center m-3">
                  <Card title={item.name} key={item.name} className='w-16rem'>
                    <p>Telefono: {item.phone}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <h2>Llamados</h2>
          <div className="flex flex-row align-items-start">
            <div className='pr-5 pt-5 flex align-items-center justify-content-center mr-3'>
              <div className="flex flex-column flex-wrap w-21rem">
                <div className="flex-auto mb-5">
                  <label htmlFor="callName" className="font-bold block mb-2">
                    Nombre
                  </label>
                  <InputText id="callName" value={callName} onChange={(e) => setCallName(e.target.value)} />
                </div>
                <div className="flex-auto mb-5">
                  <label htmlFor="calendar" className="font-bold block mb-2">
                    Fecha y hora para iniciar la llamada
                  </label>
                  <Calendar
                    id="calendar"
                    value={callDatetime}
                    onChange={(e: any) => setCallDateTime(e.value)}
                    showTime
                    hourFormat="24"
                    showIcon
                  />
                </div>
                <div className="flex-auto">
                  <label htmlFor="record" className="font-bold block mb-2">
                    ¿Se tiene que grabar?
                  </label>
                  <InputSwitch id="record" checked={callRecord} onChange={(e) => setCallRecord(e.value)} />
                </div>
                <div className="flex-auto">
                  <Button onClick={handleCall} label="Guardar" className="mt-3" />
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-wrap">
              {calls?.map((item: any, index: number) => (
                <div key={item.name} className="flex align-items-center justify-content-center m-3">
                  <Card title={item.name} className='w-16rem'>
                    <p>Creación: {moment(new Date(item.create)).format('DD/MM/YY h:mm')}</p>
                    <p>Inicio: {moment(new Date(item.initial)).format('DD/MM/YY h:mm')}</p>
                    <p className='m-0'>Grabar: {item.record ? "SI" : "NO"}</p>
                    <Button onClick={() => handleDeleteCall(index)} label="Eliminar" className="mt-3" size="small" severity="danger" outlined disabled={id ? true : false} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaign;