import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { ContactsData } from '../../mocks/Contacts.data';

const Contact = () => {
  let navigate = useNavigate();
  const { id } = useParams(); 
  const [name, setName] = useState(id ? ContactsData[Number(id)].name : '');
  const [phone, setPhone] = useState(id ? ContactsData[Number(id)].phone : '');

  return (
    <div className="m-3">
      <div className="flex flex-row flex-wrap align-items-center">
        <Button onClick={() => navigate("/")} icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="arrow-left" />
        <h1 className="ml-3">Nuevo contacto</h1>
      </div>
      <div className="flex flex-column flex-wrap">
        <div className="flex-auto mb-5">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
              Nombre y apellido
          </label>
          <InputText value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex-auto mb-5">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
              Teléfono
          </label>
          <InputText value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="flex-auto">
        	<Button onClick={() => navigate(`/`)} label="Guardar" className="mt-3" />
					<Button onClick={() => navigate(`/`)} label="Eliminar" className="ml-3" severity="danger" outlined disabled={id ? false : true} />
        </div>
      </div>
    </div>
  );
};

export default Contact;